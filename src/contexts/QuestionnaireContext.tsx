// External Libraries
import React, { createContext, useContext, ReactNode, useRef } from "react";
import { ScrollView } from "react-native";

// Hooks
import { useQuestionnaire } from "@/src/components/pages/questions/hooks/useQuestionnaire";

// Types
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

interface QuestionnaireContextType {
  // State
  step: number;
  answers: { [key: string]: number | null };
  formData: FormData | null;
  date: Date;
  showPicker: boolean;
  isCreatingProperty: boolean;
  isCreatingWaterIndicator: boolean;
  isCreatingWaterQuality: boolean;
  isCreatingWasteManagement: boolean;
  scrollRef: React.RefObject<ScrollView | null>;
  // Actions
  setFormData: (formData: FormData | null) => void;
  setDate: (date: Date) => void;
  setShowPicker: (show: boolean) => void;
  handleSelect: (id: string | number, value: number | null) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  formatDate: (rawDate: Date) => string;
  questionDisabled: (questionId: string | number) => boolean;
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
      "useQuestionnaireContext must be used within a QuestionnaireProvider",
    );
  }
  return context;
};
