import { useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ComplaintDetail } from "@/components/complaints/ComplaintDetail";
import { useEffect, useState } from "react";
import { Complaint } from "@/types";

export default function ComplaintDetails() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // console.log(user.token);

  useEffect(() => {
    if (user) {
      async function getComplaintByIdFn() {
        try {
          setIsLoading(true);
          const response = await fetch(`${backendUrl}/complaints/${id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          // console.log(data);

          setComplaint(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
      getComplaintByIdFn();
    }
  }, [id, user]);

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

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

  // Check if user has access to this complaint
  const hasAccess =
    user.role === "admin" ||
    (user.role === "student" && complaint.submittedBy === user._id) ||
    (user.role === "faculty" && complaint.faculty === user._id) ||
    (user.role === "hod" &&
      (complaint.hod === user._id || complaint.status === "forwarded_to_hod"));

  if (!hasAccess) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to view this complaint.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ComplaintDetail
        complaint={complaint}
        showStudentInfo={user.role === "admin"}
      />
    </div>
  );
}
