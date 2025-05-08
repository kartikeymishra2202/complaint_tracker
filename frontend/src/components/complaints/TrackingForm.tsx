
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { getComplaintByTrackingCode } from "@/lib/utils/complaint-utils";
import { Complaint } from "@/types";
import { ComplaintStatus } from "@/components/complaints/ComplaintStatus";
import { ComplaintTimeline } from "@/components/complaints/ComplaintTimeline";

export function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      toast.error("Please enter a tracking code.");
      return;
    }
    
    setIsSearching(true);
    setComplaint(null);
    setShowResults(false);

    try {
      // Simulate API request
      setTimeout(() => {
        const foundComplaint = getComplaintByTrackingCode(trackingCode);
        
        if (foundComplaint) {
          setComplaint(foundComplaint);
          setShowResults(true);
        } else {
          toast.error("Invalid or expired tracking code. Please check and try again.");
        }
        
        setIsSearching(false);
      }, 1200);
    } catch (error) {
      toast.error("An error occurred while retrieving complaint information.");
      console.error(error);
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Track Your Complaint</CardTitle>
          <CardDescription>
            Enter the tracking code you received via email to check the status of your complaint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trackingCode">Tracking Code</Label>
              <Input
                id="trackingCode"
                placeholder="e.g., TRACK123"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSearching}>
              {isSearching ? "Searching..." : "Track Complaint"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {showResults && complaint && (
        <Card>
          <CardHeader>
            <CardTitle>Complaint Details</CardTitle>
            <CardDescription>Results for tracking code: {trackingCode}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
              <p className="text-muted-foreground mb-4">{complaint.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Department:</p>
                  <p className="text-muted-foreground">{complaint.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Submitted On:</p>
                  <p className="text-muted-foreground">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Status:</p>
                <ComplaintStatus status={complaint.status} />
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Complaint Timeline:</h4>
                <ComplaintTimeline complaint={complaint} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
