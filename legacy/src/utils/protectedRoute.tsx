import { useAuthStore } from "@/store/auth/slice";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const isAuthPath =
    location.pathname === "/login" || location.pathname === "/signup";

  // Si no está autenticado y no está en una ruta de auth, redirige a login
  if (!isAuthenticated && !isAuthPath) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está autenticado y está intentando acceder a rutas de auth, redirige a my-raffles
  if (isAuthenticated && isAuthPath) {
    return <Navigate to="/my-raffles" replace />;
  }

  return children;
};
