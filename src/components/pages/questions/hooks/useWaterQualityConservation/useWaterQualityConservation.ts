import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { WaterQualityConservationService } from "@/src/services/api/questionnaire/water-quality-conservation";

export const useWaterQualityConservation = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { isOnline } = useNetworkStatus();
  const { isAuthenticated } = useAuthContext();

  const createWaterQualityConservation = async (
    answers: Record<number, number | null>,
    propertyId: string,
  ) => {
    const offline = !isOnline || !isAuthenticated;
    setIsLoading(true);
    try {
      const result = await WaterQualityConservationService.createWaterQualityConservation({
        propertyId: Number(propertyId),
        monitorsQuality: answers[14] ?? 0,
        monitoredWaterPointsPercent: answers[15] !== undefined ? (answers[15] ?? 0) : 0,
        nitrateAnalysis: answers[16] !== undefined ? (answers[16] ?? 0) : 0,
        eColiAnalysis: answers[17] !== undefined ? (answers[17] ?? 0) : 0,
        animalsAccessWaterBodies: answers[18] ?? 0,
        drinkerWaterSupply: answers[19] ?? 0,
        waterAccumulationAreas: answers[20] ?? 0,
        drinkerCleaningFrequency: answers[21] ?? 0,
      }, offline);

      if (!offline) {
        Toast.show({
          type: "success",
          text1: t("questionnaire.messages.waterQualitySuccess"),
        });
      }

      return result;
    } catch (error) {
      console.error("Erro ao salvar Water Quality Conservation:", error);
      if (!offline) {
        Toast.show({
          type: "error",
          text1: t("questionnaire.messages.waterQualityError"),
        });
      }
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
