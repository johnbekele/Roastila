import { StyleSheet } from "react-native";

// Helper function to create themed styles
export const createThemedStyles = (theme, styles) => {
  return StyleSheet.create(
    Object.keys(styles).reduce((acc, key) => {
      acc[key] =
        typeof styles[key] === "function" ? styles[key](theme) : styles[key];
      return acc;
    }, {})
  );
};

// Common themed components
export const getThemedStyles = (theme) => ({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  containerSecondary: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },

  // Card styles
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardElevated: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  // Text styles
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
  },
  textTertiary: {
    color: theme.colors.textTertiary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.normal,
  },
  textInverse: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.normal,
  },
  heading: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  subheading: {
    color: theme.colors.text,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Button styles
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.textInverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  buttonTextOutline: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },

  // Input styles
  input: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },
  inputFocused: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.borderFocus,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text,
  },

  // Status styles
  success: {
    backgroundColor: theme.colors.successLight,
    borderColor: theme.colors.success,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  warning: {
    backgroundColor: theme.colors.warningLight,
    borderColor: theme.colors.warning,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  error: {
    backgroundColor: theme.colors.errorLight,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },
  info: {
    backgroundColor: theme.colors.infoLight,
    borderColor: theme.colors.info,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },

  // Shadow
  shadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shadowLarge: {
    shadowColor: theme.colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
});

// Tailwind-like class name generator for theme
export const getThemeClasses = (theme) => ({
  // Backgrounds
  "bg-primary": { backgroundColor: theme.colors.primary },
  "bg-secondary": { backgroundColor: theme.colors.secondary },
  "bg-background": { backgroundColor: theme.colors.background },
  "bg-surface": { backgroundColor: theme.colors.surface },
  "bg-success": { backgroundColor: theme.colors.success },
  "bg-warning": { backgroundColor: theme.colors.warning },
  "bg-error": { backgroundColor: theme.colors.error },
  "bg-info": { backgroundColor: theme.colors.info },

  // Text colors
  "text-primary": { color: theme.colors.primary },
  "text-secondary": { color: theme.colors.secondary },
  "text-default": { color: theme.colors.text },
  "text-muted": { color: theme.colors.textSecondary },
  "text-light": { color: theme.colors.textTertiary },
  "text-inverse": { color: theme.colors.textInverse },
  "text-success": { color: theme.colors.success },
  "text-warning": { color: theme.colors.warning },
  "text-error": { color: theme.colors.error },
  "text-info": { color: theme.colors.info },

  // Borders
  "border-primary": { borderColor: theme.colors.primary },
  "border-secondary": { borderColor: theme.colors.secondary },
  "border-default": { borderColor: theme.colors.border },
  "border-success": { borderColor: theme.colors.success },
  "border-warning": { borderColor: theme.colors.warning },
  "border-error": { borderColor: theme.colors.error },
  "border-info": { borderColor: theme.colors.info },

  // Spacing
  "p-xs": { padding: theme.spacing.xs },
  "p-sm": { padding: theme.spacing.sm },
  "p-md": { padding: theme.spacing.md },
  "p-lg": { padding: theme.spacing.lg },
  "p-xl": { padding: theme.spacing.xl },
  "p-xxl": { padding: theme.spacing.xxl },

  "m-xs": { margin: theme.spacing.xs },
  "m-sm": { margin: theme.spacing.sm },
  "m-md": { margin: theme.spacing.md },
  "m-lg": { margin: theme.spacing.lg },
  "m-xl": { margin: theme.spacing.xl },
  "m-xxl": { margin: theme.spacing.xxl },

  // Border radius
  "rounded-sm": { borderRadius: theme.borderRadius.sm },
  "rounded-md": { borderRadius: theme.borderRadius.md },
  "rounded-lg": { borderRadius: theme.borderRadius.lg },
  "rounded-xl": { borderRadius: theme.borderRadius.xl },
  "rounded-full": { borderRadius: theme.borderRadius.full },

  // Font sizes
  "text-xs": { fontSize: theme.typography.fontSize.xs },
  "text-sm": { fontSize: theme.typography.fontSize.sm },
  "text-base": { fontSize: theme.typography.fontSize.base },
  "text-lg": { fontSize: theme.typography.fontSize.lg },
  "text-xl": { fontSize: theme.typography.fontSize.xl },
  "text-2xl": { fontSize: theme.typography.fontSize["2xl"] },
  "text-3xl": { fontSize: theme.typography.fontSize["3xl"] },
  "text-4xl": { fontSize: theme.typography.fontSize["4xl"] },

  // Font weights
  "font-normal": { fontWeight: theme.typography.fontWeight.normal },
  "font-medium": { fontWeight: theme.typography.fontWeight.medium },
  "font-semibold": { fontWeight: theme.typography.fontWeight.semibold },
  "font-bold": { fontWeight: theme.typography.fontWeight.bold },
});
