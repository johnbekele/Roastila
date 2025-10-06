import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ThemeSwitcher = ({ visible, onClose }) => {
  const { theme, themeMode, changeTheme, isDark, isLight, isSystem } =
    useTheme();

  const themeOptions = [
    {
      key: "light",
      name: "Light",
      description: "Clean and bright interface",
      icon: "☀️",
    },
    {
      key: "dark",
      name: "Dark",
      description: "Easy on the eyes",
      icon: "🌙",
    },
    {
      key: "system",
      name: "System",
      description: "Follow device setting",
      icon: "📱",
    },
  ];

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.borderRadius.xl,
            borderTopRightRadius: theme.borderRadius.xl,
            padding: theme.spacing.lg,
            maxHeight: "50%",
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.xl,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.text,
              }}
            >
              Choose Theme
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.full,
                backgroundColor: theme.colors.backgroundSecondary,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  color: theme.colors.textSecondary,
                }}
              >
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          {/* Theme Options */}
          <View style={{ gap: theme.spacing.sm }}>
            {themeOptions.map((option) => {
              const isSelected = themeMode === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => handleThemeChange(option.key)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: theme.spacing.md,
                    borderRadius: theme.borderRadius.lg,
                    backgroundColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.backgroundSecondary,
                    borderWidth: isSelected ? 2 : 1,
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xl,
                      marginRight: theme.spacing.md,
                    }}
                  >
                    {option.icon}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        fontWeight: theme.typography.fontWeight.semibold,
                        color: isSelected
                          ? theme.colors.textInverse
                          : theme.colors.text,
                        marginBottom: theme.spacing.xs,
                      }}
                    >
                      {option.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.sm,
                        color: isSelected
                          ? theme.colors.textInverse
                          : theme.colors.textSecondary,
                      }}
                    >
                      {option.description}
                    </Text>
                  </View>
                  {isSelected && (
                    <Text
                      style={{
                        fontSize: theme.typography.fontSize.lg,
                        color: theme.colors.textInverse,
                      }}
                    >
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Current Theme Info */}
          <View
            style={{
              marginTop: theme.spacing.lg,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.backgroundSecondary,
              borderRadius: theme.borderRadius.lg,
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.textSecondary,
                textAlign: "center",
              }}
            >
              Current: {isSystem ? "System" : isDark ? "Dark" : "Light"} Mode
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ThemeSwitcher;
