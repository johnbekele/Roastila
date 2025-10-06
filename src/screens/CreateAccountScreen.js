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
import { useAuth } from "../hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

export default function CreateAccountScreen({ navigation }) {
  const { loading } = useAuth();
  const { createUserAsync, isCreatingUser, createUserError } = useUsers();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          company: formData.company,
          phone: formData.phone,
        };

        await createUserAsync(userData);

        Alert.alert(
          "Account Created",
          "Your account has been created successfully! Please check your email to verify your account.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      } catch (error) {
        console.error("Registration error:", error);
        Alert.alert(
          "Error",
          error.response?.data?.detail ||
            "Failed to create account. Please try again."
        );
      }
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

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
            Create Account
          </Text>
          <Text className="text-gray-600">
            Join Roastila B2B Platform for premium coffee sourcing
          </Text>
        </View>

        {/* Form */}
        <View className="px-6 py-6">
          {/* Personal Information */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </Text>

            <View className="flex-row space-x-3 mb-4">
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </Text>
                <TextInput
                  className={`border rounded-lg p-3 text-base ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData("firstName", text)}
                  autoCapitalize="words"
                />
                {errors.firstName && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </Text>
                )}
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </Text>
                <TextInput
                  className={`border rounded-lg p-3 text-base ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData("lastName", text)}
                  autoCapitalize="words"
                />
                {errors.lastName && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.lastName}
                  </Text>
                )}
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email address"
                value={formData.email}
                onChangeText={(text) => updateFormData("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.email}
                </Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
                value={formData.phone}
                onChangeText={(text) => updateFormData("phone", text)}
                keyboardType="phone-pad"
              />
              {errors.phone && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </Text>
              )}
            </View>
          </View>

          {/* Business Information */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Business Information
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter company name"
                value={formData.company}
                onChangeText={(text) => updateFormData("company", text)}
                autoCapitalize="words"
              />
              {errors.company && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.company}
                </Text>
              )}
            </View>
          </View>

          {/* Security */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Security
            </Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password *
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Create a strong password"
                value={formData.password}
                onChangeText={(text) => updateFormData("password", text)}
                secureTextEntry
                autoComplete="new-password"
              />
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password}
                </Text>
              )}
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </Text>
              <TextInput
                className={`border rounded-lg p-3 text-base ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateFormData("confirmPassword", text)}
                secureTextEntry
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <TouchableOpacity
              onPress={() =>
                updateFormData("agreeToTerms", !formData.agreeToTerms)
              }
              className="flex-row items-start"
            >
              <View
                className={`w-5 h-5 rounded border-2 mr-3 mt-0.5 ${
                  formData.agreeToTerms
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                {formData.agreeToTerms && (
                  <Text className="text-white text-xs text-center leading-5">
                    ✓
                  </Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Text className="text-blue-500 font-medium">
                    Terms of Service
                  </Text>{" "}
                  and{" "}
                  <Text className="text-blue-500 font-medium">
                    Privacy Policy
                  </Text>
                </Text>
                {errors.agreeToTerms && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.agreeToTerms}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isCreatingUser}
            className={`py-4 rounded-xl ${
              isCreatingUser ? "bg-gray-400" : "bg-blue-500"
            }`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {isCreatingUser ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-blue-500 font-medium">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
