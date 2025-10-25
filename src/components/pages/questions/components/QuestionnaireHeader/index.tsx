import React from "react";
import { View, Text } from "react-native";
import { useQuestionnaireProgress } from "@/src/components/pages/questions/components/QuestionnaireHeader/hooks/useQuestionnaireProgress";
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";
import { styles } from "./styles";

export const QuestionnaireHeader: React.FC = () => {
  const { step, answers } = useQuestionnaireContext();
  const {
    answeredCount,
    progress,
    getStepTitle,
    getStepDescription,
    totalQuestions,
  } = useQuestionnaireProgress({ answers });

  if (step === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Caracterização da Propriedade / Rebanho / Sistema
          </Text>
          <View>
            <Text style={styles.categoryCount}>Categoria {step + 1} de 4</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressTextContainer}>
          <View>
            <Text style={styles.progressText}>Progresso</Text>
          </View>
          <View>
            <Text style={styles.progressText}>
              {answeredCount} / {totalQuestions}
            </Text>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{getStepTitle(step)}</Text>
        <View>
          <Text style={styles.categoryCount}>{getStepDescription(step)}</Text>
        </View>
      </View>
    </View>
  );
};
