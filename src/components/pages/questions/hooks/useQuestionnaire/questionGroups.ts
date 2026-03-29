import { questions, GROUP_MAIN } from "@/src/mock/questions";

export const data_quantidade_agua = questions.filter(
  (question) => question.groupMain === GROUP_MAIN.waterIndicator,
);

export const data_qualidade_agua = questions.filter(
  (question) => question.groupMain === GROUP_MAIN.waterQuality,
);

export const data_manejo_residuos = questions.filter(
  (question) => question.groupMain === GROUP_MAIN.wasteManagement,
);

export const questionGroups = [
  null, // Step 0 é o FormularioQuestionario
  data_quantidade_agua,
  data_qualidade_agua,
  data_manejo_residuos,
];
