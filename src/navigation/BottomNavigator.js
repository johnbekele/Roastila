import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import tabs
import PlaceOrderTab from "../tabs/PlaceOrderTab";
import TrackShipmentTab from "../tabs/TrackShipmentTab";

const Stack = createStackNavigator();

// Custom Header for Bottom Navigation
function BottomHeader({ navigation, title, subtitle }) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center"
        >
          <Text className="text-2xl mr-2">↑</Text>
          <View>
            <Text className="text-xl font-bold text-gray-800">{title}</Text>
            {subtitle && (
              <Text className="text-sm text-gray-600">{subtitle}</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center"
        >
          <Text className="text-white text-lg font-bold">☕</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function BottomNavigator() {
  return (
    <Stack.Navigator
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
