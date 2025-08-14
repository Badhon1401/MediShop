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

  // Module routes
  MEDICINES: '/medicines',
  INVENTORY: '/inventory',
  REPORTS: '/reports',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
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
