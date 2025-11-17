import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import {
  QuestionnaireProvider,
  useQuestionnaireContext,
} from "@/src/contexts/QuestionnaireContext";
import { QuestionnaireHeader } from "./components/QuestionnaireHeader";
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
        <FormularioQuestionario
          onDataChange={handleDataChange}
          initialData={formData}
        />
      ) : (
        currentGroup && <QuestionGroup questions={currentGroup} />
      )}

      <NavigationButtons />
    </View>
  );
};

export default function AllQuestionsScore() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContentWrapper />
    </QuestionnaireProvider>
  );
}

const QuestionnaireContentWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { scrollRef, step } = useQuestionnaireContext();

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    });
  }, [step, scrollRef]);

  return (
    <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
      <View style={stylesQuestionsPage.containerInfo}>
        <Text style={stylesQuestionsPage.textHeader}>
          {t("questionnaire.title")}
        </Text>
        <Text style={stylesQuestionsPage.textSubHeader}>
          {t("questionnaire.subtitle")}
        </Text>
      </View>
      <QuestionnaireContent />
    </ScrollView>
  );
};
