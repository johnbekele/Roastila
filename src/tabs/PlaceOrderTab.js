import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const PlaceOrderTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCoffees, setSelectedCoffees] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");

  // Mock coffee selection data
  const availableCoffees = [
    {
      id: "coffee-001",
      name: "Ethiopian Yirgacheffe G1",
      origin: "Yirgacheffe, Ethiopia",
      price: "€15.00",
      unit: "per kg",
      quantity: 150,
      producer: "Abebe Coffee Farm",
      minOrder: 50,
    },
    {
      id: "coffee-002",
      name: "Ethiopian Sidamo Natural",
      origin: "Sidamo, Ethiopia",
      price: "€14.00",
      unit: "per kg",
      quantity: 200,
      producer: "Kebede Family Farm",
      minOrder: 30,
    },
    {
      id: "coffee-003",
      name: "Ethiopian Harrar Longberry",
      origin: "Harrar, Ethiopia",
      price: "€12.67",
      unit: "per kg",
      quantity: 75,
      producer: "Harrar Coffee Cooperative",
      minOrder: 25,
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAddToOrder = (coffee) => {
    const existingItem = selectedCoffees.find((item) => item.id === coffee.id);
    if (existingItem) {
      setSelectedCoffees((prev) =>
        prev.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setSelectedCoffees((prev) => [...prev, { ...coffee, quantity: 1 }]);
    }
  };

  const handleRemoveFromOrder = (coffeeId) => {
    setSelectedCoffees((prev) => prev.filter((item) => item.id !== coffeeId));
  };

  const handleUpdateQuantity = (coffeeId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromOrder(coffeeId);
      return;
    }
    setSelectedCoffees((prev) =>
      prev.map((item) =>
        item.id === coffeeId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return selectedCoffees.reduce((total, item) => {
      const price = parseFloat(item.price.replace("€", ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handlePlaceOrder = () => {
    if (selectedCoffees.length === 0) {
      Alert.alert("Empty Order", "Please add coffees to your order first.");
      return;
    }

    Alert.alert(
      "Place Order",
      `Total: €${calculateTotal().toFixed(2)}\n\nThis will create a new order inquiry. Continue?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Place Order", onPress: () => console.log("Order placed") },
      ]
    );
  };

  const CoffeeSelectionCard = ({ coffee }) => (
    <View className="bg-white rounded-xl shadow-sm mb-3 p-4">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {coffee.name}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {coffee.origin} • {coffee.producer}
          </Text>
          <Text className="text-sm text-gray-500">
            Available: {coffee.quantity}kg • Min: {coffee.minOrder}kg
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-amber-600">
            {coffee.price}
          </Text>
          <Text className="text-xs text-gray-500">{coffee.unit}</Text>
        </View>
      </View>

      <View className="flex-row items-center justify-between mt-3">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() =>
              handleUpdateQuantity(
                coffee.id,
                (selectedCoffees.find((item) => item.id === coffee.id)
                  ?.quantity || 0) - 1
              )
            }
            className="bg-gray-200 w-8 h-8 rounded-full items-center justify-center"
          >
            <Text className="text-gray-600 font-bold">-</Text>
          </TouchableOpacity>
          <Text className="mx-4 text-lg font-semibold">
            {selectedCoffees.find((item) => item.id === coffee.id)?.quantity ||
              0}
          </Text>
          <TouchableOpacity
            onPress={() =>
              handleUpdateQuantity(
                coffee.id,
                (selectedCoffees.find((item) => item.id === coffee.id)
                  ?.quantity || 0) + 1
              )
            }
            className="bg-amber-500 w-8 h-8 rounded-full items-center justify-center"
          >
            <Text className="text-white font-bold">+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleAddToOrder(coffee)}
          className="bg-blue-500 px-4 py-2 rounded-lg active:bg-blue-600"
        >
          <Text className="text-white font-semibold text-sm">Add to Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const OrderSummaryCard = () => {
    if (selectedCoffees.length === 0) {
      return (
        <View className="bg-white rounded-xl shadow-sm p-6 items-center">
          <Text className="text-4xl mb-2">📦</Text>
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            No items in order
          </Text>
          <Text className="text-gray-600 text-center">
            Add coffees from the list below to create your order
          </Text>
        </View>
      );
    }

    return (
      <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Order Summary
        </Text>
        {selectedCoffees.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <View className="flex-1">
              <Text className="font-medium text-gray-800">{item.name}</Text>
              <Text className="text-sm text-gray-600">
                {item.quantity}kg × {item.price}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-800 mr-3">
                €
                {(
                  parseFloat(item.price.replace("€", "")) * item.quantity
                ).toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveFromOrder(item.id)}
                className="bg-red-100 p-1 rounded-full"
              >
                <Text className="text-red-600 text-xs">✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View className="flex-row justify-between items-center pt-3 mt-3 border-t border-gray-200">
          <Text className="text-lg font-bold text-gray-800">Total</Text>
          <Text className="text-xl font-bold text-amber-600">
            €{calculateTotal().toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-1">
          Place Order
        </Text>
        <Text className="text-gray-600">Create a new coffee order inquiry</Text>
      </View>

      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <OrderSummaryCard />

        {/* Order Notes */}
        <View className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Order Notes
          </Text>
          <TextInput
            className="bg-gray-50 rounded-lg p-3 text-gray-800"
            placeholder="Add any special requirements or notes..."
            value={orderNotes}
            onChangeText={setOrderNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Available Coffees */}
        <View className="mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Available Coffees
          </Text>
          {availableCoffees.map((coffee) => (
            <CoffeeSelectionCard key={coffee.id} coffee={coffee} />
          ))}
        </View>

        {/* Place Order Button */}
        {selectedCoffees.length > 0 && (
          <View className="pb-6">
            <TouchableOpacity
              onPress={handlePlaceOrder}
              className="bg-blue-500 py-4 rounded-xl active:bg-blue-600"
            >
              <Text className="text-white font-bold text-lg text-center">
                Place Order - €{calculateTotal().toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PlaceOrderTab;
