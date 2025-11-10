export const getDisabledQuestions = (answers: {
  [key: string]: number | null;
}) => {
  const disabled: string[] = [];

  // Se resposta da pergunta 2 for "Não" (0), desabilita perguntas 3 e 4
  if (answers["2"] === 0) {
    disabled.push("3", "4");
  }

  // Se resposta da pergunta 14 foi "Não monitora" (0), desabilita perguntas 15, 16 e 17
  if (answers["14"] === 0) {
    disabled.push("15", "16", "17");
  }

  // Se resposta da pergunta 22 for "Não" (0), desabilita perguntas 23, 24 e 25
  if (answers["22"] === 0) {
    disabled.push("23", "24", "25");
  }

  return disabled;
};

export const shouldDisableQuestion = (
  questionId: string | number,
  answers: { [key: string]: number | null }
): boolean => {
  const disabledQuestions = getDisabledQuestions(answers);
  return disabledQuestions.includes(String(questionId));
};
