
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, FileText, Search, ShieldCheck } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Hero Section */}
      <div className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            EduComplaint
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          A secure platform for educational institutes to manage student complaints with anonymity, accountability, and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="text-lg"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/track")}
            className="text-lg"
          >
            Track Complaint
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Complaint</h3>
              <p className="text-muted-foreground">
                Students submit complaints with detailed information and department selection.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admin Verification</h3>
              <p className="text-muted-foreground">
                Administrators verify complaint authenticity and forward to relevant faculty.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Faculty Response</h3>
              <p className="text-muted-foreground">
                Faculty members respond to complaints within 48 hours or escalate to HOD.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Students track complaint status using a secure code sent to their email.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Key Benefits</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our system is designed to provide a fair and transparent complaint resolution process.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Anonymity</h3>
              <p className="text-muted-foreground">
                Student identities are protected when complaints are forwarded to faculty members.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Accountability</h3>
              <p className="text-muted-foreground">
                Time-bound resolution process with automatic escalation ensures all complaints are addressed.
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                Students can track the status of their complaints in real-time using a secure tracking code.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary text-primary-foreground mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join our platform today to create a better educational environment through effective complaint management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/login")}
              className="text-lg"
            >
              Login
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/register")}
              className="text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
