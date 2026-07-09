// External Libraries
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import type { TFunction } from "i18next";

// Services
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { NotificationService } from "@/src/services/notifications";
import { WaterPerformanceIndexService } from "@/src/services/api/questionnaire/water-performance-index";

// Utils
import { calculateWaterPerformanceIndex } from "@/src/utils/calculations";

type IndicatorFn = (
  answers: { [key: string]: number | null },
  propertyId: string,
) => Promise<{ data?: { finalScore?: number | null } } | undefined>;

interface Params {
  propertyId: string;
  answers: { [key: string]: number | null };
  isOnline: boolean;
  isAuthenticated: boolean;
  waterIndicatorScore: number;
  waterQualityScore: number;
  createWasteManagement: IndicatorFn;
  translatedGroupName: string;
  t: TFunction;
}

export async function handleWasteManagementStep({
  propertyId,
  answers,
  isOnline,
  isAuthenticated,
  waterIndicatorScore,
  waterQualityScore,
  createWasteManagement,
  translatedGroupName,
  t,
}: Params): Promise<void> {
  const response = await createWasteManagement(answers, propertyId);
  const wasteScore = response?.data?.finalScore ?? 0;

  const wpi = calculateWaterPerformanceIndex(
    waterIndicatorScore,
    waterQualityScore,
    wasteScore,
    propertyId,
  );

  await OfflineSyncService.saveOfflineScores(
    propertyId,
    wpi.finalScore,
    wpi.macroIndicators,
    wpi.weights,
    wpi.details,
  );

  const canNavigateToResult =
    isOnline &&
    isAuthenticated &&
    !OfflineSyncService.isTempPropertyId(propertyId);

  if (canNavigateToResult) {
    try {
      await WaterPerformanceIndexService.createWaterPerformanceIndex({
        propertyId: Number(propertyId),
        waterManagementScore: wpi.macroIndicators.quantidadeAgua,
        waterQualityConservationScore: wpi.macroIndicators.qualidadeAgua,
        wasteManagementScore: wpi.macroIndicators.manejoResiduos,
        finalScore: wpi.finalScore,
      });
    } catch (e) {
      console.error("Não foi possível salvar o WPI:", e);
    }
  }

  if (!canNavigateToResult) {
    await OfflineSyncService.setPendingSync(true, true, propertyId);
    await OfflineSyncService.markFormCompletedOffline();

    if (!isAuthenticated) {
      await OfflineSyncService.setOfflineMode(true);
    }

    await NotificationService.requestPermissions();

    Toast.show({
      type: "success",
      text1: t("offlineMode.formCompleteTitle"),
      text2: !isAuthenticated
        ? t("offlineMode.savedLoginToSync")
        : t("offlineMode.savedWillSync"),
      visibilityTime: 5000,
    });

    setTimeout(() => router.push("/(protected)/(tabs)/(home)"), 5500);
  } else {
    Toast.show({
      type: "score",
      text1: t("questionnaire.questions.toasts.scoreTitle", {
        groupName: translatedGroupName,
      }),
      text2: wasteScore.toFixed(2).replace(".", ","),
      position: "bottom",
      visibilityTime: 5000,
      bottomOffset: 200,
    });

    setTimeout(
      () =>
        router.push({
          pathname: "/result",
          params: { propertyId },
        }),
      5500,
    );
  }
}
