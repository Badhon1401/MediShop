export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT),
  RETRY_ATTEMPTS: Number(import.meta.env.VITE_API_RETRY),
}

export const API_ENDPOINTS = {
  // User endpoints
  USER: {
    REGISTER: '/api/users/register',
    LOGIN: '/api/users/login',
    PROFILE: '/api/users/profile', // add this in the backend
    CHANGE_PASSWORD: '/api/users/change-password',
    FORGOT_PASSWORD: '/api/users/forgot-password',
    VERIFY_OTP: '/api/users/verify-otp',
    RESEND_OTP: '/api/users/resend-otp',
    RESET_PASSWORD: '/api/users/reset-password',
    UPDATE_PROFILE: '/api/users/update-profile',
    DELETE_ACCOUNT: '/api/users/delete-account',
  },
  // Medicine endpoints (for future implementation)
  MEDICINE: {
    LIST: '/api/medicines',
    CREATE: '/api/medicines',
    UPDATE: '/api/medicines',
    DELETE: '/api/medicines',
    SEARCH: '/api/medicines/search',
  },
  // Inventory endpoints (for future implementation)
  INVENTORY: {
    LIST: '/api/inventory',
    CREATE: '/api/inventory',
    UPDATE: '/api/inventory',
    DELETE: '/api/inventory',
    LOW_STOCK: '/api/inventory/low-stock',
  },
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
