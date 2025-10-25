import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.lg,
  },
  progressContainer: {
    borderRadius: theme.borders.radius.lg,
    borderWidth: theme.borders.width.thick,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  progressTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: theme.colors.border.light,
    borderRadius: theme.borders.radius.lg,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: theme.colors.primary.default,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.lg,
    borderWidth: theme.borders.width.thick,
    borderRadius: theme.borders.radius.lg,
    borderColor: theme.colors.border.light,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  title: {
    flex: 1,
    marginRight: theme.spacing.xs,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.lg,
  },
  categoryCount: {
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary.light,
    fontSize: theme.typography.sizes.sm,
  },
});
