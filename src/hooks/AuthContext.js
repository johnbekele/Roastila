// src/context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/EnvConfig";

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
        }

        console.log("User Info from storage:", user);
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
      let response;

      if (googleUserData) {
        // Google Sign-In flow
        console.log("🔐 [AUTH] Processing Google Sign-In");
        response = await axios.post(`${API_URL}/auth/google-login`, {
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
        response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
      }

      const { token: authToken, user: userData } = response.data;
      console.log("✅ [AUTH] Login successful, user data:", userData);

      // Store authentication data
      await AsyncStorage.setItem("token", authToken);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      setToken(authToken);
      setUser(userData);

      return { success: true, user: userData };
    } catch (err) {
      console.error(
        "❌ [AUTH] Login error:",
        err.response?.data || err.message
      );
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed";
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
