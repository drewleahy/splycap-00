
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Check if the user is coming from the admin page
  const comingFromAdmin = localStorage.getItem("admin-authenticated") === "true";
  
  // If coming from admin, allow access without authentication check
  if (comingFromAdmin) {
    return <Outlet />;
  }

  // If authentication is still loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <p className="mt-4 text-gray-500">Loading your profile...</p>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/venturepartners/auth" replace />;
  }

  // If there are allowed roles and user doesn't have one of them, redirect to dashboard
  // This would require a database query to get the user's role, but we'll implement that later
  
  return <Outlet />;
};
