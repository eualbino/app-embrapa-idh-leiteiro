import { useMemo } from 'react';

interface UseQuestionnaireProgressProps {
  answers: { [key: string]: number | null };
}

export const useQuestionnaireProgress = ({ answers }: UseQuestionnaireProgressProps) => {
  const answeredCount = useMemo(() => {
    return Object.values(answers).filter(
      (value) => value !== undefined
    ).length;
  }, [answers]);

  const TOTAL_QUESTIONS = 35;
  
  const progress = useMemo(() => {
    return answeredCount / TOTAL_QUESTIONS;
  }, [answeredCount]);

  const getStepTitle = (step: number) => {
    switch (step) {
      case 0:
        return "Caracterização da Propriedade / Rebanho / Sistema";
      case 1:
        return "Quantidade de Água";
      case 2:
        return "Qualidade da Água";
      case 3:
        return "Manejo de Resíduos e Uso de Fertilizantes";
      default:
        return "";
    }
  };

  const getStepDescription = (step: number) => {
    return `Categoria ${step + 1} de 4`;
  };

  return {
    answeredCount,
    progress,
    getStepTitle,
    getStepDescription,
    totalQuestions: 35,
  };
};
