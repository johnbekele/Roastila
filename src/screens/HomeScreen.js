// src/screens/HomeScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Browse Coffee",
      subtitle: "Explore Ethiopian varieties",
      icon: "☕",
      color: "bg-amber-500",
      action: "side", // Side navigation
      screen: "SideNavigator",
      params: { screen: "BrowseCoffee" },
    },
    {
      title: "Find Producers",
      subtitle: "Connect with farmers",
      icon: "🌍",
      color: "bg-green-500",
      action: "side", // Side navigation
      screen: "SideNavigator",
      params: { screen: "FindProducers" },
    },
    {
      title: "Place Order",
      subtitle: "Start new trade",
      icon: "📦",
      color: "bg-blue-500",
      action: "bottom", // Bottom navigation
      screen: "BottomNavigator",
      params: { screen: "PlaceOrder" },
    },
    {
      title: "Track Shipment",
      subtitle: "Monitor logistics",
      icon: "🚚",
      color: "bg-purple-500",
      action: "bottom", // Bottom navigation
      screen: "BottomNavigator",
      params: { screen: "TrackShipment" },
    },
  ];

  const userName =
    user?.first_name || user?.username || user?.email || "Partner";

  const marketStats = [
    { label: "Ethiopian Export", value: "€2.1M", change: "+12%", icon: "📈" },
    { label: "Polish Import", value: "€1.8M", change: "+8%", icon: "📊" },
    { label: "Active Orders", value: "47", change: "+5%", icon: "📦" },
    { label: "Verified Producers", value: "156", change: "+3%", icon: "✅" },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: "📦",
      text: "Order #ROA2024-001 confirmed",
      time: "2 hours ago",
      status: "Processing",
    },
    {
      id: 2,
      title: "Quality Report Ready",
      subtitle: "Sidamo AA - 2024 Harvest",
      time: "1 day ago",
      icon: "📊",
      status: "Completed",
    },
    {
      id: 3,
      title: "Payment Received",
      subtitle: "€12,450 - Bank Transfer",
      time: "2 days ago",
      icon: "💳",
      status: "Confirmed",
    },
    {
      id: 4,
      title: "Producer Verified",
      subtitle: "Kochere Cooperative",
      time: "3 days ago",
      icon: "✅",
      status: "Verified",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Welcome Section */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {userName}! 👋
          </Text>
          <Text className="text-gray-600">
            Your B2B coffee trading dashboard.
          </Text>
        </View>

        {/* Market Overview */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Market Overview
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {marketStats.map((stat, index) => (
              <View
                key={index}
                className="bg-white rounded-xl p-4 mb-3 w-[48%] shadow-sm"
              >
                <Text className="text-xl mb-1">{stat.icon}</Text>
                <Text className="text-sm text-gray-600">{stat.label}</Text>
                <Text className="text-xl font-bold text-gray-800">
                  {stat.value}
                </Text>
                <Text
                  className={`text-xs font-semibold ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                className={`${action.color} rounded-xl p-4 flex-1 min-w-[150px] active:opacity-80`}
                onPress={() =>
                  navigation.navigate(action.screen, action.params)
                }
              >
                <Text className="text-white text-2xl mb-2">{action.icon}</Text>
                <Text className="text-white font-semibold text-base mb-1">
                  {action.title}
                </Text>
                <Text className="text-white/80 text-sm">{action.subtitle}</Text>
                <View className="mt-2">
                  <Text className="text-white/60 text-xs">
                    {action.action === "side"
                      ? "→ Slide from side"
                      : "↑ Slide from bottom"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </Text>
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {recentActivity.map((activity) => (
              <View
                key={activity.id}
                className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <Text className="text-2xl mr-3">{activity.icon}</Text>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium">
                    {activity.text || activity.title}
                  </Text>
                  {activity.subtitle && (
                    <Text className="text-gray-500 text-sm">
                      {activity.subtitle}
                    </Text>
                  )}
                  <Text className="text-gray-500 text-sm">{activity.time}</Text>
                </View>
                <View className="items-end">
                  <View
                    className={`px-2 py-1 rounded-full ${
                      activity.status === "Completed"
                        ? "bg-green-100"
                        : activity.status === "Processing"
                          ? "bg-yellow-100"
                          : activity.status === "Confirmed"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        activity.status === "Completed"
                          ? "text-green-700"
                          : activity.status === "Processing"
                            ? "text-yellow-700"
                            : activity.status === "Confirmed"
                              ? "text-blue-700"
                              : "text-gray-700"
                      }`}
                    >
                      {activity.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Tips */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Quick Tips
          </Text>
          <View className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <Text className="text-amber-800 font-medium mb-2">💡 Pro Tip</Text>
            <Text className="text-amber-700 text-sm">
              Use the quick actions above to navigate to different sections.
              Side actions slide in from the left, while bottom actions slide up
              from below.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
