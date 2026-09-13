import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 32,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: theme.borders.width.thin,
    borderBottomColor: theme.colors.border.light,
    gap: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.primary.default,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  disabledInput: {
    color: "#999",
    backgroundColor: "#F5F5F5",
  },
  cpfRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
    paddingHorizontal: 4,
  },
  cpfLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: "600",
  },
  cpfHint: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  changePasswordButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginTop: theme.spacing.sm,
  },
  changePasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary.default,
  },
  // Separado do restante por uma linha: é a única ação destrutiva da tela
  // e não deve ser tocada por engano ao procurar "alterar senha".
  deleteAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginTop: theme.spacing.sm,
    borderTopWidth: theme.borders.width.thin,
    borderTopColor: theme.colors.border.light,
  },
  deleteAccountText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.state.error,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#424242",
  },
});
