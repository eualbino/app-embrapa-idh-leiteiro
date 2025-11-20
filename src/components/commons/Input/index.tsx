import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { style } from "./styles";

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
  secureTextEntry,
  ...inputProps
}) => {
  const styles = style();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordInput = secureTextEntry !== undefined;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={{ position: "relative" }}>
        <TextInput
          style={[
            styles.input,
            inputStyle,
            isPasswordInput && { paddingRight: 50 },
          ]}
          keyboardType={type}
          secureTextEntry={isPasswordInput && !isPasswordVisible}
          {...inputProps}
        />
        {isPasswordInput && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{
              position: "absolute",
              right: 15,
              top: "50%",
              transform: [{ translateY: -12 }],
            }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
