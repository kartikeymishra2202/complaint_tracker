
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HODResolutionForm } from "@/components/complaints/HODResolutionForm";
import { getComplaintById } from "@/lib/utils/complaint-utils";

export default function HODResolve() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'hod') {
    return <Navigate to="/dashboard" replace />;
  }
  
  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const complaint = getComplaintById(id);
  
  if (!complaint) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Complaint Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The complaint you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }
  
  // Check if complaint status allows HOD resolution
  if (complaint.status !== 'forwarded_to_hod') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Cannot Resolve</h1>
        <p className="text-muted-foreground mb-6">
          This complaint is not awaiting your resolution or has already been processed.
        </p>
      </div>
    );
  }
  
  const handleResolutionSubmit = (resolution: string, actionTaken: string) => {
    // In a real app, this would send data to an API
    console.log("HOD Resolution:", { resolution, actionTaken, complaintId: id });
    
    // Navigate back to dashboard after successful submission
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <HODResolutionForm 
        complaint={complaint}
        onResolutionSubmit={handleResolutionSubmit}
      />
    </div>
  );
}
