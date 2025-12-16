// External Libraries
import React, { memo } from "react";
import { View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useTranslation } from "react-i18next";

// Context
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";

// Components
import { OptionWithInput } from "@/src/components/commons/RadioButton";

// Style
import { styles } from "./styles";

interface QuestionItemProps {
  question: {
    id: number;
    text: string;
    observation?: string;
    option: { label: string; value: number | null }[];
  };
}

const QuestionItemComponent: React.FC<QuestionItemProps> = ({ question }) => {
  const { t } = useTranslation();
  const { answers, handleSelect, questionDisabled } = useQuestionnaireContext();

  const isDisabled = questionDisabled(question.id);

  const renderTextWithItalic = (text: string) => {
    const parts = text.split(/(Escherichia coli)/gi);
    return parts.map((part, index) => {
      if (part.match(/Escherichia coli/i)) {
        return (
          <Text key={index} style={{ fontStyle: "italic" }}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.questionText}>
          <Text>{question.id}. </Text>
          {renderTextWithItalic(t(question.text))}
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
          <Text style={styles.observationText}>
            {renderTextWithItalic(t(question.observation))}
          </Text>
        </View>
      )}

      <View style={styles.optionsContainer}>
        {question.option.map((opt, idx) => (
          <OptionWithInput
            key={`${question.id}-${idx}`}
            label={t(opt.label)}
            selected={answers[question.id] === opt.value}
            onPress={() => handleSelect(question.id, opt.value)}
            disabled={isDisabled}
          />
        ))}
      </View>
    </View>
  );
};

export const QuestionItem = memo(QuestionItemComponent);
