// src/navigation/DrawerNavigator.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

// Navigators
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent({ navigation }) {
  const { logout, user } = useAuth();

  const menuItems = [
    { id: 1, title: "Home", icon: "🏠", screen: "Tabs" },
    { id: 2, title: "Profile", icon: "👤", screen: "Tabs" },
    { id: 3, title: "Settings", icon: "⚙️", screen: "Settings" },
    { id: 4, title: "Notifications", icon: "🔔", screen: "Notifications" },
    { id: 5, title: "Help & Support", icon: "❓", screen: "Help" },
    { id: 6, title: "About", icon: "ℹ️", screen: "About" },
  ];

  const handleLogout = () => {
    logout();
    navigation.closeDrawer();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-500 p-6 pt-12">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
            <Text className="text-2xl">👤</Text>
          </View>
          <View>
            <Text className="text-white text-lg font-bold">
              {user?.userInfo?.name || "User"}
            </Text>
            <Text className="text-blue-100 text-sm">
              {user?.userInfo?.email || "user@example.com"}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1 px-4 py-4">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-row items-center py-4 px-3 rounded-lg mb-2 active:bg-gray-100"
            onPress={() => {
              if (item.screen === "Tabs") {
                navigation.navigate("Tabs");
              } else {
                // For now, just show an alert for unimplemented screens
                alert(`${item.title} screen coming soon!`);
              }
              navigation.closeDrawer();
            }}
          >
            <Text className="text-2xl mr-4">{item.icon}</Text>
            <Text className="text-gray-700 text-lg font-medium">
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View className="p-4 border-t border-gray-200">
        <TouchableOpacity
          className="flex-row items-center py-3 px-3 rounded-lg bg-red-50"
          onPress={handleLogout}
        >
          <Text className="text-2xl mr-4">🚪</Text>
          <Text className="text-red-600 text-lg font-medium">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
