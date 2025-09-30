import {
  GoogleLogoButton,
  GoogleOneTapSignIn,
} from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function GoogleSignInButton() {
  const { googleLogin } = useAuth();

  // Configure Google Sign-In when component mounts
  useEffect(() => {
    GoogleOneTapSignIn.configure({
      webClientId:
        "513337198655-lmejrta8j9oeeb9bm6lpt100vu1hagke.apps.googleusercontent.com",
      offlineAccess: true,
      hostedDomain: "",
      forceCodeForRefreshToken: true,
    });
  }, []);

  const startSignInFlow = async () => {
    try {
      console.log("🚀 [GOOGLE] Starting Google One Tap Sign-In flow");

      // Check if Google Play Services are available
      await GoogleOneTapSignIn.checkPlayServices();
      console.log("✅ [GOOGLE] Google Play Services available");

      // Try to sign in with saved credentials
      const signInResponse = await GoogleOneTapSignIn.signIn();
      console.log("📥 [GOOGLE] Sign-in response:", signInResponse);

      if (signInResponse.type === "success") {
        console.log("✅ [GOOGLE] Sign-in successful with saved credentials");
        await handleSuccessfulSignIn(signInResponse.data);
      } else if (signInResponse.type === "noSavedCredentialFound") {
        console.log(
          "🔄 [GOOGLE] No saved credentials found, trying to create account"
        );

        // Try to create a new account
        const createResponse = await GoogleOneTapSignIn.createAccount();
        console.log("📥 [GOOGLE] Create account response:", createResponse);

        if (createResponse.type === "success") {
          console.log("✅ [GOOGLE] Account creation successful");
          await handleSuccessfulSignIn(createResponse.data);
        } else if (createResponse.type === "noSavedCredentialFound") {
          console.log(
            "🔄 [GOOGLE] No Google account on device, showing explicit sign-in"
          );

          // Show explicit sign-in dialog
          const explicitResponse =
            await GoogleOneTapSignIn.presentExplicitSignIn();
          console.log(
            "📥 [GOOGLE] Explicit sign-in response:",
            explicitResponse
          );

          if (explicitResponse.type === "success") {
            console.log("✅ [GOOGLE] Explicit sign-in successful");
            await handleSuccessfulSignIn(explicitResponse.data);
          } else {
            console.log("❌ [GOOGLE] User cancelled explicit sign-in");
            Alert.alert(
              "Sign In Cancelled",
              "You cancelled the Google sign-in process."
            );
          }
        } else {
          console.log("❌ [GOOGLE] User cancelled account creation");
          Alert.alert(
            "Sign In Cancelled",
            "You cancelled the Google account creation."
          );
        }
      } else {
        console.log("❌ [GOOGLE] User cancelled sign-in");
        Alert.alert(
          "Sign In Cancelled",
          "You cancelled the Google sign-in process."
        );
      }
    } catch (error) {
      console.error("❌ [GOOGLE] Sign-in error:", error);
      Alert.alert(
        "Sign In Error",
        "An error occurred during Google sign-in. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleSuccessfulSignIn = async (userData) => {
    try {
      console.log("👤 [GOOGLE] User data received:", userData);

      // Extract user information from Google response
      const userInfo = {
        id: userData.user.id,
        email: userData.user.email,
        name: userData.user.name,
        given_name: userData.user.givenName,
        family_name: userData.user.familyName,
        photo: userData.user.photo,
        id_token: userData.idToken,
        access_token: userData.accessToken,
      };

      console.log("📤 [GOOGLE] Sending user info to backend:", userInfo);

      // Send the Google user data to your backend for verification and login
      const loginResult = await googleLogin(userInfo);

      if (loginResult.success) {
        console.log("✅ [GOOGLE] Backend login successful");
        Alert.alert("Success", "Successfully signed in with Google!");
      } else {
        console.log("❌ [GOOGLE] Backend login failed:", loginResult.error);
        Alert.alert(
          "Login Failed",
          loginResult.error || "Failed to sign in with Google."
        );
      }
    } catch (error) {
      console.error("❌ [GOOGLE] Error handling successful sign-in:", error);
      Alert.alert(
        "Error",
        "Failed to process Google sign-in. Please try again."
      );
    }
  };

  return (
    <View className="w-full">
      <GoogleLogoButton
        onPress={startSignInFlow}
        label="Sign in with Google"
        style={{
          width: "100%",
          height: 50,
          borderRadius: 8,
        }}
      />
    </View>
  );
}
