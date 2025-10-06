// src/screens/HomeScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { theme } = useTheme();

  const quickActions = [
    {
      title: "Browse Coffee",
      subtitle: "Explore Ethiopian varieties",
      icon: "☕",
      color: "bg-amber-500",
      action: "side", // Side navigation
      screen: "SideNavigator",
      params: { screen: "BrowseCoffee" },
    },
    {
      title: "Find Producers",
      subtitle: "Connect with farmers",
      icon: "🌍",
      color: "bg-green-500",
      action: "side", // Side navigation
      screen: "SideNavigator",
      params: { screen: "FindProducers" },
    },
    {
      title: "Place Order",
      subtitle: "Start new trade",
      icon: "📦",
      color: "bg-blue-500",
      action: "bottom", // Bottom navigation
      screen: "BottomNavigator",
      params: { screen: "PlaceOrder" },
    },
    {
      title: "Track Shipment",
      subtitle: "Monitor logistics",
      icon: "🚚",
      color: "bg-purple-500",
      action: "bottom", // Bottom navigation
      screen: "BottomNavigator",
      params: { screen: "TrackShipment" },
    },
  ];

  const userName =
    user?.first_name || user?.username || user?.email || "Partner";

  const marketStats = [
    { label: "Ethiopian Export", value: "€2.1M", change: "+12%", icon: "📈" },
    { label: "Polish Import", value: "€1.8M", change: "+8%", icon: "📊" },
    { label: "Active Orders", value: "47", change: "+5%", icon: "📦" },
    { label: "Verified Producers", value: "156", change: "+3%", icon: "✅" },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: "📦",
      text: "Order #ROA2024-001 confirmed",
      time: "2 hours ago",
      status: "Processing",
    },
    {
      id: 2,
      title: "Quality Report Ready",
      subtitle: "Sidamo AA - 2024 Harvest",
      time: "1 day ago",
      icon: "📊",
      status: "Completed",
    },
    {
      id: 3,
      title: "Payment Received",
      subtitle: "€12,450 - Bank Transfer",
      time: "2 days ago",
      icon: "💳",
      status: "Confirmed",
    },
    {
      id: 4,
      title: "Producer Verified",
      subtitle: "Kochere Cooperative",
      time: "3 days ago",
      icon: "✅",
      status: "Verified",
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundSecondary,
      }}
    >
      <View
        style={{
          padding: theme.spacing.md,
        }}
      >
        {/* Welcome Section */}
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.md,
            marginBottom: theme.spacing.md,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.sm,
            }}
          >
            Welcome, {userName}! 👋
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
            }}
          >
            Your B2B coffee trading dashboard.
          </Text>
        </View>

        {/* Market Overview */}
        <View style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Market Overview
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {marketStats.map((stat, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.xl,
                  padding: theme.spacing.md,
                  marginBottom: theme.spacing.sm,
                  width: "48%",
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
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {stat.icon}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {stat.label}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: stat.change.startsWith("+")
                      ? theme.colors.success
                      : theme.colors.error,
                  }}
                >
                  {stat.change}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Quick Actions
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: theme.spacing.sm,
            }}
          >
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    action.color === "bg-amber-500"
                      ? theme.colors.secondary
                      : action.color === "bg-green-500"
                        ? theme.colors.success
                        : action.color === "bg-blue-500"
                          ? theme.colors.primary
                          : action.color === "bg-purple-500"
                            ? theme.colors.info
                            : theme.colors.primary,
                  borderRadius: theme.borderRadius.xl,
                  padding: theme.spacing.md,
                  flex: 1,
                  minWidth: 150,
                }}
                onPress={() =>
                  navigation.navigate(action.screen, action.params)
                }
              >
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize["2xl"],
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {action.icon}
                </Text>
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.base,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {action.title}
                </Text>
                <Text
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: theme.typography.fontSize.sm,
                    opacity: 0.8,
                  }}
                >
                  {action.subtitle}
                </Text>
                <View style={{ marginTop: theme.spacing.sm }}>
                  <Text
                    style={{
                      color: theme.colors.textInverse,
                      fontSize: theme.typography.fontSize.xs,
                      opacity: 0.6,
                    }}
                  >
                    {action.action === "side"
                      ? "→ Slide from side"
                      : "↑ Slide from bottom"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={{ marginBottom: theme.spacing.md }}>
          <Text
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Recent Activity
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            {recentActivity.map((activity, index) => (
              <View
                key={activity.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: index < recentActivity.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    marginRight: theme.spacing.sm,
                  }}
                >
                  {activity.icon}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: theme.colors.text,
                      fontWeight: theme.typography.fontWeight.medium,
                    }}
                  >
                    {activity.text || activity.title}
                  </Text>
                  {activity.subtitle && (
                    <Text
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: theme.typography.fontSize.sm,
                      }}
                    >
                      {activity.subtitle}
                    </Text>
                  )}
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.fontSize.sm,
                    }}
                  >
                    {activity.time}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      paddingHorizontal: theme.spacing.sm,
                      paddingVertical: theme.spacing.xs,
                      borderRadius: theme.borderRadius.full,
                      backgroundColor:
                        activity.status === "Completed"
                          ? theme.colors.successLight
                          : activity.status === "Processing"
                            ? theme.colors.warningLight
                            : activity.status === "Confirmed"
                              ? theme.colors.infoLight
                              : theme.colors.backgroundSecondary,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        fontWeight: theme.typography.fontWeight.medium,
                        color:
                          activity.status === "Completed"
                            ? theme.colors.success
                            : activity.status === "Processing"
                              ? theme.colors.warning
                              : activity.status === "Confirmed"
                                ? theme.colors.info
                                : theme.colors.textSecondary,
                      }}
                    >
                      {activity.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Tips */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Quick Tips
          </Text>
          <View className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
            <Text className="text-amber-800 font-medium mb-2">💡 Pro Tip</Text>
            <Text className="text-amber-700 text-sm">
              Use the quick actions above to navigate to different sections.
              Side actions slide in from the left, while bottom actions slide up
              from below.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
