import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  card: {
    borderRadius: theme.components.container.default.borderRadius,
    padding: theme.components.container.default.padding,
    backgroundColor: theme.components.container.default.backgroundColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  
  description: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
    textAlign: "center",
    lineHeight: 20,
  },
  
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  
  buttonContainer: {
    marginTop: theme.spacing.md,
  },

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
