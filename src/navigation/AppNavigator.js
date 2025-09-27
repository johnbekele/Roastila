import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { ActivityIndicator, View } from "react-native";

// Context
import { AuthContext } from "../hooks/AuthContext";

// Navigators
import DrawerNavigator from "./DrawerNavigator";

// Screens
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={user ? "Main" : "Login"}
      screenOptions={{ headerShown: false }}
    >
      {user ? (
        // User is authenticated - show Drawer Navigator
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        // User is not authenticated - show Login screen
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
