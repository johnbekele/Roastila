// src/screens/HomeScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Browse Coffee",
      subtitle: "Explore Ethiopian varieties",
      icon: "☕",
      color: "bg-amber-500",
    },
    {
      title: "Find Producers",
      subtitle: "Connect with farmers",
      icon: "🌍",
      color: "bg-green-500",
    },
    {
      title: "Place Order",
      subtitle: "Start new trade",
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      title: "Track Shipment",
      subtitle: "Monitor logistics",
      icon: "🚚",
      color: "bg-purple-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New Order from Yirgacheffe",
      subtitle: "2.5 tons - Grade 1",
      time: "2 hours ago",
      icon: "📦",
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

  const marketInsights = [
    { label: "Ethiopian Export", value: "€2.1M", change: "+12%" },
    { label: "Polish Import", value: "€1.8M", change: "+8%" },
    { label: "Active Orders", value: "47", change: "+5%" },
    { label: "Verified Producers", value: "156", change: "+3%" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        {/* Welcome Section */}
        <View className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white mb-2">
                Welcome back! 👋
              </Text>
              <Text className="text-amber-100 text-base mb-3">
                {user?.first_name || user?.username || "Coffee Professional"},
                ready to trade?
              </Text>
              <Text className="text-amber-200 text-sm">
                Connecting Ethiopia to Poland since 2024
              </Text>
            </View>
            <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center">
              <Text className="text-3xl">☕</Text>
            </View>
          </View>
        </View>

        {/* Market Insights */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Market Insights
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row flex-wrap justify-between">
              {marketInsights.map((insight, index) => (
                <View key={index} className="w-1/2 mb-4">
                  <Text className="text-2xl font-bold text-amber-600">
                    {insight.value}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-1">
                    {insight.label}
                  </Text>
                  <Text className="text-xs text-green-600 font-medium">
                    {insight.change} this month
                  </Text>
                </View>
              ))}
            </View>
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
                className={`${action.color} rounded-xl p-4 flex-1 min-w-[150px]`}
              >
                <Text className="text-white text-2xl mb-2">{action.icon}</Text>
                <Text className="text-white font-semibold text-base mb-1">
                  {action.title}
                </Text>
                <Text className="text-white/80 text-sm">{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activities
          </Text>
          <View className="space-y-4">
            {recentActivities.map((activity) => (
              <View key={activity.id} className="flex-row items-center py-2">
                <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-xl">{activity.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-medium text-base">
                    {activity.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mb-1">
                    {activity.subtitle}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-400 text-xs">
                      {activity.time}
                    </Text>
                    <View className="bg-green-100 px-2 py-1 rounded-full">
                      <Text className="text-green-700 text-xs font-medium">
                        {activity.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Platform Features */}
        <View className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            🌍 Platform Features
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">✅</Text>
              <Text className="text-gray-700 text-sm flex-1">
                Verified Ethiopian coffee producers
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">📊</Text>
              <Text className="text-gray-700 text-sm flex-1">
                Quality reports and certifications
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🚚</Text>
              <Text className="text-gray-700 text-sm flex-1">
                Streamlined logistics and shipping
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">💳</Text>
              <Text className="text-gray-700 text-sm flex-1">
                Secure payment processing
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
