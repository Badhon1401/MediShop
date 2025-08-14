import { useState, useEffect } from 'react';
import { useUserOperations } from './useUserOperations';
import type { User, UpdateProfileRequest, ChangePasswordRequest, DeleteProfileRequest } from '../types';

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  // Use shared operations
  const {
    loading,
    error,
    fetchProfile,
    updateProfile: updateProfileOperation,
    changePassword: changePasswordOperation,
    deleteAccount: deleteAccountOperation,
    clearError
  } = useUserOperations();

  // Load user profile using shared operation
  const loadProfile = async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile);
    } catch (err) {
      // Error is already handled in useUserOperations
    }
  };

  // Wrapper functions that update the local user state
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
    // Clear user data after deletion
    setUser(null);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    user,
    loading,
    error,
    fetchProfile: loadProfile,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError
  };
};
