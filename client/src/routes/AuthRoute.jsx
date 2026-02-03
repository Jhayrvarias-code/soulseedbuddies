import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthRoute = () => {
  const { token, loading } = useAuth();

  if (loading) return null;

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthRoute;
