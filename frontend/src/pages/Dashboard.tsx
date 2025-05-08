import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { FacultyDashboard } from "@/components/dashboards/FacultyDashboard";
import { HODDashboard } from "@/components/dashboards/HODDashboard";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  // console.log(user, isLoggedIn);
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Render dashboard based on user role
  switch (user.role) {
    case "student":
      return <StudentDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "faculty":
      return <FacultyDashboard />;
    case "hod":
      return <HODDashboard />;
    default:
      return (
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Invalid User Role</h1>
          <p className="text-muted-foreground">
            Your account doesn't have a valid role assigned.
          </p>
        </div>
      );
  }
}
