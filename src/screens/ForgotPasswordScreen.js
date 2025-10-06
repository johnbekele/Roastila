import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useUsers } from "../hooks/useUsers";

export default function ForgotPasswordScreen({ navigation }) {
  const { resetPasswordAsync, isResettingPassword, resetPasswordError } =
    useUsers();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await resetPasswordAsync(email);
      setEmailSent(true);
      Alert.alert(
        "Reset Link Sent",
        "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      console.error("Reset password error:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to send reset email. Please try again."
      );
    }
  };

  const handleResendEmail = async () => {
    try {
      await resetPasswordAsync(email);
      Alert.alert(
        "Email Sent",
        "Password reset link has been resent to your email."
      );
    } catch (error) {
      console.error("Resend email error:", error);
      Alert.alert("Error", "Failed to resend email. Please try again.");
    }
  };

  if (emailSent) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-white px-6 py-8 shadow-sm">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-4"
          >
            <Text className="text-blue-500 text-lg">← Back</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 justify-center px-6">
          <View className="bg-white rounded-xl p-8 shadow-sm">
            {/* Success Icon */}
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
                <Text className="text-green-500 text-4xl">✓</Text>
              </View>
              <Text className="text-2xl font-bold text-gray-800 mb-2">
                Check Your Email
              </Text>
              <Text className="text-gray-600 text-center mb-6">
                We've sent a password reset link to:
              </Text>
              <Text className="text-blue-500 font-medium text-lg mb-6">
                {email}
              </Text>
            </View>

            {/* Instructions */}
            <View className="mb-8">
              <Text className="text-gray-700 mb-4">
                Please follow these steps:
              </Text>
              <View className="space-y-3">
                <View className="flex-row items-start">
                  <Text className="text-blue-500 font-bold mr-3">1.</Text>
                  <Text className="text-gray-700 flex-1">
                    Check your email inbox (and spam folder)
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-500 font-bold mr-3">2.</Text>
                  <Text className="text-gray-700 flex-1">
                    Click the "Reset Password" link in the email
                  </Text>
                </View>
                <View className="flex-row items-start">
                  <Text className="text-blue-500 font-bold mr-3">3.</Text>
                  <Text className="text-gray-700 flex-1">
                    Create a new password for your account
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="space-y-3">
              <TouchableOpacity
                onPress={handleResendEmail}
                disabled={isResettingPassword}
                className={`py-3 rounded-lg border-2 ${
                  isResettingPassword ? "border-gray-300" : "border-blue-500"
                }`}
              >
                <Text
                  className={`text-center font-semibold ${
                    isResettingPassword ? "text-gray-400" : "text-blue-500"
                  }`}
                >
                  {isResettingPassword ? "Sending..." : "Resend Email"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                className="bg-blue-500 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">
                  Back to Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* Help Text */}
            <View className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Text className="text-blue-700 text-sm text-center">
                Didn't receive the email? Check your spam folder or contact our
                support team.
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-8 shadow-sm">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mb-4"
          >
            <Text className="text-blue-500 text-lg">← Back</Text>
          </TouchableOpacity>
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Forgot Password?
          </Text>
          <Text className="text-gray-600">
            No worries! Enter your email address and we'll send you a reset
            link.
          </Text>
        </View>

        {/* Form */}
        <View className="px-6 py-6">
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Text>
              <TextInput
                className={`border rounded-lg p-4 text-base ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {error && (
                <Text className="text-red-500 text-sm mt-2">{error}</Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isResettingPassword}
              className={`py-4 rounded-xl ${
                isResettingPassword ? "bg-gray-400" : "bg-blue-500"
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isResettingPassword
                  ? "Sending Reset Link..."
                  : "Send Reset Link"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Help Section */}
          <View className="bg-blue-50 rounded-xl p-6 mb-6">
            <Text className="text-blue-800 font-semibold mb-3">Need Help?</Text>
            <Text className="text-blue-700 text-sm mb-3">
              If you're having trouble resetting your password, you can:
            </Text>
            <View className="space-y-2">
              <Text className="text-blue-700 text-sm">
                • Check your spam/junk email folder
              </Text>
              <Text className="text-blue-700 text-sm">
                • Make sure you're using the correct email address
              </Text>
              <Text className="text-blue-700 text-sm">
                • Contact our support team for assistance
              </Text>
            </View>
          </View>

          {/* Remember Password Link */}
          <View className="flex-row justify-center">
            <Text className="text-gray-600">Remember your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-blue-500 font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
