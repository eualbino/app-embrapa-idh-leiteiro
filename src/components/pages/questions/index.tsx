import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import {
  QuestionnaireProvider,
  useQuestionnaireContext,
} from "@/src/contexts/QuestionnaireContext";
import { QuestionnaireHeader } from "./components/QuestionnaireHeader";
import { DatePicker } from "./components/DatePicker";
import { QuestionGroup } from "./components/QuestionGroup";
import { NavigationButtons } from "./components/NavigationButtons";
import { FormularioQuestionario } from "./components/QuestionsCaracterizacao";
import { questions } from "@/src/mock/questions";
import { stylesQuestionsPage } from "./styles";

const data_quantidade_agua = questions.filter(
  (question) => question.groupMain === "quantidade-agua"
);
const data_qualidade_agua = questions.filter(
  (question) => question.groupMain === "qualidade-agua"
);
const data_manejo_residuos = questions.filter(
  (question) => question.groupMain === "manejo-residuos-uso-fertilizantes"
);

const groups = [
  null, // Step 0 é o FormularioQuestionario
  data_quantidade_agua,
  data_qualidade_agua,
  data_manejo_residuos,
];

const QuestionnaireContent: React.FC = () => {
  const { step, setFormData, formData } = useQuestionnaireContext();
  const currentGroup = groups[step];

  const handleDataChange = (data: any) => {
    setFormData(data);
  };

  return (
    <View>
      <QuestionnaireHeader />

      {step === 0 ? (
        <View>
          <DatePicker />
          <FormularioQuestionario
            onDataChange={handleDataChange}
            initialData={formData}
          />
        </View>
      ) : (
        currentGroup && <QuestionGroup questions={currentGroup} />
      )}

      <NavigationButtons />
    </View>
  );
};

export default function AllQuestionsScore() {
  const { t } = useTranslation();
  
  return (
    <QuestionnaireProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesQuestionsPage.containerInfo}>
          <Text style={stylesQuestionsPage.textHeader}>
            {t('questionnaire.title')}
          </Text>
          <Text style={stylesQuestionsPage.textSubHeader}>
            {t('questionnaire.subtitle')}
          </Text>
        </View>
      </ScrollView>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
}
