import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../store/AuthContext';
import { UserRole } from '../modules/user/types';
import { Loading } from '../shared/components/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireRole 
}) => {
  const { isAuthenticated, user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    // Redirect to unauthorized page if user doesn't have required role
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
