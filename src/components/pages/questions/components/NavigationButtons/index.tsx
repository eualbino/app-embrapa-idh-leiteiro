import React from 'react';
import { View } from 'react-native';
import { ButtonCommon } from '@/src/components/commons/Button';
import { useQuestionnaireContext } from '@/src/contexts/QuestionnaireContext';
import { styles } from './styles';

export const NavigationButtons: React.FC = () => {
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
          {"<  "} Voltar
        </ButtonCommon>
      </View>
      <View>
        <ButtonCommon onPress={handleNext} variant="primary">
          {isLastStep ? "Finalizar" : "Próximo"} {"  >"}
        </ButtonCommon>
      </View>
    </View>
  );
};
