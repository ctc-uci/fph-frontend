import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../utils/firebaseAuthUtil';
import { useBackend } from './BackendContext';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const { backend } = useBackend();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  };

  const isAdmin = async () => {
    if (currentUser !== null) {
      try {
        let response = await backend.get(`/adminUser/${currentUser.email}`);

        return response.data.length > 0;
      } catch (error) {
        console.error('Error sending reminders:', error);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
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
