import { Navigate } from "react-router"

function PrivateRoute({ redirectTo, children }) {
  const activeUser = localStorage.getItem("userActive");
  console.log(activeUser);

  // Jika ada user
  if (!activeUser.email) {
    return <Navigate to={redirectTo} replace />
  }

  return children;
}

export default PrivateRoute;
