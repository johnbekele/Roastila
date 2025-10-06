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
import { useTheme } from "../context/ThemeContext";

const PlaceOrderTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCoffees, setSelectedCoffees] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");
  const { theme } = useTheme();

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
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: theme.spacing.sm,
        padding: theme.spacing.md,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: theme.spacing.sm,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.xs,
            }}
          >
            {coffee.name}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
              marginBottom: theme.spacing.xs,
            }}
          >
            {coffee.origin} • {coffee.producer}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textTertiary,
            }}
          >
            Available: {coffee.quantity}kg • Min: {coffee.minOrder}kg
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.secondary,
            }}
          >
            {coffee.price}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.textTertiary,
            }}
          >
            {coffee.unit}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: theme.spacing.sm,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() =>
              handleUpdateQuantity(
                coffee.id,
                (selectedCoffees.find((item) => item.id === coffee.id)
                  ?.quantity || 0) - 1
              )
            }
            style={{
              backgroundColor: theme.colors.backgroundSecondary,
              width: 32,
              height: 32,
              borderRadius: theme.borderRadius.full,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              marginHorizontal: theme.spacing.md,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
            }}
          >
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
            style={{
              backgroundColor: theme.colors.secondary,
              width: 32,
              height: 32,
              borderRadius: theme.borderRadius.full,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontWeight: theme.typography.fontWeight.bold,
              }}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleAddToOrder(coffee)}
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            borderRadius: theme.borderRadius.lg,
          }}
        >
          <Text
            style={{
              color: theme.colors.textInverse,
              fontWeight: theme.typography.fontWeight.semibold,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            Add to Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const OrderSummaryCard = () => {
    if (selectedCoffees.length === 0) {
      return (
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            padding: theme.spacing.md,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              marginBottom: theme.spacing.sm,
            }}
          >
            📦
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}
          >
            No items in order
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              textAlign: "center",
            }}
          >
            Add coffees from the list below to create your order
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.xl,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.sm,
          }}
        >
          Order Summary
        </Text>
        {selectedCoffees.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: theme.spacing.sm,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.text,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                {item.quantity}kg × {item.price}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                  marginRight: theme.spacing.sm,
                }}
              >
                €
                {(
                  parseFloat(item.price.replace("€", "")) * item.quantity
                ).toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveFromOrder(item.id)}
                style={{
                  backgroundColor: theme.colors.errorLight,
                  padding: theme.spacing.xs,
                  borderRadius: theme.borderRadius.full,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.error,
                    fontSize: theme.typography.fontSize.xs,
                  }}
                >
                  ✕
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.secondary,
            }}
          >
            €{calculateTotal().toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.colors.surface,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.md,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize.xl,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
          }}
        >
          Place Order
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
          }}
        >
          Create a new coffee order inquiry
        </Text>
      </View>

      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary */}
        <OrderSummaryCard />

        {/* Order Notes */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            padding: theme.spacing.md,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}
          >
            Order Notes
          </Text>
          <TextInput
            style={{
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: theme.borderRadius.lg,
              padding: theme.spacing.sm,
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.sm,
            }}
            placeholder="Add any special requirements or notes..."
            placeholderTextColor={theme.colors.textTertiary}
            value={orderNotes}
            onChangeText={setOrderNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Available Coffees */}
        <View style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}
          >
            Available Coffees
          </Text>
          {availableCoffees.map((coffee) => (
            <CoffeeSelectionCard key={coffee.id} coffee={coffee} />
          ))}
        </View>

        {/* Place Order Button */}
        {selectedCoffees.length > 0 && (
          <View style={{ paddingBottom: theme.spacing.md }}>
            <TouchableOpacity
              onPress={handlePlaceOrder}
              style={{
                backgroundColor: theme.colors.primary,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.xl,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontWeight: theme.typography.fontWeight.bold,
                  fontSize: theme.typography.fontSize.lg,
                  textAlign: "center",
                }}
              >
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
