import * as AppleAuthentication from "expo-apple-authentication";
import { Alert, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function AppleLoginButton() {
  const { googleLogin } = useAuth(); // Using googleLogin for Apple too since it handles OAuth

  const handleAppleLogin = async () => {
    try {
      console.log("🍎 [APPLE] Starting Apple Sign-In flow");

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("✅ [APPLE] Apple Sign-In successful:", credential);

      // Extract user information from Apple response
      const userInfo = {
        id: credential.user,
        email: credential.email,
        name: credential.fullName
          ? `${credential.fullName.givenName || ""} ${credential.fullName.familyName || ""}`.trim()
          : "Apple User",
        given_name: credential.fullName?.givenName || "",
        family_name: credential.fullName?.familyName || "",
        photo: null, // Apple doesn't provide profile photos
        id_token: credential.identityToken,
        access_token: credential.authorizationCode,
        provider: "apple",
      };

      console.log("📤 [APPLE] Sending user info to backend:", userInfo);

      // Send the Apple user data to your backend for verification and login
      const loginResult = await googleLogin(userInfo);

      if (loginResult.success) {
        console.log("✅ [APPLE] Backend login successful");
        Alert.alert("Success", "Successfully signed in with Apple!");
      } else {
        console.log("❌ [APPLE] Backend login failed:", loginResult.error);
        Alert.alert(
          "Login Failed",
          loginResult.error || "Failed to sign in with Apple."
        );
      }
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        console.log("❌ [APPLE] User cancelled Apple Sign-In");
        Alert.alert(
          "Sign In Cancelled",
          "You cancelled the Apple sign-in process."
        );
      } else {
        console.error("❌ [APPLE] Apple Sign-In error:", e);
        Alert.alert(
          "Sign In Error",
          "An error occurred during Apple sign-in. Please try again."
        );
      }
    }
  };

  return (
    <View className="w-full">
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={{
          width: "100%",
          height: 50,
        }}
        onPress={handleAppleLogin}
      />
    </View>
  );
}
