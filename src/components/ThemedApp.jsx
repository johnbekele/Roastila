import React from "react";
import { View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ThemedApp = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      {children}
    </View>
  );
};

export default ThemedApp;
