import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
} from "react-native";
import { useInputStyles } from "./styles";

interface InputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  type?: KeyboardTypeOptions;
  containerStyle?: any;
  inputStyle?: any;
  labelStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "default",
  containerStyle,
  inputStyle,
  labelStyle,
  ...inputProps
}) => {
  const styles = useInputStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        keyboardType={type}
        {...inputProps}
      />
    </View>
  );
};
