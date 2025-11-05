export interface QuestionOption {
  label: string;
  value: number | null;
}

export interface Question {
  id: number;
  text: string;
  observation?: string;
  option: QuestionOption[];
  groupMain: string;
  group: string;
}

export interface QuestionnaireStep {
  id: number;
  title: string;
  description: string;
  questions?: Question[];
}