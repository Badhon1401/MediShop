import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useUserOperations } from './useUserOperations';
import type {
  User,
  UserRegistrationRequest,
  UserLoginRequest,
  ForgotPasswordRequest,
  OtpVerificationRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  DeleteProfileRequest
} from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(userService.isAuthenticated());

  // Use shared operations
  const {
    loading: operationsLoading,
    error: operationsError,
    fetchProfile,
    updateProfile: updateProfileOperation,
    changePassword: changePasswordOperation,
    deleteAccount: deleteAccountOperation,
    clearError: clearOperationsError
  } = useUserOperations();

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Combined loading and error states
  const loading = authLoading || operationsLoading;
  const error = authError || operationsError;

  // Fetch current user profile using shared operation
  const loadUserProfile = async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch (err) {
      // Error is already handled in useUserOperations
    }
  };

  // Load user profile on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && !user) {
      loadUserProfile();
    }
  }, [isAuthenticated]);

  const login = async (credentials: UserLoginRequest) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await userService.login(credentials);

      if (response.token) {
        userService.saveToken(response.token);
        setUser(response);
        setIsAuthenticated(true);
      }
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setAuthError(errorMessage);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData: UserRegistrationRequest) => {
    try {
      setAuthLoading(true);
      setAuthError(null);
      const response = await userService.register(userData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setAuthError(errorMessage);
      throw err;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    userService.removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Wrapper functions that update local user state
  const updateProfile = async (data: UpdateProfileRequest) => {
    const updatedUser = await updateProfileOperation(data);
    setUser(updatedUser);
    return updatedUser;
  };

  const changePassword = async (data: ChangePasswordRequest) => {
    await changePasswordOperation(data);
  };

  const deleteAccount = async (data: DeleteProfileRequest) => {
    await deleteAccountOperation(data);
    logout(); // Auto logout after account deletion
  };

  const clearError = () => {
    setAuthError(null);
    clearOperationsError();
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError
  };
};

export const usePasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');

  const forgotPassword = async (data: ForgotPasswordRequest) => {
    try {
      setLoading(true);
      setError(null);
      await userService.forgotPassword(data);
      setEmailOrPhone(data.emailOrPhone);
      setStep('verify');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Request failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (data: OtpVerificationRequest) => {
    try {
      setLoading(true);
      setError(null);
      await userService.verifyOtp(data);
      setStep('reset');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'OTP verification failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (data: ResendOtpRequest) => {
    try {
      setLoading(true);
      setError(null);
      await userService.resendOtp(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Resend OTP failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequest) => {
    try {
      setLoading(true);
      setError(null);
      await userService.resetPassword(data);
      setStep('request'); // Reset to the initial state
      setEmailOrPhone('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep('request');
    setEmailOrPhone('');
    setError(null);
  };

  return {
    loading,
    error,
    step,
    emailOrPhone,
    forgotPassword,
    verifyOtp,
    resendOtp,
    resetPassword,
    resetFlow,
    clearError: () => setError(null)
  };
};
