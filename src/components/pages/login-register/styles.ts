import { theme } from "@/src/config";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    width: 170,
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
});
