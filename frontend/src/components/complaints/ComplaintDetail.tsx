
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ComplaintStatus } from "./ComplaintStatus";
import { ComplaintTimeline } from "./ComplaintTimeline";
import { Complaint } from "@/types";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDistanceToNow } from "date-fns";

interface ComplaintDetailProps {
  complaint: Complaint;
  showStudentInfo?: boolean;
}

export function ComplaintDetail({ complaint, showStudentInfo = false }: ComplaintDetailProps) {
  const navigate = useNavigate();
  
  const timeAgo = formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true });
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                  <CardDescription>
                    {complaint.department} • {timeAgo}
                  </CardDescription>
                </div>
                <ComplaintStatus status={complaint.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="whitespace-pre-line">{complaint.description}</p>
              </div>
              
              {complaint.facultyResponse && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Faculty Response</h3>
                    <p className="whitespace-pre-line">
                      {complaint.facultyResponse.message}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Responded {formatDistanceToNow(new Date(complaint.facultyResponse.date), { addSuffix: true })}
                    </p>
                  </div>
                </>
              )}
              
              {showStudentInfo && (
                <>
                  <Separator />
                  <Alert>
                    <AlertTitle className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Private Information
                    </AlertTitle>
                    <AlertDescription className="text-sm">
                      The student information below is only visible to administrators.
                      It will not be shared with faculty or HODs.
                    </AlertDescription>
                  </Alert>
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="text-sm font-semibold mb-2">Student Information</h3>
                    <p className="text-sm">Student ID: {complaint.submittedBy}</p>
                    <p className="text-sm">Department: {complaint.department}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Complaint Timeline</CardTitle>
              <CardDescription>
                Track the history of this complaint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComplaintTimeline complaint={complaint} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
