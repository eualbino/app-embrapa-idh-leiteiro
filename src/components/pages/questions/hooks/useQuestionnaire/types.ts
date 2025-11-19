import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export interface QuestionnaireState {
  step: number;
  answers: { [key: string]: number | null };
  formData: FormData | null;
  date: Date;
  showPicker: boolean;
  isCreatingProperty: boolean;
}

export interface QuestionnaireActions {
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
  validateCaracterizacaoForm: (
    data: FormData,
    t: (key: string) => string
  ) => string[];
}
