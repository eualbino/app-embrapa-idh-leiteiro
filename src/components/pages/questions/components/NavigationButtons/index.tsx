import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ButtonCommon } from '@/src/components/commons/Button';
import { useQuestionnaireContext } from '@/src/contexts/QuestionnaireContext';
import { styles } from './styles';

export const NavigationButtons: React.FC = () => {
  const { t } = useTranslation();
  const { step, handleNext, handlePrevious } = useQuestionnaireContext();

  const isFirstStep = step === 0;
  const isLastStep = step === 3;

  return (
    <View style={styles.container}>
      <View>
        <ButtonCommon
          onPress={handlePrevious}
          disabled={isFirstStep}
          variant="secondary"
        >
          {"<  "} {t('questionnaire.questions.previous')}
        </ButtonCommon>
      </View>
      <View>
        <ButtonCommon onPress={handleNext} variant="primary">
          {isLastStep ? t('questionnaire.questions.finish') : t('questionnaire.questions.next')} {"  >"}
        </ButtonCommon>
      </View>
    </View>
  );
};
