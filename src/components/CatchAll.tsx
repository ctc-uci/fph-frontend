import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export const CatchAll = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsAdmin = async () => {
      if (await isAdmin()) {
        navigate('/AdminDashboard');
      } else {
        navigate('/BusinessDashboard');
      }
    };

    checkIsAdmin();
  }, []);

  return <p>Route not found... redirecting...</p>;
};
