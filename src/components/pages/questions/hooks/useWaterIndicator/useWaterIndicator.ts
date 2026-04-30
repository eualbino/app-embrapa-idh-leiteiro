import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { calculateWaterIndicator } from "@/src/utils/calculations";
import type { CreateWaterIndicatorRequest } from "@/src/services/api/questionnaire/water-indicator/dtos";

export const useWaterIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const mapAnswersToWaterIndicator = (
    answers: { [key: string]: number | null },
    propertyId: string,
  ): CreateWaterIndicatorRequest => {
    return {
      propertyId,
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
    };
  };

  const createWaterIndicator = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    setIsLoading(true);
    try {
      const request = mapAnswersToWaterIndicator(answers, propertyId);
      const { propertyId: _pid, ...input } = request;
      const result = calculateWaterIndicator(input);

      Toast.show({
        type: "success",
        text1: t("common.success"),
        text2: t("questionnaire.messages.waterIndicatorSuccess") || "Indicador de água calculado com sucesso!",
      });

      return { message: "ok", data: { propertyId, ...result } };
    } catch (error: any) {
      console.error("Erro ao calcular indicador de água:", error);

      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: error?.message || "Erro ao calcular indicador de água",
      });

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
