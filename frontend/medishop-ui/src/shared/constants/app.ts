export const APP_NAME = 'MediShop';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  OTP_VERIFICATION: '/verify-otp',
  UNAUTHORIZED: '/unauthorized',

  // Module routes (with /app prefix for protected routes)
  MEDICINES: '/app/medicines',
  INVENTORY: '/app/inventory',
  SALES: '/app/sales',
  CUSTOMERS: '/app/customers',
  SUPPLIERS: '/app/suppliers',
  USERS: '/app/users',
  REPORTS: '/app/reports',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken', // Changed to match AuthContext
  USER_DATA: 'userData',
  AUTH_TOKEN: 'authToken', // Keep for backward compatibility
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const ROLES = {
  MANAGER: 'MANAGER',
  SALESPERSON: 'SALESPERSON',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  OTP_LENGTH: 6,
  PHONE_MIN_LENGTH: 11,
} as const;
