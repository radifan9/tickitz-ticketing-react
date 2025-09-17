import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function PrivateRoute({ redirectTo, authorizeRole = [], children }) {
  const authState = useSelector((state) => state.loggedIn);
  const { token, role } = authState;

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
