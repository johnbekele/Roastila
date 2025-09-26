import * as AppleAuthentication from "expo-apple-authentication";
import { Alert, View } from "react-native";

export default function AppleLoginButton() {
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // credential contains user info & identityToken
      console.log("Apple Credential:", credential);

      // You can send credential.identityToken to your backend
      Alert.alert("Logged in!", `Welcome ${credential.fullName?.givenName}`);
    } catch (e) {
      if (e.code === "ERR_CANCELED") {
        Alert.alert("Login cancelled");
      } else {
        console.error(e);
        Alert.alert("Login failed", e.message);
      }
    }
  };

  return (
    <View>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={handleAppleLogin}
      />
    </View>
  );
}
