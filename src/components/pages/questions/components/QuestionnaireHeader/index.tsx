import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuestionnaireProgress } from "@/src/components/pages/questions/components/QuestionnaireHeader/hooks/useQuestionnaireProgress";
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";
import { styles } from "./styles";

export const QuestionnaireHeader: React.FC = () => {
  const { t } = useTranslation();
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
            {t('questionnaire.questions.characterizationTitle')}
          </Text>
          <View>
            <Text style={styles.categoryCount}>
              {t('questionnaire.questions.category', { current: step + 1, total: 4 })}
            </Text>
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
            <Text style={styles.progressText}>{t('questionnaire.questions.progress')}</Text>
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
