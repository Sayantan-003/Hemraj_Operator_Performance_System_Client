import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


// Create context
export const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Configuration
const API_BASE = "https://hemraj-operator-performance-system.vercel.app/api";
const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // Refresh token 5 minutes before expiry

export const AuthProvider = ({ children }) => {
  // State
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Debug function
  const debugLog = useCallback((message, data = null) => {
    console.log(`[AuthContext] ${message}`, data || '');
  }, []);

  // Helper functions
  const clearAuthData = useCallback(() => {
    debugLog("Clearing auth data");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setAccessToken(null);
    setUser(null);
  }, [debugLog]);

  const isTokenExpired = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      const expired = decoded.exp <= now;
      debugLog(`Token expired check: ${expired}`, { exp: decoded.exp, now });
      return expired;
    } catch (error) {
      debugLog("Token decode error", error);
      return true;
    }
  }, [debugLog]);

  const setAuthData = useCallback((token) => {
    try {
      debugLog("Setting auth data with token", token.substring(0, 20) + '...');
      const decoded = jwtDecode(token);
      const userData = {
        username: decoded.username,
        role: decoded.role,
        userId: decoded.userId,
        exp: decoded.exp
      };

      // Update state
      setAccessToken(token);
      setUser(userData);

      // Persist to localStorage
      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", userData.role);
      localStorage.setItem("username", userData.username);

      debugLog("Auth data set successfully", userData);
      return userData;
    } catch (error) {
      debugLog("Error setting auth data", error);
      clearAuthData();
      return null;
    }
  }, [clearAuthData, debugLog]);

  // API functions
  const refreshAccessToken = useCallback(async () => {
    if (refreshing) {
      debugLog("Refresh already in progress, skipping");
      return null;
    }

    debugLog("Starting token refresh");
    setRefreshing(true);
    try {
      const response = await axios.post(
        `${API_BASE}/auth/refresh`,
        {},
        { 
          withCredentials: true,
          timeout: 10000 
        }
      );

      const newToken = response.data.accessToken;
      if (newToken) {
        debugLog("Token refresh successful");
        const userData = setAuthData(newToken);
        return { success: true, token: newToken, user: userData };
      }

      throw new Error("No token received from refresh");
    } catch (error) {
      debugLog("Token refresh failed", error.response?.data || error.message);
      clearAuthData();
      return { success: false, error: error.message };
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, setAuthData, clearAuthData, debugLog]);

  const login = useCallback(async (username, password) => {
    try {
      debugLog("Starting login process", { username });
      setLoading(true);
      
      const response = await axios.post(
        'https://hemraj-operator-performance-system.vercel.app/api/auth/login', 
        { username, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      debugLog("Login API response received", response.status);
      
      const token = response.data.accessToken;
      if (!token) {
        throw new Error("No access token received");
      }

      const userData = setAuthData(token);
      if (!userData) {
        throw new Error("Failed to process user data");
      }

      return { success: true, user: userData };
    } catch (error) {
      debugLog("Login error", error.response?.data || error.message);
      clearAuthData();
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed";
      
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [setAuthData, clearAuthData, debugLog]);

  // const logout = useCallback(async () => {
  //   const navigate = useNavigate();

  //   debugLog("Starting logout process");
  //   try {
  //     // Call backend logout (don't wait for it to complete)
  //     await axios.post(`${API_BASE}/auth/logout`, {}, { 
  //       withCredentials: true,
  //       timeout: 5000 
  //     });
  //     debugLog("Logout API call successful");
  //   } catch (error) {
  //     debugLog("Logout API call failed", error.message);
  //   } finally {
  //     // Always clear local auth data
  //     clearAuthData();
      
  //     // Redirect to login
  //     navigate("/login");

  //   }
  // }, [clearAuthData, debugLog]);

  // ===== FIXED: Initialize authentication state with proper dependencies =====
  
  const logout = useCallback(async () => {
  debugLog("Starting logout process");
  try {
    await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true, timeout: 5000 });
    debugLog("Logout API call successful");
  } catch (error) {
    debugLog("Logout API call failed", error.message);
  } finally {
    clearAuthData();
  }
}, [clearAuthData, debugLog]);

  
  
  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts
    
    const initializeAuth = async () => {
      debugLog("Initializing auth state");
      try {
        const storedToken = localStorage.getItem("accessToken");
        debugLog("Stored token found", !!storedToken);
        
        if (!storedToken) {
          if (isMounted) setLoading(false);
          return;
        }

        // Check if stored token is expired
        if (isTokenExpired(storedToken)) {
          debugLog("Stored token expired, attempting refresh");
          clearAuthData();
          if (isMounted) {
            await refreshAccessToken();
          }
          return;
        }

        // Token is valid, use it
        debugLog("Using stored valid token");
        const userData = setAuthData(storedToken);
        if (!userData && isMounted) {
          debugLog("Failed to set user data, attempting refresh");
          await refreshAccessToken();
        }
      } catch (error) {
        debugLog("Auth initialization error", error);
        clearAuthData();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // EMPTY DEPENDENCY ARRAY - only run once on mount

  // ===== FIXED: Axios interceptors with proper dependencies =====
  useEffect(() => {
    debugLog("Setting up axios interceptors");
    
    // Request interceptor
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Always get the most current token from localStorage as backup
        const currentToken = accessToken || localStorage.getItem("accessToken");
        
        // Debug log for all requests
        debugLog(`API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          hasToken: !!currentToken,
          stateToken: !!accessToken,
          storageToken: !!localStorage.getItem("accessToken"),
          tokenPreview: currentToken ? currentToken.substring(0, 20) + '...' : 'none'
        });

        // Skip auth header for auth endpoints
        if (config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh')) {
          debugLog("Skipping auth header for auth endpoint");
          return config;
        }

        if (currentToken && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${currentToken}`;
          debugLog("Added auth header to request");
        } else if (!currentToken) {
          debugLog("WARNING: No token available for authenticated request");
        }
        
        return config;
      },
      (error) => {
        debugLog("Request interceptor error", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        debugLog(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        debugLog(`API Error: ${error.response?.status} ${originalRequest?.url}`, {
          status: error.response?.status,
          message: error.response?.data?.message
        });

        // Handle 401 errors with token refresh
        if (
          error.response?.status === 401 && 
          !originalRequest._retry &&
          !originalRequest.url?.includes('/auth/login') &&
          !originalRequest.url?.includes('/auth/refresh')
        ) {
          debugLog("Attempting token refresh for 401 error");
          originalRequest._retry = true;

          try {
            const refreshResult = await refreshAccessToken();
            if (refreshResult?.success) {
              debugLog("Token refreshed, retrying original request");
              originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`;
              return axios(originalRequest);
            } else {
              debugLog("Token refresh failed, logging out");
            }
          } catch (refreshError) {
            debugLog("Token refresh in interceptor failed", refreshError);
          }

          // Refresh failed, logout user
          logout();
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      debugLog("Cleaning up axios interceptors");
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []); // EMPTY DEPENDENCY ARRAY - setup once and rely on localStorage

  // Debug effect to log state changes
  useEffect(() => {
    debugLog("Auth state changed", { 
      hasUser: !!user, 
      hasToken: !!accessToken, 
      loading, 
      refreshing,
      userRole: user?.role 
    });
  }, [user, accessToken, loading, refreshing, debugLog]);

  // Context value
  const contextValue = {
    // State
    user,
    accessToken,
    loading,
    refreshing,
    
    // Computed values
    isAuthenticated: !!user && !!accessToken,
    isAdmin: user?.role?.includes('admin') || user?.role === 'super_admin',
    
    // Actions
    login,
    logout,
    refreshAccessToken,
    
    // Utilities
    setUser,
    clearAuthData,
    
    // Debug helpers
    debugLog
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};