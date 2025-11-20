import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WaterQualityConservationService } from "@/src/services/api/questionnaire/water-quality-conservation/water-quality-conservation.service";
import { CreateWaterQualityConservationRequest } from "@/src/services/api/questionnaire/water-quality-conservation/dtos";
import Toast from "react-native-toast-message";

export const useWaterQualityConservation = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const mapAnswersToWaterQualityConservation = (
    answers: Record<number, number | null>,
    propertyId: string
  ): CreateWaterQualityConservationRequest => {
    return {
      propertyId,
      monitorsQuality: answers[14] ?? 0,
      monitoredWaterPointsPercent: answers[15] ?? 0,
      nitrateAnalysis: answers[16] ?? 0,
      eColiAnalysis: answers[17] ?? 0,
      animalsAccessWaterBodies: answers[18] ?? 0,
      drinkerWaterSupply: answers[19] ?? 0,
      waterAccumulationAreas: answers[20] ?? 0,
      drinkerCleaningFrequency: answers[21] ?? 0,
    };
  };

  const createWaterQualityConservation = async (
    answers: Record<number, number | null>,
    propertyId: string
  ) => {
    setIsLoading(true);
    try {
      const data = mapAnswersToWaterQualityConservation(answers, propertyId);
      const response =
        await WaterQualityConservationService.createWaterQualityConservation(
          data
        );

      Toast.show({
        type: "success",
        text1: t("questionnaire.messages.waterQualitySuccess"),
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar Water Quality Conservation:", error);
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
