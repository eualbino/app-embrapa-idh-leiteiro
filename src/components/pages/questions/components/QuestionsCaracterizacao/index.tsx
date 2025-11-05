import React, { useCallback } from "react";
import { View } from "react-native";

import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import { useCharacterizationFormState } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/hooks/useCharacterizationFormState";
import { useCharacterizationFormLogic } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/hooks/useCharacterizationFormLogic";
import { FormSections } from "./components/FormSections";
import { stylesCharacterization } from "./styles";

interface FormularioQuestionarioProps {
  onDataChange: (data: FormData) => void;
  initialData?: FormData | null;
}

export const FormularioQuestionario: React.FC<FormularioQuestionarioProps> = ({
  onDataChange,
  initialData,
}) => {
  const formState = useCharacterizationFormState({ initialData });

  const renderRadioButton = useCallback(
    (isSelected: boolean) => (
      <View style={[stylesCharacterization.radio]}>
        {isSelected && <View style={stylesCharacterization.radioSelected} />}
      </View>
    ),
    []
  );

  useCharacterizationFormLogic({
    ...formState,
    onDataChange,
  });

  return <FormSections {...formState} renderRadioButton={renderRadioButton} />;
};
