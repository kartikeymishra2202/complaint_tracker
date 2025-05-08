import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintCard } from "@/components/complaints/ComplaintCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getComplaintsForStudent } from "@/lib/utils/complaint-utils";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = user.token;
  const [loading, setIsLoading] = useState(false);
  const [studentComplaints, setStudentComplaint] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function fetchComplaint() {
      if (user) {
        try {
          setIsLoading(true);
          const response = await fetch(`${backendUrl}/complaints`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setStudentComplaint(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchComplaint();
  }, [user]);

  const pendingComplaints = studentComplaints.filter(
    (c) => c.status !== "resolved" && c.status !== "rejected"
  );

  const resolvedComplaints = studentComplaints.filter(
    (c) => c.status === "resolved" || c.status === "closed_by_faculty"
  );

  const rejectedComplaints = studentComplaints.filter(
    (c) => c.status === "rejected"
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Manage and track your complaints.
          </p>
        </div>

        <Button onClick={() => navigate("/complaints/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Complaint
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {studentComplaints.length}
            </CardTitle>
            <CardDescription>Total Complaints</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {pendingComplaints.length}
            </CardTitle>
            <CardDescription>Pending Resolution</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {resolvedComplaints.length}
            </CardTitle>
            <CardDescription>Resolved Complaints</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Complaints</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {studentComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't submitted any complaints yet.
                </p>
                <Button onClick={() => navigate("/complaints/new")}>
                  Submit a Complaint
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  You don't have any pending complaints.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="resolved" className="space-y-4">
          {resolvedComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  You don't have any resolved complaints.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedComplaints.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  You don't have any rejected complaints.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
