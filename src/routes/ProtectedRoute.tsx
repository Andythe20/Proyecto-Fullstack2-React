import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children , adminOnly = false}: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si la ruta es solo para administradores
  if(adminOnly && user.userRole !== "ADMIN"){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
