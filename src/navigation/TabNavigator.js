// src/navigation/TabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

// Custom Header Component
function CustomHeader({ navigation }) {
  const { user } = useAuth();

  return (
    <View className="bg-white border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
      <Text className="text-xl font-bold text-gray-800">Roastila ☕</Text>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center"
      >
        <Text className="text-white text-lg font-bold">
          {user?.userInfo?.name?.charAt(0)?.toUpperCase() || "U"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs font-semibold ${focused ? "text-blue-500" : "text-gray-500"}`}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-xl ${focused ? "text-blue-500" : "text-gray-500"}`}
            >
              🏠
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs font-semibold ${focused ? "text-blue-500" : "text-gray-500"}`}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              className={`text-xl ${focused ? "text-blue-500" : "text-gray-500"}`}
            >
              👤
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
