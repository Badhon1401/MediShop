import { useState } from 'react';
import { userService } from '../services/userService';
import type { User, UpdateProfileRequest, ChangePasswordRequest, DeleteProfileRequest } from '../types';

/**
 * Shared hook for user profile operations
 * Contains common functionality used by both useAuth and useProfile
 */
export const useUserOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getProfile();
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: UpdateProfileRequest): Promise<User> => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.updateProfile(data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await userService.changePassword(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Password change failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async (data: DeleteProfileRequest): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await userService.deleteAccount(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Account deletion failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    fetchProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError
  };
};
