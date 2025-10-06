// src/screens/AboutScreen.js
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { theme } = useTheme();

  const aboutItems = [
    {
      title: "Our Mission",
      icon: "🌍",
      description:
        "Empowering Ethiopian coffee producers with direct access to the Polish market, while providing verified, high-quality products to Polish importers and specialty cafés.",
    },
    {
      title: "Company Info",
      icon: "🏢",
      description:
        "Learn more about Roastila and our commitment to sustainable coffee trade.",
    },
    {
      title: "Contact Support",
      icon: "📞",
      description: "Get help with your account, orders, or technical issues.",
    },
    {
      title: "Platform Features",
      icon: "⚡",
      description:
        "Discover the powerful tools and features that make Roastila the leading B2B coffee trading platform.",
    },
    {
      title: "Sustainability",
      icon: "🌱",
      description:
        "Our commitment to sustainable coffee trade practices and environmental responsibility.",
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
          About Roastila
        </Text>
        <Text
          style={{
            color: theme.colors.textInverse,
            fontSize: theme.typography.fontSize.base,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Ethiopia ↔ Poland Coffee Trade Platform
        </Text>
      </View>

      {/* About Content */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
        }}
      >
        {aboutItems.map((item, index) => (
          <View
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
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize["2xl"],
                  marginRight: theme.spacing.sm,
                }}
              >
                {item.icon}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text,
                }}
              >
                {item.title}
              </Text>
            </View>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.fontSize.sm,
                lineHeight: 20,
              }}
            >
              {item.description}
            </Text>
          </View>
        ))}

        {/* Company Details */}
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
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            🏢 Company Information
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              lineHeight: 20,
              marginBottom: theme.spacing.sm,
            }}
          >
            Roastila is a B2B platform connecting Ethiopian coffee producers
            with Polish importers and specialty cafés. We ensure quality,
            traceability, and fair trade practices throughout the supply chain.
          </Text>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.fontSize.sm,
              lineHeight: 20,
            }}
          >
            Our platform facilitates direct trade relationships, quality
            verification, logistics management, and compliance documentation to
            streamline the coffee import process.
          </Text>
        </View>

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
    </ScrollView>
  );
}
