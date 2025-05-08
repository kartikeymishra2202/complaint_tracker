
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Complaint } from "@/types";
import { ComplaintDetail } from "./ComplaintDetail";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HODResolutionFormProps {
  complaint: Complaint;
  onResolutionSubmit: (resolution: string, actionTaken: string) => void;
}

export function HODResolutionForm({ complaint, onResolutionSubmit }: HODResolutionFormProps) {
  const [resolution, setResolution] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resolution.trim()) {
      toast.error("Please provide a resolution.");
      return;
    }
    
    if (!actionTaken) {
      toast.error("Please select an action taken.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Simulate API call
      setTimeout(() => {
        onResolutionSubmit(resolution, actionTaken);
        toast.success("Complaint has been resolved successfully.");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while submitting your resolution.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const actionOptions = [
    { label: "Issue Resolved", value: "resolved" },
    { label: "Partial Resolution", value: "partial" },
    { label: "Action Taken", value: "action_taken" },
    { label: "Referred to Higher Authority", value: "referred" },
    { label: "Policy Change", value: "policy_change" }
  ];

  return (
    <div className="space-y-8">
      <ComplaintDetail complaint={complaint} />
      
      <Card>
        <CardHeader>
          <CardTitle>HOD Resolution</CardTitle>
          <CardDescription>
            Provide your final resolution for this escalated complaint.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resolution">Resolution Details</Label>
              <Textarea
                id="resolution"
                placeholder="Enter your detailed resolution for this complaint..."
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                className="min-h-32"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="actionTaken">Action Taken</Label>
              <Select required value={actionTaken} onValueChange={setActionTaken}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action taken" />
                </SelectTrigger>
                <SelectContent>
                  {actionOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Mark as Resolved"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-sm text-muted-foreground">
            This is the final resolution for this complaint.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
