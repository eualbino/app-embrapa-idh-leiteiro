import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

/**
 * Estilos compartilhados entre as páginas de recuperação de senha
 * (send-email, confirm-code, reset-password)
 */
export const sharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  card: {
    width: "100%",
    maxWidth: 500,
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
});
