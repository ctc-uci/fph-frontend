import { createContext, useContext } from 'react';
import axios from 'axios';

// @ts-expect-error trust me bro
const baseURL = import.meta.env.VITE_BACKEND_HOSTNAME;

const BackendContext = createContext(null);
const useBackend = () => useContext(BackendContext);

const BackendProvider = ({ children }: { children: React.ReactNode }) => {
  const backend = axios.create({
    baseURL,
    withCredentials: false,
  });

  return <BackendContext.Provider value={{ backend }}>{children}</BackendContext.Provider>;
};

export { BackendProvider, useBackend };
