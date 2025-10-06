import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const { width: screenWidth } = Dimensions.get("window");

const ProducerDetailScreen = ({ route, navigation }) => {
  const { producer } = route.params;
  const { theme } = useTheme();

  const handleContact = () => {
    // Handle contact action
    console.log("Contact producer:", producer.name);
  };

  const handleViewCoffees = () => {
    // Handle view coffees action
    console.log("View producer coffees:", producer.name);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      edges={["top"]}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            marginRight: theme.spacing.sm,
            padding: theme.spacing.xs,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.fontSize.xl,
              color: theme.colors.text,
            }}
          >
            ←
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text,
            flex: 1,
          }}
        >
          Producer Details
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: producer.image }}
            style={{
              width: "100%",
              height: 250,
            }}
            resizeMode="cover"
          />
          {/* Verified Badge */}
          {producer.verified && (
            <View
              style={{
                position: "absolute",
                top: theme.spacing.md,
                right: theme.spacing.md,
                backgroundColor: theme.colors.success,
                paddingHorizontal: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.borderRadius.full,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                }}
              >
                ✓ Verified Producer
              </Text>
            </View>
          )}
        </View>

        {/* Producer Info */}
        <View style={{ padding: theme.spacing.md }}>
          {/* Name and Rating */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: theme.spacing.md,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xl,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text,
                  marginBottom: theme.spacing.xs,
                }}
              >
                {producer.name}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.textSecondary,
                }}
              >
                🌍 {producer.location}
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                backgroundColor: theme.colors.surface,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
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
                  color: theme.colors.secondary,
                }}
              >
                {producer.rating}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                ⭐ Rating
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.textTertiary,
                }}
              >
                {producer.reviews} reviews
              </Text>
            </View>
          </View>

          {/* Description */}
          <View
            style={{
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
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
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              About This Producer
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text,
                lineHeight: 20,
              }}
            >
              {producer.description}
            </Text>
          </View>

          {/* Coffee Quality Information */}
          <View
            style={{
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
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
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.md,
              }}
            >
              Coffee Quality & Information
            </Text>

            {/* Quality Metrics */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: theme.spacing.md,
              }}
            >
              <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Average Quality Score
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.success,
                  }}
                >
                  {producer.avgRating}/5.0
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Total Coffee Varieties
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.primary,
                  }}
                >
                  {producer.totalCoffees}
                </Text>
              </View>
            </View>

            {/* Specialties */}
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Coffee Specialties
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {producer.specialties.map((specialty, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.colors.successLight,
                      paddingHorizontal: theme.spacing.sm,
                      paddingVertical: theme.spacing.sm,
                      borderRadius: theme.borderRadius.full,
                      marginRight: theme.spacing.sm,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.success,
                        fontWeight: theme.typography.fontWeight.medium,
                      }}
                    >
                      {specialty}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Certifications */}
            <View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                  marginBottom: theme.spacing.sm,
                }}
              >
                Certifications & Standards
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {producer.certifications.map((cert, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.colors.infoLight,
                      paddingHorizontal: theme.spacing.sm,
                      paddingVertical: theme.spacing.sm,
                      borderRadius: theme.borderRadius.full,
                      marginRight: theme.spacing.sm,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: theme.colors.info,
                        fontWeight: theme.typography.fontWeight.medium,
                      }}
                    >
                      {cert}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Producer Statistics */}
          <View
            style={{
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.md,
              borderRadius: theme.borderRadius.lg,
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
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.text,
                marginBottom: theme.spacing.md,
              }}
            >
              Producer Statistics
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                Established
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                }}
              >
                {producer.established}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                Years in Business
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                }}
              >
                {new Date().getFullYear() - parseInt(producer.established)}{" "}
                years
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: theme.spacing.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                Total Reviews
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                }}
              >
                {producer.reviews}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                Coffee Varieties
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text,
                }}
              >
                {producer.totalCoffees} types
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: theme.spacing.xl,
            }}
          >
            <TouchableOpacity
              onPress={handleContact}
              style={{
                backgroundColor: theme.colors.success,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                flex: 1,
                marginRight: theme.spacing.sm,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  textAlign: "center",
                }}
              >
                📞 Contact Producer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleViewCoffees}
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: theme.spacing.lg,
                paddingVertical: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                flex: 1,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: theme.colors.textInverse,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  textAlign: "center",
                }}
              >
                ☕ View Coffees
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProducerDetailScreen;
