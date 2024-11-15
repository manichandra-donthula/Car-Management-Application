import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthChecked } = useContext(AuthContext);
  const location = useLocation();

  console.log("ProtectedRoute - Current user state:", user);
  console.log("ProtectedRoute - isAuthChecked:", isAuthChecked);

  if (!isAuthChecked) {
    // Return null or a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute - Redirecting to login");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
