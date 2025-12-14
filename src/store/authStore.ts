import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
  refreshToken: string | null;
  setAuth: (user: any, token: string, refreshToken?: string) => void;
  setToken: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  isTokenExpired: () => boolean;
  getTokenExpiration: () => number | null;
}

// Utility to decode JWT token without verification (client-side only)
const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const useAuthStore = create<AuthState>((set, get) => {
  // Initialize from localStorage
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    isAuthenticated: !!token && !!user,
    user,
    token,
    refreshToken,

    setAuth: (user, token, refreshToken) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      set({ isAuthenticated: true, user, token, refreshToken: refreshToken || null });
    },

    setToken: (token) => {
      localStorage.setItem('token', token);
      set({ token });
    },

    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null, token: null, refreshToken: null });
    },

    checkAuth: () => {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        const decoded = decodeJWT(token);
        const isExpired = decoded && decoded.exp ? decoded.exp * 1000 < Date.now() : false;
        
        if (isExpired && refreshToken) {
          // Token expired but we have refresh token - don't set as authenticated yet
          // The refresh will happen automatically
          console.warn('Token expired, but refresh token available');
        }
        
        set({ 
          isAuthenticated: !isExpired, 
          user: JSON.parse(userStr), 
          token,
          refreshToken: refreshToken || null
        });
      }
    },

    isTokenExpired: () => {
      const token = get().token || localStorage.getItem('token');
      if (!token) return true;
      
      const decoded = decodeJWT(token);
      if (!decoded || !decoded.exp) return false; // If we can't decode, assume not expired
      
      // Check if token expires in less than 5 minutes (refresh before it expires)
      const expirationTime = decoded.exp * 1000;
      const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
      return expirationTime < fiveMinutesFromNow;
    },

    getTokenExpiration: () => {
      const token = get().token || localStorage.getItem('token');
      if (!token) return null;
      
      const decoded = decodeJWT(token);
      if (!decoded || !decoded.exp) return null;
      
      return decoded.exp * 1000; // Return expiration time in milliseconds
    },
  };
});

