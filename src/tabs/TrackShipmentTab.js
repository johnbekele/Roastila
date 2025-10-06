import React, { useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const TrackShipmentTab = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();

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
        return theme.colors.success;
      case "In Transit":
        return theme.colors.primary;
      case "Processing":
        return theme.colors.warning;
      case "Customs Clearance":
        return theme.colors.info;
      default:
        return theme.colors.textSecondary;
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
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
      }}
    >
      {/* Header */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: theme.spacing.sm,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
          }}>
            {shipment.orderId}
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.xs,
          }}>
            {shipment.coffee} • {shipment.quantity}
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textTertiary,
          }}>
            Producer: {shipment.producer}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius.full,
            backgroundColor: getStatusColor(shipment.status),
          }}
        >
          <Text style={{
            color: theme.colors.textInverse,
            fontSize: theme.typography.fontSize.xs,
            fontWeight: theme.typography.fontWeight.semibold,
          }}>
            {getStatusIcon(shipment.status)} {shipment.status}
          </Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={{ marginBottom: theme.spacing.sm }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.xs,
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
          }}>Progress</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text,
          }}>
            {shipment.progress}%
          </Text>
        </View>
        <View style={{
          backgroundColor: theme.colors.backgroundSecondary,
          borderRadius: theme.borderRadius.full,
          height: 8,
        }}>
          <View
            style={{
              backgroundColor: theme.colors.primary,
              height: 8,
              borderRadius: theme.borderRadius.full,
              width: `${shipment.progress}%`,
            }}
          />
        </View>
      </View>

      {/* Current Location */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.sm,
      }}>
        <Text style={{
          color: theme.colors.secondary,
          fontSize: theme.typography.fontSize.lg,
          marginRight: theme.spacing.sm,
        }}>📍</Text>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text,
          }}>
            {shipment.currentLocation}
          </Text>
          {shipment.nextLocation && shipment.nextLocation !== "N/A" && (
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.textTertiary,
            }}>
              Next: {shipment.nextLocation}
            </Text>
          )}
        </View>
      </View>

      {/* Timeline Preview */}
      <View style={{
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: theme.spacing.sm,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text,
          marginBottom: theme.spacing.sm,
        }}>
          Recent Updates
        </Text>
        {shipment.timeline.slice(-2).map((event, index) => (
          <View key={index} style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: theme.spacing.xs,
          }}>
            <Text
              style={{
                fontSize: theme.typography.fontSize.xs,
                marginRight: theme.spacing.sm,
                color: event.completed ? theme.colors.success : theme.colors.textTertiary,
              }}
            >
              {event.completed ? "✓" : "○"}
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.textSecondary,
              flex: 1,
            }}>
              {event.status} - {event.date}
            </Text>
          </View>
        ))}
      </View>

      {/* Tracking Info */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      }}>
        <View>
          <Text style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textTertiary,
          }}>Tracking Number</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontFamily: "monospace",
            color: theme.colors.text,
          }}>
            {shipment.trackingNumber}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.textTertiary,
          }}>Est. Delivery</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text,
          }}>
            {shipment.estimatedDelivery}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.backgroundSecondary }}>
      {/* Header */}
      <View style={{
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.xs,
        }}>
          Track Shipments
        </Text>
        <Text style={{
          color: theme.colors.textSecondary,
        }}>
          Monitor your coffee orders in real-time
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
      }}>
        <View style={{
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.xl,
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          padding: theme.spacing.md,
        }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.backgroundSecondary,
            borderRadius: theme.borderRadius.lg,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
          }}>
            <Text style={{
              color: theme.colors.textTertiary,
              fontSize: theme.typography.fontSize.lg,
              marginRight: theme.spacing.sm,
            }}>🔍</Text>
            <Text style={{
              flex: 1,
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.base,
            }}>
              Search by order ID or tracking number...
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Options */}
      <View style={{
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
            {["All", "In Transit", "Delivered", "Processing", "Customs"].map(
              (filter) => (
                <TouchableOpacity
                  key={filter}
                  style={{
                    backgroundColor: theme.colors.surface,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    borderRadius: theme.borderRadius.full,
                    shadowColor: theme.colors.shadow,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                >
                  <Text style={{
                    fontSize: theme.typography.fontSize.sm,
                    fontWeight: theme.typography.fontWeight.medium,
                    color: theme.colors.text,
                  }}>
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
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.info]}
            tintColor={theme.colors.info}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.md,
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.textSecondary,
          }}>
            {shipments.length} active shipments
          </Text>
        </View>

        {shipments.map((shipment) => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}

        {/* Add New Tracking */}
        <View style={{ paddingVertical: theme.spacing.md }}>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.surface,
              borderWidth: 1,
              borderColor: theme.colors.info,
              paddingVertical: theme.spacing.sm,
              borderRadius: theme.borderRadius.lg,
            }}
            onPress={() => console.log("Add tracking")}
          >
            <Text style={{
              color: theme.colors.info,
              fontWeight: theme.typography.fontWeight.semibold,
              textAlign: "center",
            }}>
              + Add New Tracking Number
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrackShipmentTab;
