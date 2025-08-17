import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import {type User, UserRole } from '../../modules/user/types';
import { storage } from '../../shared/utils';
import { STORAGE_KEYS } from '../../shared/constants/app';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'INITIALIZE'; payload: { user: User | null; token: string | null } };

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'INITIALIZE':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        loading: false,
      };

    default:
      return state;
  }
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN);
    const userData = storage.get(STORAGE_KEYS.USER_DATA);
    
    if (token && userData) {
      try {
        const user = typeof userData === 'string' ? JSON.parse(userData) : userData;
        dispatch({ type: 'INITIALIZE', payload: { user, token } });
      } catch (error) {
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.USER_DATA);
        dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
      }
    } else {
      dispatch({ type: 'INITIALIZE', payload: { user: null, token: null } });
    }
  }, []);

  const login = (user: User, token: string) => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
    storage.set(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  const logout = () => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.USER_DATA);
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    storage.set(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const hasRole = (role: UserRole): boolean => {
    return state.user?.role === role;
  };

  const isManager = (): boolean => hasRole(UserRole.MANAGER);
  const isSalesperson = (): boolean => hasRole(UserRole.SALESPERSON);

  const value: AuthContextType & { hasRole: (role: UserRole) => boolean; isManager: () => boolean; isSalesperson: () => boolean } = {
    ...state,
    login,
    logout,
    updateUser,
    setLoading,
    hasRole,
    isManager,
    isSalesperson,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export class useAuthContext {
}