import React from "react";
import { View, Text, ScrollView } from "react-native";
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
import { stylesQuestions } from "./styles";

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
  return (
    <QuestionnaireProvider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesQuestions.containerInfo}>
          <Text style={stylesQuestions.textHeader}>
            Índice de{"\n"}Desempenho{"\n"}Hídrico na Produção Leiteira
          </Text>
          <Text style={stylesQuestions.textSubHeader}>
            Responda o questionário e obtenha um score indívidual, indicando o
            nível de desempenho hídrico do sistema de produção leiteira.
          </Text>
        </View>
      </ScrollView>
      <QuestionnaireContent />
    </QuestionnaireProvider>
  );
}
