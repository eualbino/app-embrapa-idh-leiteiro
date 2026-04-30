import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { calculateWasteManagement } from "@/src/utils/calculations";

export const useWasteManagement = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const createWasteManagement = async (
    answers: Record<number, number | null>,
    propertyId: string,
  ) => {
    setIsLoading(true);
    try {
      const input = {
        wasteStorageSystem: answers[22] ?? 0,
        impermeabilizedSystem: answers[23] ?? 0,
        rainwaterDiverted: answers[24] ?? 0,
        systemLeaks: answers[25] ?? 0,
        roofGutters: answers[26] ?? 0,
        floorWashingPercentage: answers[27] ?? 0,
        manureRaking: answers[28] ?? 0,
        pressureWashing: answers[29] ?? 0,
        emergencyPlan: answers[30] ?? 0,
        fertilizerDocumentation: answers[31] ?? 0,
        organicResidueLab: answers[32] ?? 0,
        soilAnalysis: answers[33] ?? 0,
        residueApplicationFrequency: answers[34] ?? 0,
        residueApplicationMethod: answers[35] ?? 0,
      };

      const result = calculateWasteManagement(input);

      Toast.show({
        type: "success",
        text1: t("questionnaire.messages.wasteManagementSuccess"),
      });

      return { message: "ok", data: { propertyId, ...result } };
    } catch (error) {
      console.error("Erro ao calcular Waste Management:", error);
      Toast.show({
        type: "error",
        text1: t("questionnaire.messages.wasteManagementError"),
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWasteManagement,
    isLoading,
  };
};
