import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  containerInfo: {
    marginTop: theme.spacing.xxxl,
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.xxl,
    textAlign: "center",
    fontWeight: theme.typography.weights.semibold,
  },
  textSubHeader: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: "center",
  },
});
