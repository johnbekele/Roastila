// src/navigation/TabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

// Screens
import ChatScreen from "../screens/ChatScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BrowseCoffeTab from "../tabs/BrowseCoffeTab";

const Tab = createBottomTabNavigator();

// Custom Header Component
function CustomHeader({ navigation }) {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ backgroundColor: theme.colors.surface }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
            }}
          >
            Roastila ☕
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            width: 40,
            height: 40,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
            }}
          >
            {user?.first_name?.charAt(0)?.toUpperCase() ||
              user?.username?.charAt(0)?.toUpperCase() ||
              "U"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function TabNavigator() {
  const { theme, themeMode } = useTheme();

  const screenOptions = {
    headerShown: true,
    header: ({ navigation }) => <CustomHeader navigation={navigation} />,
    tabBarStyle: {
      backgroundColor: theme.colors.surface,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingBottom: 5,
      paddingTop: 5,
      height: 60,
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.textSecondary,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "600",
    },
  };

  return (
    <Tab.Navigator key={themeMode} screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              🏠
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseCoffeTab}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              Browse
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              ☕
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
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              👤
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.semibold,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              Chat
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                color: focused
                  ? theme.colors.primary
                  : theme.colors.textSecondary,
              }}
            >
              💬
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
