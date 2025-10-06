import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

// Import tabs
import ProducerDetailScreen from "../screens/ProducerDetailScreen";
import BrowseCoffeTab from "../tabs/BrowseCoffeTab";
import FindProducersTab from "../tabs/FindProducersTab";

const Stack = createStackNavigator();

// Custom Header for Side Navigation
function SideHeader({ navigation, title, subtitle }) {
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              marginRight: theme.spacing.sm,
              color: theme.colors.text,
            }}
          >
            ←
          </Text>
          <View>
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
              }}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
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
            ☕
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function SideNavigator() {
  const { themeMode } = useTheme();

  return (
    <Stack.Navigator
      key={themeMode}
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route }) => {
          const getHeaderProps = () => {
            switch (route.name) {
              case "BrowseCoffee":
                return {
                  title: "Browse Coffee",
                  subtitle: "Explore Ethiopian varieties",
                };
              case "FindProducers":
                return {
                  title: "Find Producers",
                  subtitle: "Connect with farmers",
                };
              default:
                return { title: "Roastila" };
            }
          };

          return <SideHeader navigation={navigation} {...getHeaderProps()} />;
        },
      }}
    >
      <Stack.Screen
        name="BrowseCoffee"
        component={BrowseCoffeTab}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="FindProducers"
        component={FindProducersTab}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="ProducerDetail"
        component={ProducerDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default SideNavigator;
