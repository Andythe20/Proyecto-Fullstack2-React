import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children , adminOnly = false}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras se está restaurando la sesión, no redirigir
  if (loading) {
    return <LoadingSpinner text="Verificando sesión..." />;
  }
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
