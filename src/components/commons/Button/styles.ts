import { StyleSheet } from "react-native";
import { useTheme } from "@/src/hooks/theme";

export const style = (
  variant: "primary" | "secondary",
  isActive: boolean,
  disabled: boolean
) => {
  const theme = useTheme();
  const variantButton = theme.components.button[variant];

  const backgroundColor = !isActive
    ? "#FFFFFF"
    : disabled
      ? (variantButton.disabled?.backgroundColor ??
        variantButton.backgroundColor)
      : variantButton.backgroundColor;

  const textColor = disabled
    ? (variantButton.disabled?.textColor ?? variantButton.textColor)
    : variantButton.textColor;

  return StyleSheet.create({
    container: {
      backgroundColor,
      borderRadius: variantButton.borderRadius ?? 8,
      paddingVertical: variantButton.paddingVertical ?? 12,
      paddingHorizontal: variantButton.paddingHorizontal ?? 16,
      borderWidth: variantButton.borderWidth ?? 0,
      borderColor: variantButton.borderColor,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.8 : 1,
    },
    label: {
      color: textColor,
      fontSize: variantButton.fontSize ?? 16,
      fontWeight: variantButton.fontWeight ?? "600",
    },
  });
};
