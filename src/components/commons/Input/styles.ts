import { StyleSheet } from "react-native";
import { useTheme } from "@/src/hooks/theme";

export const useInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing.md,
    },
    label: {
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.text.primary,
      fontSize: theme.typography.sizes.md,
      marginBottom: theme.spacing.sm,
    },
    input: {
      borderWidth: theme.borders.width.thick,
      borderColor: theme.colors.border.light,
      borderRadius: theme.borders.radius.lg,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      fontSize: theme.typography.sizes.md,
      backgroundColor: theme.colors.background.default,
    },
  });
};
