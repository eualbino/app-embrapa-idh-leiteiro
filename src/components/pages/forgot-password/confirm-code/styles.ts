import { StyleSheet } from "react-native";
import { theme } from "@/src/config";
import { sharedStyles } from "../shared-styles";

export const styles = StyleSheet.create({
  ...sharedStyles,
  
  description: {
    ...sharedStyles.description,
    marginBottom: theme.spacing.xs,
  },

  emailText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary.default,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
  },

  resendContainer: {
    marginTop: theme.spacing.lg,
    alignItems: "center",
  },

  resendText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.regular,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },

  resendLink: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.primary.default,
    textDecorationLine: "underline",
    marginTop: theme.spacing.xs,
  },
});
