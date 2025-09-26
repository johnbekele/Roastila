// src/screens/LoginScreen.js
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { login, loading, error } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Expo Go redirect URI
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "513337198655-lmejrta8j9oeeb9bm6lpt100vu1hagke.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    } else if (response?.type === "error") {
      setLocalError(response.error);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserInfo(data);
      navigation.replace("Main");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }
    setLocalError(null);
    console.log("📧 [LOGIN] Email:", email);
    console.log("🔑 [LOGIN] Password:", password);

    const result = await login(email, password);

    if (result.success) {
      console.log("✅ [LOGIN] Login successful, navigating to Main");
      navigation.replace("Main");
    } else {
      console.log("❌ [LOGIN] Login failed:", result.error);
      setLocalError(result.error);
    }
  };

  // Use local error state for display
  const displayError = localError || error;

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      {/* Logo Section */}
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-gray-800 mb-2">
          Roastila ☕
        </Text>
        <Text className="text-lg text-gray-600">Welcome back!</Text>
        {loading && (
          <ActivityIndicator size="large" color="#3b82f6" className="mt-4" />
        )}
      </View>

      {/* Error Message */}
      {displayError && (
        <View className="bg-red-100 border border-red-400 rounded-lg p-3 mb-4">
          <Text className="text-red-700 text-center">{displayError}</Text>
        </View>
      )}

      {/* Input Fields */}
      <View className="space-y-4">
        <TextInput
          className="w-full border border-gray-300 rounded-xl p-4 text-base bg-gray-50"
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          className="w-full border border-gray-300 rounded-xl p-4 text-base bg-gray-50"
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-blue-500 rounded-xl p-4 mt-6"
        onPress={handleEmailLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Signing in..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Google Sign In */}
      <TouchableOpacity
        className="border border-gray-300 rounded-xl p-4 flex-row justify-center items-center"
        disabled={!request || loading}
        onPress={() => promptAsync()}
      >
        <Text className="text-gray-700 font-semibold text-lg ml-2">
          Sign in with Google
        </Text>
      </TouchableOpacity>

      {/* Links Section */}
      <View className="flex-row justify-center space-x-6 mt-8">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-500 font-medium">Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text className="text-blue-500 font-medium">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
