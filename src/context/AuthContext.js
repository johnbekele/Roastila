// src/context/AuthContext.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/EnvConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user from storage on app start
  useEffect(() => {
    const loadUser = async () => {
      console.log("🔍 [DEBUG] Loading user from storage...");
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("🔍 [DEBUG] Token from storage:", token);
        if (token && token !== "undefined" && token !== "null") {
          console.log("✅ [DEBUG] Valid token found, setting user");
          setUser({ token });
        } else {
          console.log("❌ [DEBUG] No valid token found");
        }
      } catch (error) {
        console.error("❌ [DEBUG] Error loading user from storage:", error);
        // Clear invalid token
        await AsyncStorage.removeItem("token");
      }
    };
    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    console.log("🚀 [DEBUG] Starting login process");
    console.log("📧 [DEBUG] Email:", email);
    console.log("🔑 [DEBUG] Password:", password);
    setLoading(true);
    setError(null);

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      console.log("🌐 [DEBUG] Making API call to:", `${API_URL}/auth/login`);
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          email,
          password,
        },
        { headers }
      );

      console.log("📥 [DEBUG] Login response:", response.data);

      // Handle the response based on your API structure
      const { token, token_type, expires_at, access_token, refresh_token } =
        response.data;

      // Use the token field from your API response
      const authToken = token || access_token || refresh_token;

      if (authToken && authToken !== "undefined") {
        console.log("💾 [DEBUG] Storing token:", authToken);
        console.log("🔑 [DEBUG] Token type:", token_type);
        console.log("⏰ [DEBUG] Expires at:", expires_at);

        await AsyncStorage.setItem("token", authToken);

        // Get user info using the token
        try {
          console.log(
            "👤 [DEBUG] Fetching user info from:",
            `${API_URL}/api/auth/find/user`
          );
          const userResponse = await axios.get(
            `${API_URL}/api/auth/find/user`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          console.log("👤 [DEBUG] User info response:", userResponse.data);

          setUser({
            token: authToken,
            userInfo: userResponse.data,
            tokenType: token_type,
            expiresAt: expires_at,
          });

          console.log("✅ [DEBUG] User state updated successfully");
          return { success: true, user: userResponse.data };
        } catch (userErr) {
          console.error(
            "❌ [DEBUG] Failed to get user info:",
            userErr.response?.data || userErr.message
          );
          // Still set user with token even if user info fails
          setUser({
            token: authToken,
            tokenType: token_type,
            expiresAt: expires_at,
          });
          return { success: true, user: null };
        }
      } else {
        console.log("❌ [DEBUG] No valid token in response");
        setError("No valid token received from server");
        return { success: false, error: "No valid token received" };
      }
    } catch (err) {
      console.error(
        "❌ [DEBUG] Login error:",
        err.response?.data || err.message
      );
      const errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      console.log("🏁 [DEBUG] Login process completed");
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    console.log("🚪 [DEBUG] Logging out user");
    await AsyncStorage.removeItem("token");
    setUser(null);
    console.log("✅ [DEBUG] User logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
