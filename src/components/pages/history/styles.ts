import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  containerInfo: {
    marginTop: theme.spacing.xxxl,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xl,
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
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.md,
  },
  errorText: {
    color: theme.colors.state.error,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  errorSubText: {
    color: theme.colors.text.secondary,
    fontSize: theme.typography.sizes.sm,
    textAlign: "center",
  },
  userInfoCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  userInfoTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    marginBottom: theme.spacing.md,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  userInfoLabel: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
  },
  userInfoValue: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  propertiesSection: {
    marginTop: theme.spacing.md,
  },
  propertiesTitle: {
    textAlign: "center",
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    marginBottom: theme.spacing.md,
  },
  propertiesList: {
    marginTop: theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.medium,
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  emptySubText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
});
