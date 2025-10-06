import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "@roastila_theme";

// Theme configurations
const themes = {
  light: {
    name: "Light",
    colors: {
      // Primary colors
      primary: "#3b82f6", // Blue
      primaryDark: "#2563eb",
      primaryLight: "#60a5fa",

      // Secondary colors
      secondary: "#f59e0b", // Amber
      secondaryDark: "#d97706",
      secondaryLight: "#fbbf24",

      // Background colors
      background: "#ffffff",
      backgroundSecondary: "#f8fafc",
      backgroundTertiary: "#f1f5f9",

      // Surface colors
      surface: "#ffffff",
      surfaceSecondary: "#f8fafc",
      surfaceElevated: "#ffffff",

      // Text colors
      text: "#1f2937",
      textSecondary: "#6b7280",
      textTertiary: "#9ca3af",
      textInverse: "#ffffff",

      // Border colors
      border: "#e5e7eb",
      borderSecondary: "#d1d5db",
      borderFocus: "#3b82f6",

      // Status colors
      success: "#10b981",
      successLight: "#d1fae5",
      warning: "#f59e0b",
      warningLight: "#fef3c7",
      error: "#ef4444",
      errorLight: "#fee2e2",
      info: "#3b82f6",
      infoLight: "#dbeafe",

      // Coffee theme colors
      coffee: "#8b4513",
      coffeeLight: "#d2b48c",
      coffeeDark: "#654321",

      // Shadow
      shadow: "rgba(0, 0, 0, 0.1)",
      shadowDark: "rgba(0, 0, 0, 0.25)",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    typography: {
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 30,
        "4xl": 36,
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  dark: {
    name: "Dark",
    colors: {
      // Primary colors
      primary: "#60a5fa", // Lighter blue for dark mode
      primaryDark: "#3b82f6",
      primaryLight: "#93c5fd",

      // Secondary colors
      secondary: "#fbbf24", // Lighter amber for dark mode
      secondaryDark: "#f59e0b",
      secondaryLight: "#fcd34d",

      // Background colors
      background: "#0f172a", // Very dark blue
      backgroundSecondary: "#1e293b",
      backgroundTertiary: "#334155",

      // Surface colors
      surface: "#1e293b",
      surfaceSecondary: "#334155",
      surfaceElevated: "#475569",

      // Text colors
      text: "#f8fafc",
      textSecondary: "#cbd5e1",
      textTertiary: "#94a3b8",
      textInverse: "#0f172a",

      // Border colors
      border: "#475569",
      borderSecondary: "#64748b",
      borderFocus: "#60a5fa",

      // Status colors
      success: "#34d399",
      successLight: "#064e3b",
      warning: "#fbbf24",
      warningLight: "#451a03",
      error: "#f87171",
      errorLight: "#7f1d1d",
      info: "#60a5fa",
      infoLight: "#1e3a8a",

      // Coffee theme colors
      coffee: "#d2b48c",
      coffeeLight: "#f4e4bc",
      coffeeDark: "#8b4513",

      // Shadow
      shadow: "rgba(0, 0, 0, 0.3)",
      shadowDark: "rgba(0, 0, 0, 0.5)",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    },
    typography: {
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 30,
        "4xl": 36,
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
};

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && themes[savedTheme]) {
        setThemeMode(savedTheme);
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (mode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const changeTheme = (mode) => {
    console.log("🎨 Changing theme to:", mode);
    setThemeMode(mode);
    saveThemePreference(mode);
  };

  // Get current theme based on mode
  const getCurrentTheme = () => {
    if (themeMode === "system") {
      const systemTheme =
        systemColorScheme === "dark" ? themes.dark : themes.light;
      console.log(
        "🎨 System theme detected:",
        systemColorScheme,
        "->",
        systemTheme.name
      );
      return systemTheme;
    }
    const selectedTheme = themes[themeMode] || themes.light;
    console.log("🎨 Selected theme:", themeMode, "->", selectedTheme.name);
    return selectedTheme;
  };

  const currentTheme = getCurrentTheme();

  const value = {
    theme: currentTheme,
    themeMode,
    changeTheme,
    isLoading,
    isDark: currentTheme === themes.dark,
    isLight: currentTheme === themes.light,
    isSystem: themeMode === "system",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { themes };
