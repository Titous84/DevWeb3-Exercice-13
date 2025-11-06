import axios from 'axios';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebaseApp';

export type LoginContextType = {
  isLoggedIn: boolean;
  token: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const noop = async () => false;

export const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  token: '',
  login: noop,
  logout: async () => {},
});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

axios.defaults.baseURL = API_BASE_URL;

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const login = useCallback(async (email: string, password: string) => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credentials.user.getIdToken();
      setIsLoggedIn(true);
      setToken(idToken);
      return true;
    } catch (error) {
      setIsLoggedIn(false);
      setToken('');
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setToken('');
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        setIsLoggedIn(true);
        setToken(idToken);
      } else {
        setIsLoggedIn(false);
        setToken('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      token,
      login,
      logout,
    }),
    [isLoggedIn, token, login, logout]
  );

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}
