// src/screens/ProfileScreen.js
import { Button, Text, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const { logout, user } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">Profile</Text>

      {user?.userInfo && (
        <View className="bg-gray-100 rounded-xl p-4 mb-6 w-full">
          <Text className="text-lg font-semibold text-gray-700 mb-2">
            User Info:
          </Text>
          <Text className="text-gray-600">
            Email: {user.userInfo.email || "N/A"}
          </Text>
          <Text className="text-gray-600">
            Name: {user.userInfo.name || "N/A"}
          </Text>
        </View>
      )}

      <View className="bg-blue-100 rounded-xl p-4 mb-6 w-full">
        <Text className="text-lg font-semibold text-blue-700 mb-2">
          Token Info:
        </Text>
        <Text className="text-blue-600">Type: {user?.tokenType || "N/A"}</Text>
        <Text className="text-blue-600">
          Expires: {user?.expiresAt || "N/A"}
        </Text>
      </View>

      <Button
        title="Logout"
        onPress={logout}
        className="bg-red-500 text-white px-6 py-3 rounded-xl"
      />
    </View>
  );
}
