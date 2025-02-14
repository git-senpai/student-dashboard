const API_CONFIG = {
  development: 'http://localhost:5000/api',
  production: 'https://student-dashboard-ivory.vercel.app/api',
  test: 'https://student-dashboard-ivory.vercel.app/api'
};

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL || API_CONFIG[import.meta.env.MODE] || API_CONFIG.production;
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify'
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    DASHBOARD: '/user/dashboard'
  },
  COURSES: {
    LIST: '/courses',
    DETAILS: '/courses/:id'
  }
}; 