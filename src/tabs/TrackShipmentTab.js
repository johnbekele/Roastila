import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TrackShipmentTab = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock shipment data
  const shipments = [
    {
      id: "SHIP-001",
      orderId: "ROA2024-001",
      coffee: "Ethiopian Yirgacheffe G1",
      quantity: "150kg",
      producer: "Abebe Coffee Farm",
      status: "In Transit",
      progress: 75,
      currentLocation: "Addis Ababa Airport",
      nextLocation: "Warsaw, Poland",
      estimatedDelivery: "Dec 15, 2024",
      trackingNumber: "ET123456789",
      carrier: "Ethiopian Airlines Cargo",
      departureDate: "Dec 8, 2024",
      arrivalDate: "Dec 10, 2024",
      timeline: [
        {
          status: "Order Confirmed",
          date: "Dec 1, 2024",
          time: "10:30 AM",
          location: "Addis Ababa, Ethiopia",
          completed: true,
        },
        {
          status: "Processing",
          date: "Dec 2, 2024",
          time: "2:15 PM",
          location: "Yirgacheffe, Ethiopia",
          completed: true,
        },
        {
          status: "Quality Check",
          date: "Dec 5, 2024",
          time: "9:00 AM",
          location: "Addis Ababa, Ethiopia",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 8, 2024",
          time: "6:30 PM",
          location: "Addis Ababa Airport",
          completed: true,
        },
        {
          status: "Customs Clearance",
          date: "Dec 10, 2024",
          time: "TBD",
          location: "Warsaw, Poland",
          completed: false,
        },
        {
          status: "Out for Delivery",
          date: "Dec 15, 2024",
          time: "TBD",
          location: "Warsaw, Poland",
          completed: false,
        },
      ],
    },
    {
      id: "SHIP-002",
      orderId: "ROA2024-002",
      coffee: "Ethiopian Sidamo Natural",
      quantity: "200kg",
      producer: "Kebede Family Farm",
      status: "Delivered",
      progress: 100,
      currentLocation: "Delivered",
      nextLocation: "N/A",
      estimatedDelivery: "Delivered",
      trackingNumber: "ET987654321",
      carrier: "Ethiopian Airlines Cargo",
      departureDate: "Nov 20, 2024",
      arrivalDate: "Nov 25, 2024",
      deliveryDate: "Nov 28, 2024",
      timeline: [
        {
          status: "Order Confirmed",
          date: "Nov 15, 2024",
          time: "11:00 AM",
          location: "Addis Ababa, Ethiopia",
          completed: true,
        },
        {
          status: "Processing",
          date: "Nov 16, 2024",
          time: "3:30 PM",
          location: "Sidamo, Ethiopia",
          completed: true,
        },
        {
          status: "Quality Check",
          date: "Nov 18, 2024",
          time: "10:15 AM",
          location: "Addis Ababa, Ethiopia",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Nov 20, 2024",
          time: "8:45 PM",
          location: "Addis Ababa Airport",
          completed: true,
        },
        {
          status: "Customs Clearance",
          date: "Nov 22, 2024",
          time: "2:00 PM",
          location: "Warsaw, Poland",
          completed: true,
        },
        {
          status: "Delivered",
          date: "Nov 28, 2024",
          time: "4:30 PM",
          location: "Warsaw, Poland",
          completed: true,
        },
      ],
    },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleShipmentPress = (shipment) => {
    Alert.alert(
      `Shipment ${shipment.trackingNumber}`,
      `Order: ${shipment.orderId}\nCoffee: ${shipment.coffee}\nQuantity: ${shipment.quantity}\nStatus: ${shipment.status}`,
      [
        { text: "Close", style: "cancel" },
        { text: "View Details", onPress: () => console.log("View details") },
        {
          text: "Contact Carrier",
          onPress: () => console.log("Contact carrier"),
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "In Transit":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      case "Customs Clearance":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return "✅";
      case "In Transit":
        return "🚚";
      case "Processing":
        return "⚙️";
      case "Customs Clearance":
        return "📋";
      default:
        return "📦";
    }
  };

  const ShipmentCard = ({ shipment }) => (
    <TouchableOpacity
      onPress={() => handleShipmentPress(shipment)}
      className="bg-white rounded-xl shadow-sm mb-4 p-4 active:bg-gray-50"
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {shipment.orderId}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {shipment.coffee} • {shipment.quantity}
          </Text>
          <Text className="text-xs text-gray-500">
            Producer: {shipment.producer}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${getStatusColor(shipment.status)}`}
        >
          <Text className="text-white text-xs font-semibold">
            {getStatusIcon(shipment.status)} {shipment.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-3">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-sm text-gray-600">Progress</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {shipment.progress}%
          </Text>
        </View>
        <View className="bg-gray-200 rounded-full h-2">
          <View
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${shipment.progress}%` }}
          />
        </View>
      </View>

      {/* Current Location */}
      <View className="flex-row items-center mb-3">
        <Text className="text-amber-500 text-lg mr-2">📍</Text>
        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-800">
            {shipment.currentLocation}
          </Text>
          {shipment.nextLocation && shipment.nextLocation !== "N/A" && (
            <Text className="text-xs text-gray-500">
              Next: {shipment.nextLocation}
            </Text>
          )}
        </View>
      </View>

      {/* Timeline Preview */}
      <View className="border-t border-gray-100 pt-3">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          Recent Updates
        </Text>
        {shipment.timeline.slice(-2).map((event, index) => (
          <View key={index} className="flex-row items-center mb-1">
            <Text
              className={`text-xs mr-2 ${event.completed ? "text-green-500" : "text-gray-400"}`}
            >
              {event.completed ? "✓" : "○"}
            </Text>
            <Text className="text-xs text-gray-600 flex-1">
              {event.status} - {event.date}
            </Text>
          </View>
        ))}
      </View>

      {/* Tracking Info */}
      <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <View>
          <Text className="text-xs text-gray-500">Tracking Number</Text>
          <Text className="text-sm font-mono text-gray-800">
            {shipment.trackingNumber}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">Est. Delivery</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {shipment.estimatedDelivery}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800 mb-1">
          Track Shipments
        </Text>
        <Text className="text-gray-600">
          Monitor your coffee orders in real-time
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 pt-4">
        <View className="bg-white rounded-xl shadow-sm p-4">
          <View className="flex-row items-center bg-gray-50 rounded-lg px-4 py-3">
            <Text className="text-gray-400 text-lg mr-3">🔍</Text>
            <Text className="flex-1 text-gray-800 text-base">
              Search by order ID or tracking number...
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Options */}
      <View className="px-4 pt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {["All", "In Transit", "Delivered", "Processing", "Customs"].map(
              (filter) => (
                <TouchableOpacity
                  key={filter}
                  className="bg-white px-4 py-2 rounded-full shadow-sm active:bg-purple-100"
                >
                  <Text className="text-sm font-medium text-gray-700">
                    {filter}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </ScrollView>
      </View>

      {/* Shipments List */}
      <ScrollView
        className="flex-1 px-4 pt-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#8B5CF6"]}
            tintColor="#8B5CF6"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-sm text-gray-600">
            {shipments.length} active shipments
          </Text>
        </View>

        {shipments.map((shipment) => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}

        {/* Add New Tracking */}
        <View className="py-6">
          <TouchableOpacity
            className="bg-white border border-purple-500 py-3 rounded-lg"
            onPress={() => console.log("Add tracking")}
          >
            <Text className="text-purple-600 font-semibold text-center">
              + Add New Tracking Number
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackShipmentTab;
