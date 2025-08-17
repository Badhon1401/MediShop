import React, { createContext, useContext, useEffect, useState } from 'react';
import { userService } from '../modules/user/services/userService';
import type { User } from '../modules/user/types';
import { UserRole } from '../modules/user/types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  isManager: boolean;
  isSalesperson: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = userService.getToken();
        if (savedToken) {
          setToken(savedToken);
          // Try to fetch user profile to verify token validity
          const profile = await userService.getProfile();
          setUser(profile);
        }
      } catch {
        // Token is invalid, remove it
        userService.removeToken();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken: string, newUser: User) => {
    userService.saveToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    userService.removeToken();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;
  const isManager = user?.role === UserRole.MANAGER;
  const isSalesperson = user?.role === UserRole.SALESPERSON;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loading,
    isManager,
    isSalesperson,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
