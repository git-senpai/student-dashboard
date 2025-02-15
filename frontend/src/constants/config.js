const API_CONFIG = {
  development: "http://localhost:5000",
  production: "https://student-dashboard-one-tawny.vercel.app",
  test: "https://student-dashboard-one-tawny.vercel.app",
};

export const getApiUrl = () => {
  return (
    import.meta.env.VITE_API_URL ||
    API_CONFIG[import.meta.env.MODE] ||
    API_CONFIG.production
  );
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    VERIFY: "/auth/verify",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
    DASHBOARD: "/user/dashboard",
  },
  COURSES: {
    LIST: "/courses",
    DETAILS: "/courses/:id",
  },
};
