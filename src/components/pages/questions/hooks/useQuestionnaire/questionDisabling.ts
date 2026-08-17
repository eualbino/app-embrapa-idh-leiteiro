const DISABLING_RULES: { trigger: string; value: number; disables: string[] }[] = [
  { trigger: "2", value: 0, disables: ["3", "4"] },
  { trigger: "14", value: 0, disables: ["15", "16", "17"] },
  { trigger: "22", value: 0, disables: ["23", "24", "25"] },
];

export const getDisabledQuestions = (answers: { [key: string]: number | null }): string[] => {
  const disabled: string[] = [];

  for (const rule of DISABLING_RULES) {
    const answer = answers[rule.trigger];
    if (answer !== undefined && answer !== null && answer === rule.value) {
      disabled.push(...rule.disables);
    }
  }

  return disabled;
};

export const shouldDisableQuestion = (
  questionId: string | number,
  answers: { [key: string]: number | null },
): boolean => {
  return getDisabledQuestions(answers).includes(String(questionId));
};
