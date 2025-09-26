// src/screens/LoginScreen.js
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { login, loading } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
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
      setError(response.error);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserInfo(data);
      navigation.replace("Home"); // go to Home after Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      {/* Logo */}
      <View className="mb-10 items-center">
        <Text className="text-4xl font-bold">Roastila ☕</Text>
        {loading && (
          <ActivityIndicator size="large" color="#333" className="mt-4" />
        )}
      </View>

      {/* Inputs */}
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Error */}
      {error && <Text className="text-red-500 mb-2">{error}</Text>}

      {/* Email/Password Login */}
      <Button
        title="Login"
        onPress={() => login(email, password)}
        disabled={loading}
      />

      {/* Google Login */}
      <View className="mt-4">
        <Button
          disabled={!request}
          title="Sign in with Google"
          onPress={() => promptAsync()}
        />
      </View>

      {/* Links */}
      <View className="flex-row mt-4">
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="text-blue-500 mr-4">Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
          <Text className="text-blue-500">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
