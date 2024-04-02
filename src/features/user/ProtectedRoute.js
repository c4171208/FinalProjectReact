import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!user || user.role != 'ADMIN') {
    return <Navigate to="/error" replace />;
  }

  return children;
};
