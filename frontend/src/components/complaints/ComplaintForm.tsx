import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { departments } from "@/lib/mock-data"; // Assuming departments data is available

export function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a complaint.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          description,
          department,
          submittedBy: user._id,
          email: user.email,
          createdAt: new Date(),
        }),
      });
      // if (response) console.log("EveryThing work fine", response);
      if (!response.ok) {
        throw new Error("Failed to submit complaint");
      }

      const data = await response.json();
      const trackingCode = data.trackingCode;
      console.log(data, trackingCode);

      // toast.success("Complaint submitted successfully!", {
      //   description: `Your tracking code: ${trackingCode}. This code has been sent to your email and is valid for 7 days.`,
      // });

      // Clear form
      setTitle("");
      setDescription("");
      setDepartment("");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("An error occurred while submitting your complaint.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Submit a Complaint</CardTitle>
        <CardDescription>
          Please provide details about your complaint. Your identity will be
          kept confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              placeholder="Brief title of your complaint"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select required value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Select the relevant department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your complaint"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32"
              required
            />
          </div>

          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Important Notes:</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
              <li>
                Your identity will be kept confidential when the complaint is
                forwarded.
              </li>
              <li>A unique tracking code will be sent to your email.</li>
              <li>
                You can use this code to track the status of your complaint for
                7 days.
              </li>
              <li>
                Please ensure all information provided is accurate and factual.
              </li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t p-4">
        <p className="text-sm text-muted-foreground">
          Already submitted a complaint?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate("/track")}
          >
            Track your complaint
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
