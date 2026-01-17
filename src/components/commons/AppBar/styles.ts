import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/src/config";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.primary.default,
    width: "100%",
  },
  appBarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    height: 80,
  },
  menuButton: {
    padding: theme.spacing.xxs,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text.inverse,
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  placeholder: {
    width: 36,
  },
  modalContainer: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerMenu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.75,
    backgroundColor: theme.colors.background.default,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: theme.borders.width.thin,
    borderBottomColor: theme.colors.border.light,
  },
  drawerTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.primary.default,
  },
  closeButton: {
    padding: theme.spacing.xxs,
  },
  menuItems: {
    paddingTop: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borders.radius.md,
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  menuItemActive: {
    backgroundColor: "#e8f5e9",
  },
  menuItemText: {
    fontSize: theme.typography.sizes.md,
    color: "#666",
    marginLeft: theme.spacing.md,
    fontWeight: theme.typography.weights.medium,
  },
  menuItemTextActive: {
    color: theme.colors.primary.default,
    fontWeight: theme.typography.weights.semibold,
  },
});
