
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getRoleFromJWT } from '@/utils/jwt';

// Allow requiredRole prop for advanced protection (default: any logged-in user)
// usage: <Route element={<PrivateRoute requiredRole="admin" />} .../>
interface PrivateRouteProps {
  requiredRole?: "admin" | "user";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin route is required, check role in JWT
  if (requiredRole) {
    const token = localStorage.getItem("jwtToken");
    const role = getRoleFromJWT(token);
    if (role !== requiredRole) {
      // Not authorized - redirect (can adjust this to show Not Authorized page etc)
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
