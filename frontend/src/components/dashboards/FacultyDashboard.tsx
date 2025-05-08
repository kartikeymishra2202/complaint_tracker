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

import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = user.token;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [facultyComplaints, setFacultyComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      async function fetchFacultyComplaint() {
        setLoading(true);
        try {
          const response = await fetch(`${backendUrl}/complaints`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          setFacultyComplaints(data);
          // console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchFacultyComplaint();
    }
  }, [user]);

  const pendingComplaints = facultyComplaints.filter(
    (c) => c.status === "sent_to_faculty"
  );

  const resolvedComplaints = facultyComplaints.filter(
    (c) => c.status === "closed_by_faculty"
  );

  const escalatedComplaints = facultyComplaints.filter(
    (c) => c.status === "forwarded_to_hod"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.name}. Review and respond to student complaints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">
              {facultyComplaints.length}
            </CardTitle>
            <CardDescription>Total Assigned</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-blue-700">
              {pendingComplaints.length}
            </CardTitle>
            <CardDescription className="text-blue-700/80">
              Awaiting Response
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-green-700">
              {resolvedComplaints.length}
            </CardTitle>
            <CardDescription className="text-green-700/80">
              Resolved
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-purple-700">
              {escalatedComplaints.length}
            </CardTitle>
            <CardDescription className="text-purple-700/80">
              Escalated to HOD
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Awaiting Response</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="escalated">Escalated to HOD</TabsTrigger>
          <TabsTrigger value="all">All Complaints</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaints Awaiting Response</CardTitle>
              <CardDescription>
                Respond to these complaints within 48 hours to avoid automatic
                escalation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingComplaints.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">
                    No complaints waiting for your response.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingComplaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-md p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                          <ComplaintCard
                            complaint={complaint}
                            showActions={false}
                          />
                        </div>
                        <div className="flex flex-col gap-2 self-center">
                          <Button
                            className="w-full flex items-center gap-1"
                            onClick={() =>
                              navigate(`/faculty/respond/${complaint.id}`)
                            }
                          >
                            <MessageSquare className="h-4 w-4" />
                            Respond
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resolvedComplaints.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">
                    No resolved complaints.
                  </p>
                </CardContent>
              </Card>
            ) : (
              resolvedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="escalated" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {escalatedComplaints.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">
                    No escalated complaints.
                  </p>
                </CardContent>
              </Card>
            ) : (
              escalatedComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyComplaints.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">
                    No complaints have been assigned to you yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              facultyComplaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
