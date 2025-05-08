
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplaintCard } from "@/components/complaints/ComplaintCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getComplaintsForHOD } from "@/lib/utils/complaint-utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

export function HODDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // In a real app, this would fetch from an API
  const hodComplaints = user ? getComplaintsForHOD(user.id) : [];
  
  const pendingComplaints = hodComplaints.filter(
    c => c.status === 'forwarded_to_hod'
  );
  
  const resolvedComplaints = hodComplaints.filter(
    c => c.status === 'resolved'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">HOD Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user?.name}. Review escalated complaints and take action.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{hodComplaints.length}</CardTitle>
            <CardDescription>Total Escalated</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-purple-700">{pendingComplaints.length}</CardTitle>
            <CardDescription className="text-purple-700/80">Awaiting Action</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-green-700">{resolvedComplaints.length}</CardTitle>
            <CardDescription className="text-green-700/80">Resolved</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Awaiting Action</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="all">All Complaints</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complaints Awaiting Your Action</CardTitle>
              <CardDescription>
                These complaints have been escalated and require your immediate attention.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingComplaints.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">No complaints waiting for your action.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingComplaints.map(complaint => (
                    <div key={complaint.id} className="border rounded-md p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                          <ComplaintCard complaint={complaint} showActions={false} />
                        </div>
                        <div className="flex flex-col gap-2 self-center">
                          <Button 
                            className="w-full"
                            onClick={() => navigate(`/hod/resolve/${complaint.id}`)}
                          >
                            View & Resolve
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-1 text-green-600 border-green-300 hover:bg-green-50"
                            onClick={() => navigate(`/hod/quick-resolve/${complaint.id}`)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Quick Resolve
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full flex items-center gap-1 border-muted-foreground/30"
                          >
                            <Clock className="h-4 w-4" />
                            Defer Action
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
                  <p className="text-muted-foreground">No resolved complaints.</p>
                </CardContent>
              </Card>
            ) : (
              resolvedComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hodComplaints.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">No complaints have been escalated to you yet.</p>
                </CardContent>
              </Card>
            ) : (
              hodComplaints.map(complaint => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
