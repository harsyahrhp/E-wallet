import { Navigate } from "react-router";
import { useAuth } from "./contexts/Auth";

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  console.log(user, "r")
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
