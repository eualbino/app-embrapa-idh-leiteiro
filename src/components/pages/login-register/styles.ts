import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  logosContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  logoEmbrapa: {
    // Sem `height` a imagem colapsava para 0px em contexto flex com
    // resizeMode="contain" — o logo da Embrapa não aparecia.
    // 170x63 mantém a proporção de logo_embrapa.png (300x111).
    width: 170,
    height: 63,
  },
  logoIDH: {
    width: 170,
    height: 150,
    marginBottom: 18,
  },
  container: {
    borderRadius: theme.components.container.default.borderRadius,
    padding: theme.components.container.default.padding,
    backgroundColor: theme.components.container.default.backgroundColor,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    rowGap: 20,
  },
  textHeader: {
    color: theme.colors.primary.default,
    textAlign: "center",
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
  },
  containerSelectView: {
    backgroundColor: theme.colors.background.light,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borders.radius.md,
    paddingVertical: 5,
    paddingHorizontal: 8,
    columnGap: 5,
  },
  buttonView: {
    width: "50%",
    borderRadius: theme.borders.radius.md,
    paddingVertical: 8,
    borderWidth: theme.borders.width.none,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  forgotPasswordLink: {
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: "right",
    textDecorationLine: "underline",
    marginTop: -20,
  },
  checkboxContainer: {
    marginTop: 16,
    gap: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary.default,
    borderColor: theme.colors.primary.default,
  },
  checkboxMark: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 14,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
  checkboxLink: {
    color: theme.colors.primary.default,
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});
