
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Add debugging logs to help identify authentication issues
  console.log("ProtectedRoute: Checking authentication", {
    userId: user?.id,
    isLoading,
    path: location.pathname,
    userAuthenticated: !!user
  });

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
    console.log("ProtectedRoute: Not authenticated, redirecting to auth page");
    return <Navigate to="/venturepartners/auth" state={{ from: location }} replace />;
  }

  // TODO: Implement proper role-based access control
  // This would require checking the user's role from the database
  // For now, we allow all authenticated users
  if (allowedRoles && allowedRoles.length > 0) {
    console.log("ProtectedRoute: Role checking not yet implemented, allowing access");
    // In the future, this should check user roles from the database
    // const userRole = await getUserRole(user.id);
    // if (!allowedRoles.includes(userRole)) {
    //   return <Navigate to="/unauthorized" replace />;
    // }
  }

  console.log("ProtectedRoute: Authentication successful, granting access");
  
  return <Outlet />;
};
