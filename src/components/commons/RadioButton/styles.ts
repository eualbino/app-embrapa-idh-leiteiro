import { StyleSheet } from "react-native";
import { theme } from "@/src/config";

export const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.spacing.xxs,
  },
  radio: {
    height: theme.components.radio.size,
    width: theme.components.radio.size,
    borderRadius: theme.components.radio.size / 2,
    borderWidth: theme.components.radio.borderWidth,
    borderColor: theme.components.radio.borderColor,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
    backgroundColor: theme.components.radio.backgroundColor,
  },
  radioSelected: {
    height: theme.components.radio.innerSize,
    width: theme.components.radio.innerSize,
    borderRadius: theme.components.radio.innerSize / 2,
    backgroundColor: theme.components.radio.selectedColor,
  },
  questionsResponseText: {
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.weights.semibold as any,
    fontSize: theme.typography.sizes.md,
    flex: 1,
    flexWrap: "wrap",
  },
  textInput: {
    borderWidth: theme.components.input.default.borderWidth,
    borderColor: theme.components.input.default.borderColor,
    borderRadius: theme.components.input.default.borderRadius,
    paddingHorizontal: theme.components.input.default.paddingHorizontal,
    paddingVertical: theme.components.input.default.paddingVertical,
    fontSize: theme.components.input.default.fontSize,
    backgroundColor: theme.components.input.default.backgroundColor,
    minHeight: theme.components.input.default.minHeight,
    color: theme.components.input.default.color,
    marginTop: theme.spacing.sm,
  },
});
