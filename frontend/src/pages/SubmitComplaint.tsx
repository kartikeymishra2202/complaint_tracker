
import { ComplaintForm } from "@/components/complaints/ComplaintForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function SubmitComplaint() {
  const { user, isLoggedIn } = useAuth();
  
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Only students can submit complaints
  if (user.role !== 'student') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
        <p className="text-muted-foreground mb-6">
          Only students can submit complaints.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-8">
        Submit a Complaint
      </h1>
      <ComplaintForm />
    </div>
  );
}
