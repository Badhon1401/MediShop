// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  MANAGER = 'MANAGER',
  SALESPERSON = 'SALESPERSON'
}

export interface UserResponse extends User {
  token?: string;
}

// Request Types
export interface UserRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'MANAGER' | 'SALESPERSON';
}

export interface UserLoginRequest {
  loginIdentifier: string; // Can be email or phone
  password: string;
}

export interface ForgotPasswordRequest {
  emailOrPhone: string;
}

export interface OtpVerificationRequest {
  emailOrPhone: string;
  otp: string;
}

export interface ResendOtpRequest {
  emailOrPhone: string;
}

export interface ResetPasswordRequest {
  emailOrPhone: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  oldPassword: string; // Changed from currentPassword to match backend
  newPassword: string;
  confirmPassword: string; // Backend expects this field
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  currentPassword: string; // Required for identity verification
}

export interface DeleteProfileRequest {
  password: string;
}

// Auth State
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Form States
export interface LoginFormData {
  loginIdentifier: string; // Can be email or phone
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeToTerms: boolean;
}

// API Response
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
}

// Error Response
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
  timestamp: string;
}
