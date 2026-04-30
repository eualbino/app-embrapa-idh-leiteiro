import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { calculateWaterQualityConservation } from "@/src/utils/calculations";

export const useWaterQualityConservation = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const createWaterQualityConservation = async (
    answers: Record<number, number | null>,
    propertyId: string,
  ) => {
    setIsLoading(true);
    try {
      const input = {
        monitorsQuality: answers[14] ?? 0,
        // Q15-Q17 opcionais: mantém null se a resposta for null explicitamente
        monitoredWaterPointsPercent:
          answers[15] !== undefined ? answers[15] : null,
        nitrateAnalysis: answers[16] !== undefined ? answers[16] : null,
        eColiAnalysis: answers[17] !== undefined ? answers[17] : null,
        animalsAccessWaterBodies: answers[18] ?? 0,
        drinkerWaterSupply: answers[19] ?? 0,
        waterAccumulationAreas: answers[20] ?? 0,
        drinkerCleaningFrequency: answers[21] ?? 0,
      };

      const result = calculateWaterQualityConservation(input);

      Toast.show({
        type: "success",
        text1: t("questionnaire.messages.waterQualitySuccess"),
      });

      return { message: "ok", data: { propertyId, ...result } };
    } catch (error) {
      console.error("Erro ao calcular Water Quality Conservation:", error);
      Toast.show({
        type: "error",
        text1: t("questionnaire.messages.waterQualityError"),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWaterQualityConservation,
    isLoading,
  };
};
