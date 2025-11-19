export const getDisabledQuestions = (answers: {
  [key: string]: number | null;
}) => {
  const disabled: string[] = [];

  if (answers["2"] !== undefined && answers["2"] !== null && answers["2"] === 0) {
    disabled.push("3", "4");
  }

  if (answers["14"] !== undefined && answers["14"] !== null && answers["14"] === 0) {
    disabled.push("15", "16", "17");
  }

  if (answers["22"] !== undefined && answers["22"] !== null && answers["22"] === 0) {
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
