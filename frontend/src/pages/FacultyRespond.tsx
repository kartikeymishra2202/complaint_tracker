
import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FacultyResponseForm } from "@/components/complaints/FacultyResponseForm";
import { getComplaintById } from "@/lib/utils/complaint-utils";

export default function FacultyRespond() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'faculty') {
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
  
  // Check if faculty has access to this complaint
  if (complaint.faculty !== user.id) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to respond to this complaint.
        </p>
      </div>
    );
  }
  
  // Check if complaint status allows faculty response
  if (complaint.status !== 'sent_to_faculty') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Cannot Respond</h1>
        <p className="text-muted-foreground mb-6">
          This complaint is not awaiting your response or has already been processed.
        </p>
      </div>
    );
  }
  
  const handleResponseSubmit = (response: string, escalate: boolean) => {
    // In a real app, this would send data to an API
    console.log("Faculty Response:", { response, escalate, complaintId: id });
    
    // Navigate back to dashboard after successful submission
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <FacultyResponseForm 
        complaint={complaint}
        onResponseSubmit={handleResponseSubmit}
      />
    </div>
  );
}
