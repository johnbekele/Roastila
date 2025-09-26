import * as Google from "expo-auth-session/providers/google";
import * as React from "react";
import { Button } from "react-native";

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "513337198655-lmejrta8j9oeeb9bm6lpt100vu1hagke.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("Google ID Token:", id_token);
      // Send id_token to backend for verification
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Sign in with Google"
      onPress={() => promptAsync()}
    />
  );
}
