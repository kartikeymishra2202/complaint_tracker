import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  allowedRoles = ["student", "admin", "faculty", "hod"],
}: ProtectedRouteProps) {
  const { user, isLoggedIn } = useAuth();

  // Redirect to login if not authenticated
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed
  <Navigate to="/dashboard" replace />;
  if (!allowedRoles.includes(user.role)) {
    return console.log(user.role, "permission not allowed");
  }

  return <>{children}</>;
}
