// src/screens/ProfileScreen.js
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";

export default function ProfileScreen() {
  const { logout, user } = useAuth();
  const { theme } = useTheme();

  const businessStats = [
    { label: "Orders Placed", value: "47", icon: "📦" },
    { label: "Partners", value: "12", icon: "🤝" },
    { label: "Coffee Varieties", value: "8", icon: "☕" },
    { label: "Trade Volume", value: "2.4T", icon: "📊" },
  ];

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Header Section */}
      <View
        style={{
          backgroundColor: theme.colors.secondary,
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.xxl,
          paddingBottom: theme.spacing.lg,
        }}
      >
        <View className="items-center">
          {/* Profile Avatar */}
          <View
            style={{
              width: 96,
              height: 96,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.full,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize["4xl"],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.secondary,
              }}
            >
              {user?.first_name?.charAt(0)?.toUpperCase() ||
                user?.username?.charAt(0)?.toUpperCase() ||
                "U"}
            </Text>
          </View>

          {/* User Name & Business Type */}
          <Text
            style={{
              fontSize: theme.typography.fontSize["2xl"],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.textInverse,
              marginBottom: theme.spacing.xs,
            }}
          >
            {user?.first_name || user?.username || "Coffee Professional"}
          </Text>
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: theme.typography.fontSize.base,
              marginBottom: theme.spacing.xs,
              opacity: 0.9,
            }}
          >
            {user?.company_name || "Coffee Importer"}
          </Text>
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: theme.typography.fontSize.sm,
              opacity: 0.8,
            }}
          >
            📍 {user?.company_address || "Poland"}
          </Text>

          {/* Mission Quote */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: theme.borderRadius.full,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              marginTop: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.textInverse,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                textAlign: "center",
              }}
            >
              &quot;Connecting Ethiopia to Poland ☕&quot;
            </Text>
          </View>
        </View>
      </View>

      {/* Business Stats Section */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          marginTop: -theme.spacing.sm,
          marginBottom: theme.spacing.md,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.md,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
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
            Your Trading Dashboard
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {businessStats.map((stat, index) => (
              <View
                key={index}
                style={{
                  alignItems: "center",
                  width: "48%",
                  marginBottom: theme.spacing.md,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.fontSize["3xl"],
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  {stat.icon}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize["2xl"],
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.secondary,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Business Information Card */}
      {(user?.userInfo || user?.email) && (
        <View
          style={{
            paddingHorizontal: theme.spacing.md,
            marginBottom: theme.spacing.md,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.xl,
              padding: theme.spacing.md,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: theme.spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize["2xl"],
                  marginRight: theme.spacing.sm,
                }}
              >
                🏢
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.text,
                }}
              >
                Business Information
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Full Name
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  {user?.first_name || "N/A"} {user?.last_name || ""}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Company
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  {user?.company_name || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Phone
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  {user?.phone_number || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Email
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {user?.email || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Company Address
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                    textAlign: "right",
                    flex: 1,
                    marginLeft: theme.spacing.sm,
                  }}
                >
                  {user?.company_address || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Company Phone
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                  }}
                >
                  {user?.company_phone_number || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Company Email
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {user?.company_email || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Website
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {user?.company_website || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Verification Status
                </Text>
                <View
                  style={{
                    backgroundColor: user?.is_verified
                      ? theme.colors.successLight
                      : theme.colors.warningLight,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.borderRadius.full,
                  }}
                >
                  <Text
                    style={{
                      color: user?.is_verified
                        ? theme.colors.success
                        : theme.colors.warning,
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {user?.is_verified ? "Verified" : "Pending"}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.border,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Last Login
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {user?.last_login
                    ? new Date(user.last_login).toLocaleDateString()
                    : "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Last Device
                </Text>
                <Text
                  style={{
                    color: theme.colors.text,
                    fontWeight: theme.typography.fontWeight.semibold,
                    fontSize: theme.typography.fontSize.sm,
                  }}
                >
                  {user?.last_device || "N/A"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: theme.spacing.sm,
                  borderTopWidth: 1,
                  borderTopColor: theme.colors.border,
                  marginTop: theme.spacing.sm,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontWeight: theme.typography.fontWeight.medium,
                  }}
                >
                  Account Status
                </Text>
                <View
                  style={{
                    backgroundColor: user?.is_active
                      ? theme.colors.successLight
                      : theme.colors.errorLight,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.borderRadius.full,
                  }}
                >
                  <Text
                    style={{
                      color: user?.is_active
                        ? theme.colors.success
                        : theme.colors.error,
                      fontSize: theme.typography.fontSize.xs,
                      fontWeight: theme.typography.fontWeight.semibold,
                    }}
                  >
                    {user?.is_active ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Logout Button */}
      <View
        style={{
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.lg,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.error,
            borderRadius: theme.borderRadius.xl,
            padding: theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={logout}
        >
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              marginRight: theme.spacing.sm,
            }}
          >
            🚪
          </Text>
          <Text
            style={{
              color: theme.colors.textInverse,
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View
        style={{
          alignItems: "center",
          paddingBottom: theme.spacing.lg,
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
    </ScrollView>
  );
}
