import type { FC } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  GestureResponderEvent,
} from "react-native";
import { styles } from "./styles";

interface RadioProps {
  selected?: boolean;
  disabled?: boolean;
}

interface OptionWithInputProps {
  label: string;
  selected: boolean;
  onPress: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  showInput?: boolean;
  inputValue?: string;
  onChangeText?: (text: string) => void;
  inputPlaceholder?: string;
}

function Radio({ selected, disabled }: RadioProps) {
  return (
    <View
      style={[
        styles.radio,
        disabled && { borderColor: "#006f36ab" },
        selected && { borderColor: "#006f36ff" },
      ]}
    >
      {selected && <View style={styles.radioSelected} />}
    </View>
  );
}

export const OptionWithInput: FC<OptionWithInputProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
  showInput = false,
  inputValue,
  onChangeText,
  inputPlaceholder,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={onPress}
        disabled={disabled}
      >
        <Radio selected={selected} disabled={disabled} />
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text
            style={[
              styles.questionsResponseText,
              disabled && { color: "#006f36ab" },
            ]}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>

      {showInput && (
        <TextInput
          style={[styles.textInput, { opacity: selected ? 1 : 0.5 }]}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChangeText={onChangeText}
          editable={selected}
        />
      )}
    </View>
  );
};
