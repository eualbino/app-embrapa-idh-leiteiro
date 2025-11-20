import { useState } from "react";
import { WaterIndicatorService, CreateWaterIndicatorRequest } from "@/src/services/api/questionnaire/water-indicator";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

export const useWaterIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const mapAnswersToWaterIndicator = (
    answers: { [key: string]: number | null },
    propertyId: string
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
    propertyId: string
  ) => {
    setIsLoading(true);
    try {
      const waterIndicatorData = mapAnswersToWaterIndicator(answers, propertyId);
      const response = await WaterIndicatorService.createWaterIndicator(waterIndicatorData);
      
      Toast.show({
        type: "success",
        text1: t("common.success"),
        text2: response.message || "Indicador de água criado com sucesso!",
      });
      
      return response;
    } catch (error: any) {
      console.error("Erro ao criar indicador de água:", error);
      
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: error.response?.data?.message || "Erro ao criar indicador de água",
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
