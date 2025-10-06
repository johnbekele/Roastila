// src/screens/LoginScreen.js
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { isNetworkAvailable } from "../utils/networkUtils";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const { login, loading, error } = useAuth();
  const { theme } = useTheme();
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
      // Handle Google authentication if needed
      console.log("Google auth success:", authentication);
    } else if (response?.type === "error") {
      setLocalError(response.error);
    }
  }, [response]);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    setLocalError(null);
    console.log("📧 [LOGIN] Email:", email);
    console.log("🔑 [LOGIN] Password:", password);

    // Check network connectivity first
    const networkAvailable = await isNetworkAvailable();
    if (!networkAvailable) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again.",
        [{ text: "OK" }]
      );
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      console.log(
        "✅ [LOGIN] Login successful, user will be redirected automatically"
      );
      // Navigation will happen automatically due to AuthContext state change
    } else {
      console.log("❌ [LOGIN] Login failed:", result.error);
      setLocalError(result.error);
    }
  };

  // Use local error state for display
  const displayError = localError || error;

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xl,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <View className="items-center">
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: theme.colors.secondary,
                borderRadius: theme.borderRadius.full,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize["3xl"],
                }}
              >
                ☕
              </Text>
            </View>
            <Text
              style={{
                fontSize: theme.typography.fontSize["3xl"],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Roastila
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.lg,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              Welcome back to the B2B Coffee Platform
            </Text>
          </View>
        </View>

        {/* Login Form */}
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.lg,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.md,
                textAlign: "center",
              }}
            >
              Sign In to Your Account
            </Text>

            {/* Error Message */}
            {displayError && (
              <View
                style={{
                  backgroundColor: theme.colors.errorLight,
                  borderWidth: 1,
                  borderColor: theme.colors.error,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.md,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.error,
                    textAlign: "center",
                  }}
                >
                  {displayError}
                </Text>
              </View>
            )}

            {/* Email Input */}
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Email Address
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.md,
                  fontSize: theme.typography.fontSize.base,
                  backgroundColor: theme.colors.backgroundSecondary,
                  color: theme.colors.text,
                }}
                placeholder="Enter your email address"
                placeholderTextColor={theme.colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {/* Password Input */}
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Password
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: theme.borderRadius.lg,
                  padding: theme.spacing.md,
                  fontSize: theme.typography.fontSize.base,
                  backgroundColor: theme.colors.backgroundSecondary,
                  color: theme.colors.text,
                }}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.textTertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={{
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                backgroundColor: loading
                  ? theme.colors.textTertiary
                  : theme.colors.primary,
              }}
              onPress={handleEmailLogin}
              disabled={loading}
            >
              {loading ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.textInverse}
                  />
                  <Text
                    style={{
                      color: theme.colors.textInverse,
                      fontWeight: theme.typography.fontWeight.semibold,
                      fontSize: theme.typography.fontSize.lg,
                      marginLeft: theme.spacing.sm,
                    }}
                  >
                    Signing in...
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    textAlign: "center",
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.lg,
                  }}
                >
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: theme.spacing.md,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }}
            />
            <Text
              style={{
                marginHorizontal: theme.spacing.md,
                color: theme.colors.textTertiary,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              or
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }}
            />
          </View>

          {/* Google Sign In */}
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.md,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            disabled={!request || loading}
            onPress={() => promptAsync()}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: theme.typography.fontWeight.semibold,
                fontSize: theme.typography.fontSize.lg,
              }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Links Section */}
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
              style={{
                backgroundColor: theme.colors.secondary,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                marginBottom: theme.spacing.md,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  textAlign: "center",
                  fontWeight: theme.typography.fontWeight.semibold,
                  fontSize: theme.typography.fontSize.lg,
                }}
              >
                Create New Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={{
                paddingVertical: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: "center",
                  fontWeight: theme.typography.fontWeight.medium,
                }}
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Business Benefits */}
          <View
            style={{
              marginTop: theme.spacing.lg,
              backgroundColor: theme.colors.infoLight,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.md,
            }}
          >
            <Text
              style={{
                color: theme.colors.info,
                fontWeight: theme.typography.fontWeight.semibold,
                marginBottom: theme.spacing.sm,
                textAlign: "center",
                fontSize: theme.typography.fontSize.lg,
              }}
            >
              Why Choose Roastila?
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.info,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  ✓
                </Text>
                <Text
                  style={{
                    color: theme.colors.info,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  Premium Ethiopian coffee sourcing
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.info,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  ✓
                </Text>
                <Text
                  style={{
                    color: theme.colors.info,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  Direct trade with certified producers
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.info,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  ✓
                </Text>
                <Text
                  style={{
                    color: theme.colors.info,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  Competitive B2B pricing and terms
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme.colors.info,
                    marginRight: theme.spacing.sm,
                  }}
                >
                  ✓
                </Text>
                <Text
                  style={{
                    color: theme.colors.info,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  Quality assurance and traceability
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
