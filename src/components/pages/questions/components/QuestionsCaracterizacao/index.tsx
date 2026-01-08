// External Libraries
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";

// Components
import { FormSections } from "./components/FormSections";

// Hooks
import { useCharacterizationFormState } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/hooks/useCharacterizationFormState";
import { useCharacterizationFormLogic } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/hooks/useCharacterizationFormLogic";

// Types
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

// Style
import { stylesCharacterization } from "./styles";

interface FormularioQuestionarioProps {
  initialData?: FormData | null;
  onFormDataReady?: (data: FormData) => void;
}

export const FormularioQuestionario: React.FC<FormularioQuestionarioProps> = ({
  initialData,
  onFormDataReady,
}) => {
  const { form, handleFormChange } = useCharacterizationFormState({
    initialData,
  });

  const renderRadioButton = useCallback(
    (isSelected: boolean) => (
      <View style={[stylesCharacterization.radio]}>
        {isSelected && <View style={stylesCharacterization.radioSelected} />}
      </View>
    ),
    [],
  );

  const formData = useCharacterizationFormLogic(form);

  useEffect(() => {
    if (onFormDataReady) {
      onFormDataReady(formData);
    }
  }, [formData, onFormDataReady]);

  return (
    <FormSections
      form={form}
      handleFormChange={handleFormChange}
      renderRadioButton={renderRadioButton}
    />
  );
};
