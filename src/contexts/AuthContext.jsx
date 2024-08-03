import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '../utils/firebaseAuthUtil';
import { useBackend } from './BackendContext';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backend } = useBackend();

  const signup = (email, password) => {
    if (currentUser) {
      signOut(auth);
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    if (currentUser) {
      signOut(auth);
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const isAdmin = async (user = currentUser) => {
    if (user !== null) {
      try {
        let response = await backend.get(`/adminUser/${user.email}`);
        return response.data.length > 0;
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
