import { StyleSheet } from "react-native";
import { theme } from "@/src/config";
import { sharedStyles } from "../shared-styles";

export const styles = StyleSheet.create({
  ...sharedStyles,

  passwordRequirements: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },

  requirementText: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxs,
  },

  requirementMet: {
    color: theme.colors.state.success,
  },

  requirementNotMet: {
    color: theme.colors.state.error,
  },
});
