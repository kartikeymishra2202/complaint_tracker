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

import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = user.token;
  const [loading, setIsLoading] = useState(false);
  const [getComplaint, setGetComplaint] = useState([]);
  const [pendingReviewComplaints, setPendingReviewComplaint] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    async function fetchComplaint() {
      if (user) {
        try {
          setIsLoading(true);
          const response = await fetch(`${backendUrl}/complaints/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          setPendingReviewComplaint(
            data.filter((comp) => comp.status === "pending_review")
          );
          setGetComplaint(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchComplaint();
  }, [user]);

  async function handleStatusUpdate(
    status: "sent_to_faculty" | "rejected",
    _id: string
  ) {
    if (user) {
      try {
        setIsLoading(true);
        const response = await fetch(`${backendUrl}/complaints/${_id}/status`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: status }),
        });
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        toast.success(`Complaint ${status.toLowerCase()}`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        toast.error("Failed to update status");
      } finally {
        setIsLoading(false);
      }
    }
  }
  function getComplaintsByStatus(status: string) {
    return getComplaint.filter((c) => c.status === status);
  }
  const sentToFacultyComplaints = getComplaintsByStatus("sent_to_faculty");
  const resolvedComplaints = sentToFacultyComplaints.filter(
    (c) => c.status === "resolved" || c.status === "closed_by_faculty"
  );
  const rejectedComplaints = getComplaintsByStatus("rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.name}. Review and manage student complaints.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{getComplaint.length}</CardTitle>
            <CardDescription>Total Complaints</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-amber-700">
              {pendingReviewComplaints.length}
            </CardTitle>
            <CardDescription className="text-amber-700/80">
              Pending Review
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

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-red-700">
              {rejectedComplaints.length}
            </CardTitle>
            <CardDescription className="text-red-700/80">
              Rejected
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="all">All Complaints</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaints Requiring Review</CardTitle>
              <CardDescription>
                Verify these complaints before forwarding them to faculty
                members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReviewComplaints.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">
                    No complaints waiting for review.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingReviewComplaints.map((complaint) => (
                    <div key={complaint._id} className="border rounded-md p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                          <ComplaintCard
                            complaint={complaint}
                            showActions={false}
                          />
                        </div>
                        <div className="flex flex-col gap-2 self-center">
                          <Button
                            className="w-full"
                            onClick={() =>
                              navigate(`/admin/review/${complaint._id}`)
                            }
                          >
                            Review
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-1 text-green-600 border-green-300 hover:bg-green-50"
                            onClick={() =>
                              handleStatusUpdate(
                                "sent_to_faculty",
                                complaint._id
                              )
                            }
                          >
                            <CheckCircle2 className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() =>
                              handleStatusUpdate("rejected", complaint._id)
                            }
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
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

        <TabsContent value="processed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processed Complaints</CardTitle>
              <CardDescription>
                Complaints that have been sent to faculty or rejected.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sentToFacultyComplaints.length === 0 &&
              rejectedComplaints.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">
                    No processed complaints yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...sentToFacultyComplaints, ...rejectedComplaints].map(
                    (complaint) => (
                      <ComplaintCard
                        key={complaint._id}
                        complaint={complaint}
                      />
                    )
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getComplaint.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
