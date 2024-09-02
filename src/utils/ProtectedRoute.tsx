import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  Component: React.ComponentType;
  isAdminRoute?: boolean;
}

export const ProtectedRoute = ({ Component, isAdminRoute = false }: ProtectedRouteProps) => {
  const { currentUser, isAdmin } = useAuth();

  if (!isAdmin && isAdminRoute) {
    return <Navigate to={'/BusinessDashboard'} />;
  }

  return currentUser ? <Component /> : <Navigate to={'/login'} />;
};
