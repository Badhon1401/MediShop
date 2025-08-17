import { httpClient } from '../../../shared/utils/httpClient';
import { API_ENDPOINTS } from '../../../shared/constants/api';
import { STORAGE_KEYS } from '../../../shared/constants/app';
import type {
  UserRegistrationRequest,
  UserLoginRequest,
  UserResponse,
  ForgotPasswordRequest,
  OtpVerificationRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  DeleteProfileRequest
} from '../types';

class UserService {
  async register(userData: UserRegistrationRequest): Promise<UserResponse> {
    return httpClient.post<UserResponse>(API_ENDPOINTS.USER.REGISTER, userData);
  }

  async login(credentials: UserLoginRequest): Promise<UserResponse> {
    return httpClient.post<UserResponse>(API_ENDPOINTS.USER.LOGIN, credentials);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    return httpClient.post<void>(API_ENDPOINTS.USER.FORGOT_PASSWORD, data);
  }

  async verifyOtp(data: OtpVerificationRequest): Promise<void> {
    return httpClient.post<void>(API_ENDPOINTS.USER.VERIFY_OTP, data);
  }

  async resendOtp(data: ResendOtpRequest): Promise<void> {
    return httpClient.post<void>(API_ENDPOINTS.USER.RESEND_OTP, data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    return httpClient.post<void>(API_ENDPOINTS.USER.RESET_PASSWORD, data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    return httpClient.post<void>(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
  }

  async updateProfile(data: UpdateProfileRequest): Promise<UserResponse> {
    return httpClient.put<UserResponse>(API_ENDPOINTS.USER.UPDATE_PROFILE, data);
  }

  async deleteAccount(data: DeleteProfileRequest): Promise<void> {
    return httpClient.delete<void>(API_ENDPOINTS.USER.DELETE_ACCOUNT, data);
  }

  async getProfile(): Promise<UserResponse> {
    return httpClient.get<UserResponse>(API_ENDPOINTS.USER.PROFILE);
  }

  // Auth helper methods
  saveToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const userService = new UserService();
