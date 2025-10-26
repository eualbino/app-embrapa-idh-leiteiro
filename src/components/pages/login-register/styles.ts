import { useTheme } from "@/src/hooks/theme";
import { StyleSheet } from "react-native";

const theme = useTheme();

export const styles = StyleSheet.create({
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
});
