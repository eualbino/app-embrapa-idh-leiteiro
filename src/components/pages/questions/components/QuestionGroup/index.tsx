// External Libraries
import React from "react";
import { View } from "react-native";

// Components
import { QuestionItem } from "./components/QuestionItem";

// Style
import { styles } from "./styles";

interface QuestionGroupProps {
  questions: {
    id: number;
    text: string;
    observation?: string;
    option: { label: string; value: number | null }[];
  }[];
}

export const QuestionGroup: React.FC<QuestionGroupProps> = ({ questions }) => {
  return (
    <View style={styles.container}>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </View>
  );
};
