import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';

import { auth } from '../utils/firebaseAuthUtil';
import { useBackend } from './BackendContext';

interface AuthContextType {
  currentUser?: User | null;
  isAdmin: boolean;
  signup: (credentials: EmailPassword) => Promise<UserCredential>;
  login: (credentials: EmailPassword) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: { email: string }) => Promise<void>;
  getIsAdmin: () => Promise<boolean | undefined>;
}

type EmailPassword = {
  email: string;
  password: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  const { backend } = useBackend();

  const signup = ({ email, password }: EmailPassword) => {
    if (currentUser) {
      signOut(auth);
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = ({ email, password }: EmailPassword) => {
    if (currentUser) {
      signOut(auth);
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = ({ email }: { email: string }) => {
    return sendPasswordResetEmail(auth, email);
  };

  const getIsAdmin = async (user = currentUser) => {
    if (user !== null) {
      try {
        const response = await backend.get(`/adminUser/${user.email}`);
        return response.data.length > 0;
      } catch (error) {
        console.error('Error checking isAdmin', error);
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const adminStatus = await getIsAdmin(user);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    isAdmin,
    signup,
    login,
    logout,
    resetPassword,
    getIsAdmin,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
