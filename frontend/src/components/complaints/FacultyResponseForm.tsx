
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { Complaint } from "@/types";
import { ComplaintDetail } from "./ComplaintDetail";
import { Separator } from "@/components/ui/separator";
import { ArrowUpToLine, CheckCircle, Clock } from "lucide-react";

interface FacultyResponseFormProps {
  complaint: Complaint;
  onResponseSubmit: (response: string, escalate: boolean) => void;
}

export function FacultyResponseForm({ complaint, onResponseSubmit }: FacultyResponseFormProps) {
  const [response, setResponse] = useState("");
  const [escalate, setEscalate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) {
      toast.error("Please provide a response.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Simulate API call
      setTimeout(() => {
        onResponseSubmit(response, escalate);
        toast.success(
          escalate 
            ? "Complaint has been escalated to HOD with your response."
            : "Your response has been submitted and the complaint is now resolved."
        );
      }, 1000);
    } catch (error) {
      toast.error("An error occurred while submitting your response.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate time remaining (would be dynamic in a real app)
  const timeRemaining = "36 hours";

  return (
    <div className="space-y-8">
      <ComplaintDetail complaint={complaint} />
      
      <Card>
        <CardHeader>
          <CardTitle>Faculty Response</CardTitle>
          <CardDescription>
            Provide your response to this complaint. You have {timeRemaining} remaining to respond 
            before this complaint is automatically escalated to the HOD.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="response">Your Response</Label>
              <Textarea
                id="response"
                placeholder="Enter your detailed response to this complaint..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-32"
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                className="flex-1 flex items-center gap-2"
                disabled={isSubmitting || !response.trim()}
                onClick={() => setEscalate(false)}
              >
                <CheckCircle className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Resolve Complaint"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                className="flex-1 flex items-center gap-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                disabled={isSubmitting || !response.trim()}
                onClick={(e) => {
                  e.preventDefault();
                  setEscalate(true);
                  handleSubmit(e);
                }}
              >
                <ArrowUpToLine className="h-4 w-4" />
                Escalate to HOD
              </Button>
            </div>
          </form>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between p-4 bg-muted/30">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            Response deadline: {timeRemaining} remaining
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              toast.info("Response saved as draft.");
            }}
          >
            Save as Draft
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
