import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log("ProtectedRoute - Current user state:", user);

  if (user === null) {
    // Prevent redirect until user check is complete
    console.log("ProtectedRoute - Redirecting to login");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
