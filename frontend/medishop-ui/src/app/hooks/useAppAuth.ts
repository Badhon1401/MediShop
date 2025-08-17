// App-level hooks that integrate with the global auth context
import { useAuthContext } from '../store/AuthContext';
import { useToast } from '../store/ToastContext';
import { userService } from '../../modules/user/services/userService';
import type {UserLoginRequest, UserRegistrationRequest, UpdateProfileRequest} from '../../modules/user/types';

export const useAppAuth = () => {
  const authContext = useAuthContext();
  const toast = useToast();

  const login = async (credentials: UserLoginRequest) => {
    try {
      authContext.setLoading(true);
      const response = await userService.login(credentials);

      if (response.token) {
        authContext.login(response, response.token);
        toast.success('Login successful!');
      }
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      authContext.setLoading(false);
    }
  };

  const register = async (userData: UserRegistrationRequest) => {
    try {
      authContext.setLoading(true);
      const response = await userService.register(userData);
      toast.success('Registration successful! Please verify your phone number.');
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      authContext.setLoading(false);
    }
  };

  const logout = () => {
    authContext.logout();
    toast.info('You have been logged out');
  };

  const updateProfile = async (userData: UpdateProfileRequest) => {
    try {
      authContext.setLoading(true);
      const response = await userService.updateProfile(userData);
      authContext.updateUser(response);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(message);
      throw error;
    } finally {
      authContext.setLoading(false);
    }
  };

  return {
    ...authContext,
    login,
    register,
    logout,
    updateProfile,
  };
};

// Hook for handling auth state across the app
export const useAuth = () => {
  const { user, isAuthenticated, loading } = useAuthContext();

  return {
    user,
    isAuthenticated,
    loading,
    isManager: user?.role === 'MANAGER',
    isSalesperson: user?.role === 'SALESPERSON',
  };
};
