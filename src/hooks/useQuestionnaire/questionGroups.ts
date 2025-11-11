import { questions } from "@/src/mock/questions";

export const data_quantidade_agua = questions.filter(
  (question) => question.groupMain === "quantidade-agua"
);

export const data_qualidade_agua = questions.filter(
  (question) => question.groupMain === "qualidade-agua"
);

export const data_manejo_residuos = questions.filter(
  (question) => question.groupMain === "manejo-residuos-uso-fertilizantes"
);

export const questionGroups = [
  null, // Step 0 é o FormularioQuestionario
  data_quantidade_agua,
  data_qualidade_agua,
  data_manejo_residuos,
];
