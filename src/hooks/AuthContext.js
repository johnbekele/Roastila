// src/context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import apiClient from "../config/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user & token from storage on app start
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log("User Info from storage:", JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Failed to load auth:", err);
      }
    };
    loadAuth();
  }, []);

  // Regular login function
  const login = async (email, password, googleUserData = null) => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have valid credentials
      if (!googleUserData && (!email || !password)) {
        throw new Error("Email and password are required");
      }
      let response;

      if (googleUserData) {
        // Google Sign-In flow
        console.log("🔐 [AUTH] Processing Google Sign-In");
        response = await apiClient.post("auth/google-login", {
          id_token: googleUserData.id_token,
          access_token: googleUserData.access_token,
          email: googleUserData.email,
          name: googleUserData.name,
          given_name: googleUserData.given_name,
          family_name: googleUserData.family_name,
          photo: googleUserData.photo,
        });
      } else {
        // Regular email/password login
        console.log("🔐 [AUTH] Processing regular login");
        response = await apiClient.post("auth/login", {
          email,
          password,
        });
      }

      const {
        token: authToken,
        user: userData,
        token_type,
        expires_at,
      } = response.data;
      console.log("✅ [AUTH] Login successful, user data:", userData);
      console.log("✅ [AUTH] Token type:", token_type);
      console.log("✅ [AUTH] Expires at:", expires_at);

      // Store authentication data
      await AsyncStorage.setItem("token", authToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      await AsyncStorage.setItem("token_type", token_type);
      await AsyncStorage.setItem("expires_at", expires_at);

      setToken(authToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (err) {
      console.error(
        "❌ [AUTH] Login error:",
        err.response?.data || err.message
      );

      let errorMessage = "Login failed";

      if (err.code === "ECONNABORTED") {
        errorMessage =
          "Request timeout - please check your internet connection";
      } else if (err.message === "Network Error") {
        errorMessage = "Network error - please check your internet connection";
      } else if (err.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error - please try again later";
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In specific function
  const googleLogin = async (googleUserData) => {
    return await login(null, null, googleUserData);
  };

  // Logout function
  const logout = async () => {
    console.log("🚪 [AUTH] Logging out user");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token_type");
    await AsyncStorage.removeItem("expires_at");
    setToken(null);
    setUser(null);
    console.log("✅ [AUTH] User logged out successfully");
  };

  console.log("User Info from context:", user);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
