import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  Component: React.ComponentType;
  isAdminRoute?: boolean;
}

export const ProtectedRoute = ({ Component, isAdminRoute = false }: ProtectedRouteProps) => {
  const { currentUser, isAdmin } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNonAdminOnAdminRoute, setIsNonAdminOnAdminRoute] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthenticated(currentUser !== null);

      const isUserAdmin = await isAdmin(currentUser);

      if (!isUserAdmin && isAdminRoute) {
        setIsNonAdminOnAdminRoute(true);
      }

      setIsLoading(false);
    };

    checkAuth();
    setIsAuthenticated(currentUser !== null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isNonAdminOnAdminRoute) {
    return <Navigate to={'/BusinessDashboard'} />;
  }

  return isAuthenticated ? <Component /> : <Navigate to={'/login'} />;
};
