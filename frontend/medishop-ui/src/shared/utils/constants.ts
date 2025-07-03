export const API_BASE_URL = 'http://localhost:8080/mediShop/api';

export const ENDPOINTS = {
  MEDICINES: `${API_BASE_URL}/medicines`,
  USERS: `${API_BASE_URL}/users`,
  INVENTORY: `${API_BASE_URL}/inventory`,
} as const;

export const MEDICINE_TYPES = [
  'TABLET',
  'CAPSULE', 
  'SYRUP',
  'INJECTION',
  'OINTMENT',
  'DROP'
] as const;

export const ROUTES = {
  HOME: '/',
  MEDICINES: '/medicines',
  USERS: '/users',
  INVENTORY: '/inventory',
  DASHBOARD: '/dashboard',
} as const;

export const MESSAGES = {
  LOADING: 'Loading...',
  NO_DATA: 'No data found',
  ERROR: 'Something went wrong',
  SUCCESS: 'Operation completed successfully',
  CONFIRM_DELETE: 'Are you sure you want to delete this item?',
} as const;