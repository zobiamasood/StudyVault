import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, login, signup } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapUser = async () => {
      const token = localStorage.getItem('studyvault_token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch (error) {
        localStorage.removeItem('studyvault_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrapUser();
  }, []);

  const loginUser = async (credentials) => {
    const response = await login(credentials);
    localStorage.setItem('studyvault_token', response.token);
    setUser(response.user);
    return response;
  };

  const signupUser = async (userData) => {
    const response = await signup(userData);
    localStorage.setItem('studyvault_token', response.token);
    setUser(response.user);
    return response;
  };

  const logoutUser = () => {
    localStorage.removeItem('studyvault_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, loginUser, signupUser, logoutUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
