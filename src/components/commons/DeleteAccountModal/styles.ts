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
  },
  title: {
    flex: 1,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.state.error,
  },
  closeButton: {
    padding: 4,
  },
  body: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  // Bloco de aviso: a ação é destrutiva e precisa ler como tal antes
  // de o usuário chegar no campo de senha.
  warningBox: {
    backgroundColor: "#FDECEA",
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.state.error,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    gap: 8,
  },
  warningText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#7F231C",
  },
  detailText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#7F231C",
  },
  irreversibleText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#7F231C",
  },
  // Informativo, não alarme: tom neutro para não competir com o aviso acima.
  keptBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#F1F3F2",
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  keptText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: "#4A5A52",
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
    justifyContent: "center",
    minHeight: 48,
  },
  cancelText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#424242",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: theme.colors.state.error,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  deleteButtonDisabled: {
    backgroundColor: "#E9A6A1",
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
