import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useEffect } from "react";

function PrivateRoute({ redirectTo, authorizeRole = [], children }) {
  const authState = useSelector((state) => state.loggedIn);
  const { token, role } = authState;

  useEffect(() => {
    if (!token) {
      toast.warning("You have to login first!");
    }
  }, [token]);

  // If no token, redirect to the specified route
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  // If roles are specified, check if current user role is included
  if (authorizeRole.length > 0 && !authorizeRole.includes(role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated and authorized, render children
  return children;
}

export default PrivateRoute;
