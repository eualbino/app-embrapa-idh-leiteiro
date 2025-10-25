import React from "react";
import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { OptionWithInput } from "@/src/components/commons/RadioButton";
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";
import { styles } from "./styles";

interface QuestionItemProps {
  question: {
    id: number;
    text: string;
    observation?: string;
    option: Array<{ label: string; value: number | null }>;
  };
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
  const { answers, handleSelect, questionDisabled } = useQuestionnaireContext();

  const isDisabled = questionDisabled(question.id);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.questionText}>
          <Text>{question.id}. </Text>
          <Text>{question.text}</Text>
        </Text>
      </View>

      {question.observation && (
        <View style={styles.observationContainer}>
          <Feather
            name="alert-circle"
            size={24}
            color="#006f36ff"
            style={{ textAlign: "center" }}
          />
          <Text style={styles.observationText}>{question.observation}</Text>
        </View>
      )}

      <View style={styles.optionsContainer}>
        {question.option.map((opt) => (
          <OptionWithInput
            key={opt.value}
            label={opt.label}
            selected={answers[question.id] === opt.value}
            onPress={() => handleSelect(question.id, opt.value)}
            disabled={isDisabled}
          />
        ))}
      </View>
    </View>
  );
};
