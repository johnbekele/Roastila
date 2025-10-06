// src/screens/SettingsScreen.js
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { useTheme } from "../context/ThemeContext";

export default function SettingsScreen() {
  const { theme, isDark } = useTheme();
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  const settingsItems = [
    {
      title: "Order Management",
      icon: "📋",
      description:
        "Manage your coffee orders, track shipments, and view order history",
      onPress: () => console.log("Order Management pressed"),
    },
    {
      title: "Producer Network",
      icon: "🌍",
      description:
        "Connect with verified Ethiopian coffee producers and cooperatives",
      onPress: () => console.log("Producer Network pressed"),
    },
    {
      title: "Quality Reports",
      icon: "📈",
      description:
        "Access detailed quality assessments and certification reports",
      onPress: () => console.log("Quality Reports pressed"),
    },
    {
      title: "Logistics & Shipping",
      icon: "🚚",
      description:
        "Track shipments, manage logistics, and coordinate delivery schedules",
      onPress: () => console.log("Logistics & Shipping pressed"),
    },
    {
      title: "Payment & Finance",
      icon: "💳",
      description: "Manage payments, invoices, and financial transactions",
      onPress: () => console.log("Payment & Finance pressed"),
    },
    {
      title: "Compliance & Docs",
      icon: "📄",
      description:
        "Access compliance documents, certifications, and legal requirements",
      onPress: () => console.log("Compliance & Docs pressed"),
    },
    {
      title: "Theme Settings",
      icon: isDark ? "🌙" : "☀️",
      description: "Customize your app appearance with light or dark themes",
      onPress: () => setShowThemeSwitcher(true),
    },
    {
      title: "Notifications",
      icon: "🔔",
      description:
        "Configure notification preferences for orders, updates, and alerts",
      onPress: () => console.log("Notifications pressed"),
    },
    {
      title: "Account Security",
      icon: "🔒",
      description:
        "Manage password, two-factor authentication, and security settings",
      onPress: () => console.log("Account Security pressed"),
    },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: theme.colors.secondary,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.xxl,
          paddingBottom: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize["3xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textInverse,
            textAlign: "center",
            marginBottom: theme.spacing.sm,
          }}
        >
          Settings
        </Text>
        <Text
          style={{
            color: theme.colors.textInverse,
            fontSize: theme.typography.fontSize.base,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Manage your account and preferences
        </Text>
      </View>

      {/* Settings Content */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        }}
      >
        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
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
            onPress={item.onPress}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize["2xl"],
                  marginRight: theme.spacing.sm,
                  marginTop: theme.spacing.xs,
                }}
              >
                {item.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.fontSize.sm,
                    lineHeight: 18,
                    marginBottom: theme.spacing.sm,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <Text
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: theme.typography.fontSize.lg,
                  marginTop: theme.spacing.xs,
                }}
              >
                ›
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View
          style={{
            alignItems: "center",
            paddingBottom: theme.spacing.lg,
            marginTop: theme.spacing.md,
          }}
        >
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            Roastila B2B Platform
          </Text>
          <Text
            style={{
              color: theme.colors.textTertiary,
              fontSize: theme.typography.fontSize.xs,
              marginTop: theme.spacing.xs,
            }}
          >
            Ethiopia ↔ Poland Coffee Trade
          </Text>
        </View>
      </View>

      {/* Theme Switcher Modal */}
      <ThemeSwitcher
        visible={showThemeSwitcher}
        onClose={() => setShowThemeSwitcher(false)}
      />
    </ScrollView>
  );
}
