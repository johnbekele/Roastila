// src/screens/HomeScreen.js
import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold">Welcome to Roastila ☕</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
