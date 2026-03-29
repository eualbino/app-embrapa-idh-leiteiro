// External Libraries
import { useState, useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

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
import { NotificationService } from "@/src/services/notifications";

// Mock
import { GROUP_MAIN } from "@/src/mock/questions";

// Utils
import { propertyToFormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/utils/propertyToFormData";
import { validateCaracterizacaoForm } from "./validation";
import { shouldDisableQuestion } from "./questionDisabling";
import { questionGroups } from "./questionGroups";

// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import type { QuestionnaireState, QuestionnaireActions } from "./types";

export const useQuestionnaire = (): QuestionnaireState &
  QuestionnaireActions => {
  // Hooks
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { properties, isAuthenticated } = useAuthContext();
  const { createProperty, isLoading: isCreatingProperty } = useProperty();
  const { createWaterIndicator, isLoading: isCreatingWaterIndicator } =
    useWaterIndicator();
  const { createWaterQualityConservation, isLoading: isCreatingWaterQuality } =
    useWaterQualityConservation();
  const { createWasteManagement, isLoading: isCreatingWasteManagement } =
    useWasteManagement();

  // State
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});
  const [selectedIndexes, setSelectedIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [formData, setFormData] = useState<FormData | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [hasAutoFilled, setHasAutoFilled] = useState(false);

  useEffect(() => {
    if (properties && properties.length > 0 && !hasAutoFilled) {
      const mostRecentProperty = properties[properties.length - 1];
      const initialFormData = propertyToFormData(mostRecentProperty);
      setFormData(initialFormData);
      setHasAutoFilled(true);
    }
  }, [properties, hasAutoFilled]);

  const currentGroup = questionGroups[step];

  const answer2 = answers["2"];
  const answer22 = answers["22"];

  useEffect(() => {
    if (answer2 === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "3": 0,
        "4": 0,
      }));
      setSelectedIndexes((prevIndexes) => ({
        ...prevIndexes,
        "3": 0,
        "4": 0,
      }));
    }

    if (answer22 === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "23": null,
      }));
      setSelectedIndexes((prevIndexes) => ({
        ...prevIndexes,
        "23": 0,
      }));
    }
  }, [answer2, answer22]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      OfflineSyncService.saveOfflineAnswers(answers);
    }
  }, [answers]);

  const handleSelect = useCallback(
    (id: string | number, value: number | null, index?: number) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: value,
      }));
      if (index !== undefined) {
        setSelectedIndexes((prev) => ({
          ...prev,
          [id]: index,
        }));
      }
    },
    [],
  );

  const questionDisabled = useCallback(
    (questionId: string | number) => {
      return shouldDisableQuestion(questionId, answers);
    },
    [answers],
  );

  const handleNext = useCallback(
    async (formDataOverride?: FormData | null) => {
      if (step === 0) {
        const dataToValidate = formDataOverride || formData;
        if (dataToValidate) {
          const errors = validateCaracterizacaoForm(dataToValidate, t);
          if (errors.length > 0) {
            Toast.show({
              type: "error",
              text1: t("questionnaire.questions.toasts.requiredFieldsTitle"),
              text2: `${t(
                "questionnaire.questions.toasts.fillFieldsPrefix",
              )}\n\n• ${errors.join("\n• ")}`,
              visibilityTime: 20000,
              autoHide: true,
            });
            return;
          }

          try {
            if (isOnline) {
              const response = await createProperty(dataToValidate);
              if (response?.property?.id) {
                setPropertyId(response.property.id);
                await OfflineSyncService.saveOfflinePropertyId(
                  response.property.id,
                );
              }
            } else {
              await OfflineSyncService.saveOfflineProperty(dataToValidate);
              const tempId = OfflineSyncService.generateTempPropertyId();
              setPropertyId(tempId);
              await OfflineSyncService.saveOfflinePropertyId(tempId);

              Toast.show({
                type: "info",
                text1: "Modo Offline",
                text2:
                  "Dados salvos localmente. Serão sincronizados quando houver conexão.",
                visibilityTime: 5000,
              });
            }
            setFormData(dataToValidate);
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
        return;
      }

      if (step > 0 && currentGroup) {
        const unansweredQuestions = currentGroup.filter((q) => {
          const answer = answers[q.id];
          const isAnswered = answer !== undefined || questionDisabled(q.id);
          return !isAnswered;
        });

        if (unansweredQuestions.length > 0) {
          const questionNumbers = unansweredQuestions
            .map((q) => q.id)
            .join(", ");
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
            1: GROUP_MAIN.waterIndicator,
            2: GROUP_MAIN.waterQuality,
            3: GROUP_MAIN.wasteManagement,
          };

          const groupName = groupNames[step];
          const groupTranslationKey = `questionnaire.questions.groups.${groupName}`;
          const translatedGroupName = t(groupTranslationKey);

          if (step === 1) {
            if (!propertyId) {
              Toast.show({
                type: "error",
                text1: t("common.error"),
                text2:
                  "Property ID não encontrado. Por favor, reinicie o questionário.",
                visibilityTime: 5000,
              });
              return;
            }

            const canSendToServer =
              isOnline &&
              isAuthenticated &&
              !OfflineSyncService.isTempPropertyId(propertyId);

            if (!canSendToServer) {
              Toast.show({
                type: "info",
                text1: "Modo Offline",
                text2:
                  "Respostas salvas. Aguarde conexão para ver a pontuação.",
                visibilityTime: 3000,
              });
            } else {
              try {
                const response = await createWaterIndicator(
                  answers,
                  propertyId,
                );
                const score =
                  response?.data?.finalScore?.toFixed(2).replace(".", ",") ||
                  "N/A";

                Toast.show({
                  type: "score",
                  text1: t("questionnaire.questions.toasts.scoreTitle", {
                    groupName: translatedGroupName,
                  }),
                  text2: `${score}`,
                  position: "bottom",
                  visibilityTime: 5000,
                  bottomOffset: 200,
                });
              } catch (error) {
                console.error("Erro ao criar Water Indicator:", error);
                return;
              }
            }
          }

          if (step === 2) {
            if (!propertyId) {
              Toast.show({
                type: "error",
                text1: t("common.error"),
                text2:
                  "Property ID não encontrado. Por favor, reinicie o questionário.",
                visibilityTime: 5000,
              });
              return;
            }

            // Check if can submit: must be online, authenticated AND have a valid ID (not temporary)
            const canSendWaterQuality =
              isOnline &&
              isAuthenticated &&
              !OfflineSyncService.isTempPropertyId(propertyId);

            if (!canSendWaterQuality) {
              Toast.show({
                type: "info",
                text1: "Modo Offline",
                text2:
                  "Respostas salvas. Aguarde conexão para ver a pontuação.",
                visibilityTime: 3000,
              });
            } else {
              try {
                const response = await createWaterQualityConservation(
                  answers,
                  propertyId,
                );
                const score =
                  response?.data?.finalScore?.toFixed(2).replace(".", ",") ||
                  "N/A";

                Toast.show({
                  type: "score",
                  text1: t("questionnaire.questions.toasts.scoreTitle", {
                    groupName: translatedGroupName,
                  }),
                  text2: `${score}`,
                  position: "bottom",
                  visibilityTime: 5000,
                  bottomOffset: 200,
                });
              } catch (error) {
                console.error(
                  "Erro ao criar Water Quality Conservation:",
                  error,
                );
                return;
              }
            }
          }
        }

        setStep((prev) => prev + 1);
      } else {
        const groupNames: { [key: number]: string } = {
          1: GROUP_MAIN.waterIndicator,
          2: GROUP_MAIN.waterQuality,
          3: GROUP_MAIN.wasteManagement,
        };

        const groupName = groupNames[step];
        const groupTranslationKey = `questionnaire.questions.groups.${groupName}`;
        const translatedGroupName = t(groupTranslationKey);

        if (!propertyId) {
          Toast.show({
            type: "error",
            text1: t("common.error"),
            text2:
              "Property ID não encontrado. Por favor, reinicie o questionário.",
            visibilityTime: 5000,
          });
          return;
        }

        const canSendWasteManagement =
          isOnline &&
          isAuthenticated &&
          !OfflineSyncService.isTempPropertyId(propertyId!);

        if (!canSendWasteManagement) {
          await OfflineSyncService.setPendingSync(true, true, propertyId!);
          await OfflineSyncService.markFormCompletedOffline();
          
          if (!isAuthenticated) {
            await OfflineSyncService.setOfflineMode(true);
          }

          await NotificationService.requestPermissions();

          Toast.show({
            type: "success",
            text1: "Formulário Completo",
            text2: !isAuthenticated
              ? "Dados salvos. Faça login para sincronizar com o servidor."
              : "Dados salvos offline. Serão sincronizados quando houver conexão.",
            visibilityTime: 5000,
          });

          setTimeout(() => {
            router.push("/(protected)/(tabs)/(home)");
          }, 3000);
        } else {
          try {
            const response = await createWasteManagement(answers, propertyId!);
            const score =
              response?.data?.finalScore?.toFixed(2).replace(".", ",") || "N/A";

            Toast.show({
              type: "score",
              text1: t("questionnaire.questions.toasts.scoreTitle", {
                groupName: translatedGroupName,
              }),
              text2: `${score}`,
              position: "bottom",
              visibilityTime: 5000,
              bottomOffset: 200,
            });

            setTimeout(() => {
              router.push({
                pathname: "/result",
                params: { propertyId: propertyId! },
              });
            }, 5000);
          } catch (error) {
            console.error("Erro ao criar Waste Management:", error);
            return;
          }
        }
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
    ],
  );

  const handlePrevious = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const formatDate = useCallback((rawDate: Date) => {
    const day = rawDate.getDate().toString().padStart(2, "0");
    const month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    const year = rawDate.getFullYear();
    return `${day}/${month}/${year}`;
  }, []);

  return {
    // State
    step,
    answers,
    selectedIndexes,
    formData,
    date,
    showPicker,
    isCreatingProperty,
    isCreatingWaterIndicator,
    isCreatingWaterQuality,
    isCreatingWasteManagement,
    // Actions
    setFormData,
    setDate,
    setShowPicker,
    handleSelect,
    handleNext,
    handlePrevious,
    formatDate,
    questionDisabled,
  };
};
