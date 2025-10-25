import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { QuestionItem } from './components/QuestionItem';

interface QuestionGroupProps {
  questions: Array<{
    id: number;
    text: string;
    observation?: string;
    option: Array<{ label: string; value: number | null }>;
  }>;
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
