import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export interface QuestionnaireState {
  step: number;
  answers: { [key: string]: number | null };
  formData: FormData | null;
  date: Date;
  showPicker: boolean;
  isCreatingProperty: boolean;
  isCreatingWaterIndicator: boolean;
  isCreatingWaterQuality: boolean;
  isCreatingWasteManagement: boolean;
}

export interface QuestionnaireActions {
  setFormData: (formData: FormData | null) => void;
  setDate: (date: Date) => void;
  setShowPicker: (show: boolean) => void;
  handleSelect: (id: string | number, value: number | null) => void;
  handleNext: () => void;
  handlePrevious: () => void;
  formatDate: (rawDate: Date) => string;
  questionDisabled: (questionId: string | number) => boolean;
}
