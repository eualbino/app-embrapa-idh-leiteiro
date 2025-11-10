import React, { createContext, useContext, ReactNode, useRef } from "react";
import { ScrollView } from "react-native";
import { useQuestionnaire } from "@/src/hooks/useQuestionnaire";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

interface QuestionnaireContextType {
  step: number;
  answers: { [key: string]: number | null };
  formData: FormData | null;
  date: Date;
  showPicker: boolean;
  scrollRef: React.RefObject<ScrollView>;
  setStep: (step: number) => void;
  setAnswers: (answers: { [key: string]: number | null }) => void;
  setFormData: (formData: FormData | null) => void;
  setDate: (date: Date) => void;
  setShowPicker: (show: boolean) => void;
  handleSelect: (id: string | number, value: number | null) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  toggleDatePicker: () => void;
  formatDate: (rawDate: Date) => string;
  questionDisabled: (questionId: string | number) => boolean;
  validateCaracterizacaoForm: (data: FormData) => string[];
}

const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

interface QuestionnaireProviderProps {
  children: ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({
  children,
}) => {
  const questionnaire = useQuestionnaire();
  const scrollRef = useRef<ScrollView>(null);

  return (
    <QuestionnaireContext.Provider value={{ ...questionnaire, scrollRef }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaireContext = (): QuestionnaireContextType => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionnaireContext must be used within a QuestionnaireProvider"
    );
  }
  return context;
};
