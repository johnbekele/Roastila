// src/navigation/DrawerNavigator.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

// Navigators
import AboutScreen from "../screens/AboutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import BottomNavigator from "./BottomNavigator";
import SideNavigator from "./SideNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent({ navigation }) {
  const { logout, user } = useAuth();
  const { theme } = useTheme();

  const menuItems = [
    { id: 1, title: "Home", icon: "🏠", screen: "Tabs" },
    { id: 2, title: "Profile", icon: "👤", screen: "Profile" },
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          paddingTop: theme.spacing.xxl,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.full,
              alignItems: "center",
              justifyContent: "center",
              marginRight: theme.spacing.md,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize["2xl"],
              }}
            >
              👤
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              {user?.username || "User"}
            </Text>
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                opacity: 0.8,
              }}
            >
              {user?.email || "user@example.com"}
            </Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
        }}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.sm,
            }}
            onPress={() => {
              if (item.screen === "Tabs") {
                navigation.navigate("Tabs");
              } else {
                navigation.navigate(item.screen);
              }
              navigation.closeDrawer();
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize["2xl"],
                marginRight: theme.spacing.md,
              }}
            >
              {item.icon}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.medium,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          padding: theme.spacing.md,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.sm,
            borderRadius: theme.borderRadius.lg,
            backgroundColor: theme.colors.errorLight,
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize["2xl"],
              marginRight: theme.spacing.md,
            }}
          >
            🚪
          </Text>
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.medium,
            }}
          >
            Logout
          </Text>
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
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen
        name="SideNavigator"
        component={SideNavigator}
        options={{
          drawerItemStyle: { display: "none" }, // Hide from drawer menu
        }}
      />
      <Drawer.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          drawerItemStyle: { display: "none" }, // Hide from drawer menu
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
