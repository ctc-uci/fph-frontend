import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ Component }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(currentUser !== null);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return isAuthenticated ? <Component /> : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
