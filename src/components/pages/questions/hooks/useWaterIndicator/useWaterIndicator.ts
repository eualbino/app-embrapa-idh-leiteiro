import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { WaterIndicatorService } from "@/src/services/api/questionnaire/water-indicator";

export const useWaterIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { isAuthenticated } = useAuthContext();

  const createWaterIndicator = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const offline = !isOnline || !isAuthenticated;
    setIsLoading(true);
    try {
      const result = await WaterIndicatorService.createWaterIndicator({
        propertyId: Number(propertyId),
        hasHydraulicMap: answers["1"] ?? 0,
        hasWaterMeasurement: answers["2"] ?? 0,
        measurementFrequency: answers["3"] ?? 0,
        monitoredConsumption: answers["4"] ?? 0,
        hasReductionGoals: answers["5"] ?? 0,
        flowControlSystem: answers["6"] ?? 0,
        levelFloatDrinkers: answers["7"] ?? 0,
        levelFloatStorage: answers["8"] ?? 0,
        leakIdentification: answers["9"] ?? 0,
        irrigationProgram: answers["10"] !== undefined ? answers["10"] : null,
        coolingSystem: answers["11"] !== undefined ? answers["11"] : null,
        rainwaterHarvest: answers["12"] ?? 0,
        waterReuse: answers["13"] ?? 0,
      }, offline);

      if (!offline) {
        Toast.show({
          type: "success",
          text1: t("common.success"),
          text2: t("questionnaire.messages.waterIndicatorSuccess") || "Indicador de água calculado com sucesso!",
        });
      }

      return result;
    } catch (error: any) {
      console.error("Erro ao salvar indicador de água:", error);

      if (!offline) {
        Toast.show({
          type: "error",
          text1: t("common.error"),
          text2: error?.message || "Erro ao salvar indicador de água",
        });
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWaterIndicator,
    isLoading,
  };
};
