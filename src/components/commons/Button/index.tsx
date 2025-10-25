import React, { FC } from "react";
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { style as getStyles } from "./styles";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const ButtonCommon: FC<ButtonProps> = ({
  children,
  onPress,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
  testID,
}) => {
  const styles = getStyles(variant, disabled);

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <Text style={[styles.label, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};
