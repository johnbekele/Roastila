// src/screens/ProfileScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const { logout, user } = useAuth();

  const businessStats = [
    { label: "Orders Placed", value: "47", icon: "📦" },
    { label: "Partners", value: "12", icon: "🤝" },
    { label: "Coffee Varieties", value: "8", icon: "☕" },
    { label: "Trade Volume", value: "2.4T", icon: "📊" },
  ];

  const menuItems = [
    {
      title: "Order Management",
      icon: "📋",
      color: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Producer Network",
      icon: "🌍",
      color: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Quality Reports",
      icon: "📈",
      color: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
    {
      title: "Logistics & Shipping",
      icon: "🚚",
      color: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Payment & Finance",
      icon: "💳",
      color: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      title: "Compliance & Docs",
      icon: "📄",
      color: "bg-gray-50",
      textColor: "text-gray-700",
    },
  ];

  const getBusinessType = () => {
    // This could be determined by user role or preferences
    return user?.business_type || "Coffee Importer";
  };

  const getLocation = () => {
    return user?.location || "Poland";
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <View className="bg-gradient-to-r from-amber-600 to-amber-800 px-6 pt-16 pb-8">
        <View className="items-center">
          {/* Profile Avatar */}
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4 shadow-lg">
            <Text className="text-4xl font-bold text-amber-600">
              {user?.first_name?.charAt(0)?.toUpperCase() ||
                user?.username?.charAt(0)?.toUpperCase() ||
                "U"}
            </Text>
          </View>

          {/* User Name & Business Type */}
          <Text className="text-2xl font-bold text-white mb-1">
            {user?.first_name || user?.username || "Coffee Professional"}
          </Text>
          <Text className="text-amber-100 text-base mb-1">
            {getBusinessType()}
          </Text>
          <Text className="text-amber-200 text-sm">📍 {getLocation()}</Text>

          {/* Mission Quote */}
          <View className="bg-white/20 rounded-full px-4 py-2 mt-3">
            <Text className="text-white text-sm font-medium text-center">
              "Connecting Ethiopia to Poland ☕"
            </Text>
          </View>
        </View>
      </View>

      {/* Business Stats Section */}
      <View className="px-6 -mt-4 mb-6">
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <Text className="text-lg font-bold text-gray-800 mb-4">
            Your Trading Dashboard
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {businessStats.map((stat, index) => (
              <View key={index} className="items-center w-1/2 mb-4">
                <Text className="text-3xl mb-1">{stat.icon}</Text>
                <Text className="text-2xl font-bold text-amber-600">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-600 text-center">
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Business Information Card */}
      {(user?.userInfo || user?.email) && (
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-lg">
            <View className="flex-row items-center mb-4">
              <Text className="text-2xl mr-3">🏢</Text>
              <Text className="text-lg font-bold text-gray-800">
                Business Information
              </Text>
            </View>

            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Full Name</Text>
                <Text className="text-gray-800 font-semibold">
                  {user?.first_name || "N/A"} {user?.last_name || ""}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Business Type</Text>
                <Text className="text-gray-800 font-semibold">
                  {getBusinessType()}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Location</Text>
                <Text className="text-gray-800 font-semibold">
                  {getLocation()}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
                <Text className="text-gray-600 font-medium">Email</Text>
                <Text className="text-gray-800 font-semibold text-sm">
                  {user?.email || "N/A"}
                </Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <Text className="text-gray-600 font-medium">Member Since</Text>
                <Text className="text-gray-800 font-semibold">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Platform Features */}
      <View className="px-6 mb-6">
        <Text className="text-lg font-bold text-gray-800 mb-4 px-2">
          Platform Tools
        </Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`${item.color} rounded-xl p-4 mb-3 flex-row items-center`}
            onPress={() => {
              // Handle menu item press
              console.log(`${item.title} pressed`);
            }}
          >
            <Text className="text-2xl mr-4">{item.icon}</Text>
            <Text
              className={`${item.textColor} text-base font-semibold flex-1`}
            >
              {item.title}
            </Text>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mission Statement */}
      <View className="px-6 mb-6">
        <View className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-2xl p-6">
          <Text className="text-lg font-bold text-amber-800 mb-3">
            🌍 Our Mission
          </Text>
          <Text className="text-amber-700 text-sm leading-6">
            Empowering Ethiopian coffee producers with direct access to the
            Polish market, while providing verified, high-quality products to
            Polish importers and specialty cafés.
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          className="bg-red-500 rounded-xl p-4 flex-row items-center justify-center"
          onPress={logout}
        >
          <Text className="text-white text-lg font-semibold mr-2">🚪</Text>
          <Text className="text-white text-lg font-semibold">Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View className="items-center pb-8">
        <Text className="text-gray-400 text-sm">Roastila B2B Platform</Text>
        <Text className="text-gray-400 text-xs mt-1">
          Ethiopia ↔ Poland Coffee Trade
        </Text>
      </View>
    </ScrollView>
  );
}
