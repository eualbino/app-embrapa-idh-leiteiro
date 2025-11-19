import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import { questionGroups } from "./questionGroups";
import { validateCaracterizacaoForm } from "./validation";
import { shouldDisableQuestion } from "./questionDisabling";
import { QuestionnaireState, QuestionnaireActions } from "./types";
import { useProperty } from "@/src/components/pages/questions/hooks/useProperty/useProperty";

export const useQuestionnaire = (): QuestionnaireState &
  QuestionnaireActions => {
  const { t } = useTranslation();
  const { createProperty, isLoading: isCreatingProperty } = useProperty();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
  const [formData, setFormData] = useState<FormData | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const currentGroup = questionGroups[step];

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

  const questionDisabled = useCallback(
    (questionId: string | number) => {
      return shouldDisableQuestion(questionId, answers);
    },
    [answers]
  );

  const handleNext = useCallback(async () => {
    if (step === 0) {
      if (formData) {
        const errors = validateCaracterizacaoForm(formData, t);
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

        try {
          await createProperty(formData);
          setStep((prev) => prev + 1);
        } catch (error) {
          console.error(error);
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
      return; // Retorna aqui para não executar o resto da função
    }

    if (step > 0 && currentGroup) {
      const unansweredQuestions = currentGroup.filter((q) => {
        const answer = answers[q.id];
        const isAnswered = answer !== undefined || questionDisabled(q.id);
        return !isAnswered;
      });

      const sortedAnswers = Object.keys(answers)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .reduce((obj, key) => {
          obj[key] = answers[key];
          return obj;
        }, {} as { [key: string]: number | null });

      if (unansweredQuestions.length > 0) {
        const questionNumbers = unansweredQuestions.map((q) => q.id).join(", ");
        Toast.show({
          type: "warning",
          text1: t("questionnaire.questions.toasts.answerAllTitle"),
          text2:
            t("questionnaire.questions.toasts.answerAllMessage") +
            ` (Perguntas: ${questionNumbers})`,
          visibilityTime: 5000,
        });
        return;
      }
    }

    if (step < questionGroups.length - 1) {
      if (step >= 1) {
        const groupNames: { [key: number]: string } = {
          1: "quantidade-agua",
          2: "qualidade-agua",
          3: "manejo-residuos-uso-fertilizantes",
        };

        const groupName = groupNames[step];
        const groupTranslationKey = `questionnaire.questions.groups.${groupName}`;
        const translatedGroupName = t(groupTranslationKey);

        Toast.show({
          type: "score",
          text1: t("questionnaire.questions.toasts.scoreTitle", {
            groupName: translatedGroupName,
          }),
          text2: "SCORE",
          position: "bottom",
          visibilityTime: 5000,
          bottomOffset: 200,
        });
      }

      setStep((prev) => prev + 1);
    } else {
      // Último step - mostra o score e navega para resultado
      const groupNames: { [key: number]: string } = {
        1: "quantidade-agua",
        2: "qualidade-agua",
        3: "manejo-residuos-uso-fertilizantes",
      };

      const groupName = groupNames[step];
      const groupTranslationKey = `questionnaire.questions.groups.${groupName}`;
      const translatedGroupName = t(groupTranslationKey);

      Toast.show({
        type: "score",
        text1: t("questionnaire.questions.toasts.scoreTitle", {
          groupName: translatedGroupName,
        }),
        text2: "SCORE",
        position: "bottom",
        visibilityTime: 5000,
        bottomOffset: 200,
      });

      setTimeout(() => {
        router.push("/result");
      }, 5000);
    }
  }, [
    step,
    formData,
    currentGroup,
    answers,
    questionDisabled,
    t,
    createProperty,
  ]);

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

  return {
    // State
    step,
    answers,
    formData,
    date,
    showPicker,
    isCreatingProperty,
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
