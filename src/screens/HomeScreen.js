// src/screens/HomeScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Welcome Section */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back! 👋
          </Text>
          <Text className="text-gray-600">
            {user?.userInfo?.name || "User"}, ready to start your day?
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <TouchableOpacity className="bg-blue-500 rounded-xl p-4 flex-1 min-w-[150px]">
              <Text className="text-white text-center font-semibold">
                ☕ New Order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-green-500 rounded-xl p-4 flex-1 min-w-[150px]">
              <Text className="text-white text-center font-semibold">
                📊 Analytics
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center py-2">
              <Text className="text-2xl mr-3">☕</Text>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">
                  Morning Coffee
                </Text>
                <Text className="text-gray-500 text-sm">2 hours ago</Text>
              </View>
            </View>
            <View className="flex-row items-center py-2">
              <Text className="text-2xl mr-3">📱</Text>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">App Updated</Text>
                <Text className="text-gray-500 text-sm">1 day ago</Text>
              </View>
            </View>
            <View className="flex-row items-center py-2">
              <Text className="text-2xl mr-3">🎉</Text>
              <View className="flex-1">
                <Text className="text-gray-800 font-medium">
                  Welcome to Roastila!
                </Text>
                <Text className="text-gray-500 text-sm">3 days ago</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
