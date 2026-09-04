import { useAuthStore } from "@/stores/authStore";
import { Navigate } from "react-router-dom";
import type { UserRole } from "@/types";

interface Props {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to their dashboard
    switch (user.role) {
      case "designer": case "tailor": return <Navigate to="/dashboard/designer" replace />;
      case "brand": return <Navigate to="/dashboard/brand" replace />;
      case "creator": return <Navigate to="/dashboard/creator" replace />;
      case "admin": return <Navigate to="/dashboard/admin" replace />;
      default: return <Navigate to="/dashboard/customer" replace />;
    }
  }

  return <>{children}</>;
};
