import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { WasteManagementService } from "@/src/services/api/questionnaire/waste-management";

export const useWasteManagement = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { isOnline } = useNetworkStatus();
  const { isAuthenticated } = useAuthContext();

  const createWasteManagement = async (
    answers: Record<number, number | null>,
    propertyId: string,
  ) => {
    const offline = !isOnline || !isAuthenticated;
    setIsLoading(true);
    try {
      const result = await WasteManagementService.createWasteManagement({
        propertyId: Number(propertyId),
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
      }, offline);

      if (!offline) {
        Toast.show({
          type: "success",
          text1: t("questionnaire.messages.wasteManagementSuccess"),
        });
      }

      return result;
    } catch (error) {
      console.error("Erro ao salvar Waste Management:", error);
      if (!offline) {
        Toast.show({
          type: "error",
          text1: t("questionnaire.messages.wasteManagementError"),
        });
      }
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
