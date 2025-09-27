import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import tabs
import BrowseCoffeTab from "../tabs/BrowseCoffeTab";
import FindProducersTab from "../tabs/FindProducersTab";

const Stack = createStackNavigator();

// Custom Header for Side Navigation
function SideHeader({ navigation, title, subtitle }) {
  return (
    <SafeAreaView edges={["top"]} className="bg-white">
      <View className="border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row items-center"
        >
          <Text className="text-2xl mr-2">←</Text>
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

function SideNavigator() {
  return (
    <Stack.Navigator
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
    </Stack.Navigator>
  );
}

export default SideNavigator;
