import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { questions } from '@/src/mock/questions';

interface UseQuestionnaireProgressProps {
  answers: { [key: string]: number | null };
}

export const useQuestionnaireProgress = ({ answers }: UseQuestionnaireProgressProps) => {
  const { t } = useTranslation();
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(
      (value) => value !== undefined
    ).length;
  }, [answers]);

  const TOTAL_QUESTIONS = questions.length;
  
  const progress = useMemo(() => {
    return answeredCount / TOTAL_QUESTIONS;
  }, [answeredCount]);

  const getStepTitle = (step: number) => {
    switch (step) {
      case 0:
        return t('questionnaire.questions.characterizationTitle');
      case 1:
        return t('questionnaire.questions.waterQuantityTitle');
      case 2:
        return t('questionnaire.questions.waterQualityTitle');
      case 3:
        return t('questionnaire.questions.wasteManagementTitle');
      default:
        return "";
    }
  };

  const getStepDescription = (step: number) => {
    return t('questionnaire.questions.category', { current: step + 1, total: 4 });
  };

  return {
    answeredCount,
    progress,
    getStepTitle,
    getStepDescription,
    totalQuestions: TOTAL_QUESTIONS,
  };
};
