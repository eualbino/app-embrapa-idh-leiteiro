// External Libraries
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import type { TFunction } from "i18next";

// Services
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { NotificationService } from "@/src/services/notifications";

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

  if (!canNavigateToResult) {
    await OfflineSyncService.setPendingSync(true, true, propertyId);
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
