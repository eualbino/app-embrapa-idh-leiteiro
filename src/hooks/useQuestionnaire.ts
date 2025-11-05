import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { questions } from "@/src/mock/questions";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import Toast from "react-native-toast-message";

interface QuestionnaireState {
  step: number;
  answers: { [key: string]: number | null };
  formData: FormData | null;
  date: Date;
  showPicker: boolean;
}

interface QuestionnaireActions {
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

const data_quantidade_agua = questions.filter(
  (question) => question.groupMain === "quantidade-agua"
);
const data_qualidade_agua = questions.filter(
  (question) => question.groupMain === "qualidade-agua"
);
const data_manejo_residuos = questions.filter(
  (question) => question.groupMain === "manejo-residuos-uso-fertilizantes"
);

const groups = [
  null, // Step 0 é o FormularioQuestionario
  data_quantidade_agua,
  data_qualidade_agua,
  data_manejo_residuos,
];

export const useQuestionnaire = (): QuestionnaireState &
  QuestionnaireActions => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
  const [formData, setFormData] = useState<FormData | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const currentGroup = groups[step];

  useEffect(() => {
    if (answers["2"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "3": 0,
        "4": 0,
      }));
    }

    if (answers["14"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "15": null,
        "16": null,
        "17": null,
      }));
    }

    if (answers["22"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "23": null,
        "24": null,
        "25": null,
      }));
    }
  }, [answers["2"], answers["14"], answers["22"]]);

  const handleSelect = useCallback(
    (id: string | number, value: number | null) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const validateCaracterizacaoForm = useCallback(
    (data: FormData): string[] => {
      const errors: string[] = [];

      if (!data.sistemaProducao.tipo) {
        errors.push(t("questionnaire.validation.productionSystemRequired"));
      }

      if (
        data.sistemaProducao.tipo === "outro" &&
        !data.sistemaProducao.outroEspecificacao?.trim()
      ) {
        errors.push(t("questionnaire.validation.specifyOtherProductionSystem"));
      }

      if (!data.area.propriedade) {
        errors.push(t("questionnaire.validation.farmAreaRequired"));
      }

      if (!data.rebanho.vacasLactacao) {
        errors.push(t("questionnaire.validation.lactatingCowsRequired"));
      }

      if (!data.producaoLeiteira.litrosDiaPropriedade) {
        errors.push(t("questionnaire.validation.dailyProductionRequired"));
      }

      return errors;
    },
    [t]
  );

  const handleNext = useCallback(() => {
    if (step === 0) {
      if (formData) {
        const errors = validateCaracterizacaoForm(formData);
        if (errors.length > 0) {
          Toast.show({
            type: "error",
            text1: t("questionnaire.questions.toasts.requiredFieldsTitle"),
            text2: `${t(
              "questionnaire.questions.toasts.fillFieldsPrefix"
            )}\n\n• ${errors.join("\n• ")}`,
            visibilityTime: 20000,
            autoHide: true,
          });
          return;
        }
      } else {
        Toast.show({
          type: "error",
          text1: t("questionnaire.questions.toasts.missingFormDataTitle"),
          text2: t("questionnaire.questions.toasts.missingFormDataMessage"),
          visibilityTime: 5000,
        });
        return;
      }
    }

    if (step > 0 && currentGroup) {
      const allAnswered = currentGroup.every(
        (q) => answers[q.id] !== undefined
      );

      const sortedAnswers = Object.keys(answers)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reduce((obj, key) => {
          obj[key] = answers[key];
          return obj;
        }, {} as { [key: string]: number | null });

      console.log("📝 Respostas atuais:", sortedAnswers);

      if (!allAnswered) {
        Toast.show({
          type: "warning",
          text1: t("questionnaire.questions.toasts.answerAllTitle"),
          text2: t("questionnaire.questions.toasts.answerAllMessage"),
        });
        return;
      }
    }

    if (step < groups.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      Toast.show({
        type: "success",
        text1: t("questionnaire.questions.toasts.completedTitle"),
        text2: t("questionnaire.questions.toasts.completedMessage"),
      });
    }
  }, [step, formData, currentGroup, answers, validateCaracterizacaoForm]);

  const handlePrevious = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const toggleDatePicker = useCallback(() => {
    setShowPicker(!showPicker);
  }, [showPicker]);

  const formatDate = useCallback((rawDate: Date) => {
    let day = rawDate.getDate().toString().padStart(2, "0");
    let month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    let year = rawDate.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  const questionDisabled = useCallback(
    (questionId: string | number) => {
      const id = String(questionId);
      if ((id === "3" || id === "4") && answers["2"] === 0) {
        return true;
      }
      if ((id === "15" || id === "16" || id === "17") && answers["14"] === 0) {
        return true;
      }
      if ((id === "23" || id === "24" || id === "25") && answers["22"] === 0) {
        return true;
      }
      return false;
    },
    [answers]
  );

  return {
    // State
    step,
    answers,
    formData,
    date,
    showPicker,
    // Actions
    setStep,
    setAnswers,
    setFormData,
    setDate,
    setShowPicker,
    handleSelect,
    handleNext,
    handlePrevious,
    toggleDatePicker,
    formatDate,
    questionDisabled,
    validateCaracterizacaoForm,
  };
};
