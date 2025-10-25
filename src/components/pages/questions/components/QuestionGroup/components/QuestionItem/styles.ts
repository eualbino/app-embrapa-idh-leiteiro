import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  questionText: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
  },
  observationContainer: {
    flex: 1,
    gap: theme.spacing.xs,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.background.muted,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  observationText: {
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  optionsContainer: {
    marginTop: theme.spacing.sm,
  },
});
