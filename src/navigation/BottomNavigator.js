import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

// Import tabs
import PlaceOrderTab from "../tabs/PlaceOrderTab";
import TrackShipmentTab from "../tabs/TrackShipmentTab";

const Stack = createStackNavigator();

// Custom Header for Bottom Navigation
function BottomHeader({ navigation, title, subtitle }) {
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
            ↑
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

function BottomNavigator() {
  const { themeMode } = useTheme();

  return (
    <Stack.Navigator
      key={themeMode}
      screenOptions={{
        headerShown: true,
        header: ({ navigation, route }) => {
          const getHeaderProps = () => {
            switch (route.name) {
              case "PlaceOrder":
                return {
                  title: "Place Order",
                  subtitle: "Create new trade inquiry",
                };
              case "TrackShipment":
                return {
                  title: "Track Shipment",
                  subtitle: "Monitor logistics",
                };
              default:
                return { title: "Roastila" };
            }
          };

          return <BottomHeader navigation={navigation} {...getHeaderProps()} />;
        },
      }}
    >
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrderTab}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="TrackShipment"
        component={TrackShipmentTab}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default BottomNavigator;
