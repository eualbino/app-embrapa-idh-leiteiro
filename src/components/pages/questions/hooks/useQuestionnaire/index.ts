// External Libraries
import { useState, useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { useProperty } from "@/src/components/pages/questions/hooks/useProperty/useProperty";
import { useWaterIndicator } from "@/src/components/pages/questions/hooks/useWaterIndicator";
import { useWaterQualityConservation } from "@/src/components/pages/questions/hooks/useWaterQualityConservation";
import { useWasteManagement } from "@/src/components/pages/questions/hooks/useWasteManagement";

// Services
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";

// Handlers
import { handleCharacterizacaoStep } from "./handlers/stepCharacterizacao";
import { handleWaterIndicatorStep } from "./handlers/stepWaterIndicator";
import { handleWaterQualityStep } from "./handlers/stepWaterQuality";
import { handleWasteManagementStep } from "./handlers/stepWasteManagement";

// Mock
import { GROUP_MAIN } from "@/src/mock/questions";

// Utils
import { propertyToFormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/utils/propertyToFormData";
import { shouldDisableQuestion } from "./questionDisabling";
import { questionGroups } from "./questionGroups";

// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import type { QuestionnaireState, QuestionnaireActions } from "./types";

const STEP_GROUP_NAMES: Record<number, string> = {
  1: GROUP_MAIN.waterIndicator,
  2: GROUP_MAIN.waterQuality,
  3: GROUP_MAIN.wasteManagement,
};

export const useQuestionnaire = (): QuestionnaireState & QuestionnaireActions => {
  // Hooks
  const { t, i18n } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { properties, isAuthenticated, refetchUser } = useAuthContext();
  const { createProperty, isLoading: isCreatingProperty } = useProperty();
  const { createWaterIndicator, isLoading: isCreatingWaterIndicator } = useWaterIndicator();
  const { createWaterQualityConservation, isLoading: isCreatingWaterQuality } = useWaterQualityConservation();
  const { createWasteManagement, isLoading: isCreatingWasteManagement } = useWasteManagement();

  // States
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
  const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});
  const [formData, setFormData] = useState<FormData | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);
  const [waterIndicatorScore, setWaterIndicatorScore] = useState(0);
  const [waterQualityScore, setWaterQualityScore] = useState(0);

  // UseEffects
  // Pré-preenche o formulário com a propriedade mais recente do usuário
  useEffect(() => {
    if (properties && properties.length > 0 && !hasAutoFilled) {
      setFormData(propertyToFormData(properties[properties.length - 1]));
      setHasAutoFilled(true);
    }
  }, [properties, hasAutoFilled]);

  // Desabilita Q3/Q4 quando Q2 é 0; Q15/Q16/Q17 quando Q14 é 0; Q23/Q24/Q25 quando Q22 é 0
  const answer2 = answers["2"];
  const answer14 = answers["14"];
  const answer22 = answers["22"];

  useEffect(() => {
    if (answer2 === 0) {
      setAnswers((prev) => ({ ...prev, "3": 0, "4": 0 }));
      setSelectedIndexes((prev) => ({ ...prev, "3": 0, "4": 0 }));
    }
    if (answer14 === 0) {
      setAnswers((prev) => ({ ...prev, "15": 0, "16": 0, "17": 0 }));
      setSelectedIndexes((prev) => ({ ...prev, "15": 0, "16": 0, "17": 0 }));
    }
    if (answer22 === 0) {
      setAnswers((prev) => ({ ...prev, "23": null, "24": null, "25": null }));
      setSelectedIndexes((prev) => ({ ...prev, "23": 0, "24": 0, "25": 0 }));
    }
  }, [answer2, answer14, answer22]);

  useEffect(() => {
    const isOfflineSession =
      !isOnline ||
      !isAuthenticated ||
      OfflineSyncService.isTempPropertyId(propertyId ?? "");
    if (Object.keys(answers).length > 0 && isOfflineSession) {
      OfflineSyncService.saveOfflineAnswers(answers);
    }
  }, [answers, isOnline, isAuthenticated, propertyId]);

  // Functions
  const currentGroup = questionGroups[step];

  const handleSelect = useCallback(
    (id: string | number, value: number | null, index?: number) => {
      setAnswers((prev) => ({ ...prev, [id]: value }));
      if (index !== undefined) {
        setSelectedIndexes((prev) => ({ ...prev, [id]: index }));
      }
    },
    [],
  );

  const questionDisabled = useCallback(
    (questionId: string | number) => shouldDisableQuestion(questionId, answers),
    [answers],
  );

  const handleNext = useCallback(
    async (formDataOverride?: FormData | null) => {
      // Step 0: cadastro da propriedade
      if (step === 0) {
        try {
          await handleCharacterizacaoStep({
            formData,
            formDataOverride,
            createProperty,
            t,
            language: i18n.language,
            onSuccess: (pid, data) => {
              setPropertyId(pid);
              setFormData(data);
              setStep((prev) => prev + 1);
            },
          });
        } catch (err) {
          // Sem este aviso o botão "Avançar" ficava inerte quando o cadastro
          // da propriedade falhava, sem nenhuma explicação ao usuário.
          console.error("Erro no passo de caracterização:", err);
          Toast.show({
            type: "error",
            text1: t("common.error"),
            text2: t("questionnaire.questions.toasts.stepError"),
            visibilityTime: 5000,
          });
        }
        return;
      }

      // Validação: todas as perguntas do grupo devem estar respondidas
      if (currentGroup) {
        const unanswered = currentGroup.filter(
          (q) => answers[q.id] === undefined && !questionDisabled(q.id),
        );
        if (unanswered.length > 0) {
          Toast.show({
            type: "warning",
            text1: t("questionnaire.questions.toasts.answerAllTitle"),
            text2: `${t("questionnaire.questions.toasts.answerAllMessage")} ${t("questionnaire.questions.toasts.questionIds", { ids: unanswered.map((q) => q.id).join(", ") })}`,
            visibilityTime: 5000,
          });
          return;
        }
      }

      if (!propertyId) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("questionnaire.questions.toasts.propertyNotFound"),
          visibilityTime: 5000,
        });
        return;
      }

      const translatedGroupName = t(
        `questionnaire.questions.groups.${STEP_GROUP_NAMES[step]}`,
      );

      // Steps 1 e 2: calcula indicador e avança
      if (step < questionGroups.length - 1) {
        try {
          if (step === 1) {
            await handleWaterIndicatorStep({
              propertyId,
              answers,
              createWaterIndicator,
              translatedGroupName,
              t,
              onSuccess: (score) => setWaterIndicatorScore(score),
            });
          } else if (step === 2) {
            await handleWaterQualityStep({
              propertyId,
              answers,
              createWaterQualityConservation,
              translatedGroupName,
              t,
              onSuccess: (score) => setWaterQualityScore(score),
            });
          }
        } catch (err) {
          console.error("Erro ao calcular indicador do passo:", err);
          Toast.show({
            type: "error",
            text1: t("common.error"),
            text2: t("questionnaire.questions.toasts.stepError"),
            visibilityTime: 5000,
          });
          return;
        }
        setStep((prev) => prev + 1);
        return;
      }

      // Step 3: manejo de resíduos + WPI + navegação
      try {
        await handleWasteManagementStep({
          propertyId,
          answers,
          isOnline,
          isAuthenticated,
          waterIndicatorScore,
          waterQualityScore,
          createWasteManagement,
          translatedGroupName,
          t,
        });
        refetchUser();
      } catch (err) {
        console.error(err);
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: t("questionnaire.questions.toasts.stepError"),
          visibilityTime: 5000,
        });
      }
    },
    [
      step,
      formData,
      currentGroup,
      answers,
      questionDisabled,
      t,
      createProperty,
      createWaterIndicator,
      createWaterQualityConservation,
      createWasteManagement,
      propertyId,
      isOnline,
      isAuthenticated,
      waterIndicatorScore,
      waterQualityScore,
      refetchUser,
    ],
  );

  const handlePrevious = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  const formatDate = useCallback((rawDate: Date) => {
    const day = rawDate.getDate().toString().padStart(2, "0");
    const month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}/${rawDate.getFullYear()}`;
  }, []);

  return {
    date,
    step,
    answers,
    setDate,
    formData,
    showPicker,
    setFormData,
    setShowPicker,
    selectedIndexes,
    isCreatingProperty,
    isCreatingWaterQuality,
    isCreatingWaterIndicator,
    isCreatingWasteManagement,
    formatDate,
    handleNext,
    handleSelect,
    handlePrevious,
    questionDisabled,
  };
};
