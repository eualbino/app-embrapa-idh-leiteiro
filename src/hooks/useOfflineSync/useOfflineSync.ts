// External Libraries
import { useState, useEffect, useCallback, useRef } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { NotificationService } from "@/src/services/notifications";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { PropertyService } from "@/src/services/api/property";
import { WaterIndicatorService } from "@/src/services/api/questionnaire/water-indicator";
import { WasteManagementService } from "@/src/services/api/questionnaire/waste-management";
import { WaterQualityConservationService } from "@/src/services/api/questionnaire/water-quality-conservation";
import { WaterPerformanceIndexService } from "@/src/services/api/questionnaire/water-performance-index";

// Utils
import { mapFormDataToPropertyRequest } from "@/src/components/pages/questions/hooks/useProperty/mapFormDataToPropertyRequest";

// Mock
import { QUESTION_IDS } from "@/src/mock/questions";

const globalIsSyncingRef = { current: false };

export const useOfflineSync = () => {
  // Refs
  const hasSyncedRef = useRef(false);
  const syncFailedRef = useRef(false);

  // States
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasPendingData, setHasPendingData] = useState(false);

  // Hooks
  const { t } = useTranslation();
  const { isOnline, justReconnected } = useNetworkStatus();
  const { isAuthenticated, refetchUser } = useAuthContext();

  // UseEffect
  useEffect(() => {
    checkPendingData();
  }, []);

  useEffect(() => {
    if (justReconnected && !hasSyncedRef.current) {
      handleReconnection();
    }

    if (!isOnline) {
      hasSyncedRef.current = false;
      syncFailedRef.current = false;
    }
  }, [justReconnected, isOnline, isAuthenticated]);

  useEffect(() => {
    const attemptSyncAfterLogin = async () => {
      if (!isAuthenticated || !isOnline) return;
      const pendingSync = await OfflineSyncService.getPendingSync();
      if (!pendingSync?.hasAnswersToSync) return;

      syncFailedRef.current = false;
      syncOfflineData();
    };

    if (isAuthenticated && isOnline) {
      attemptSyncAfterLogin();
    }
  }, [isAuthenticated, isOnline]);

  // Functions
  const checkPendingData = async () => {
    const pendingSync = await OfflineSyncService.getPendingSync();
    setHasPendingData(
      pendingSync?.hasAnswersToSync || false,
    );
  };

  const handleReconnection = async () => {
    const pendingSync = await OfflineSyncService.getPendingSync();
    const hasDataToSync =
      pendingSync?.hasAnswersToSync;

    if (!hasDataToSync) return;

    if (!isAuthenticated) {
      return;
    }

    if (!globalIsSyncingRef.current) {
      hasSyncedRef.current = true;
      syncOfflineData();
    }
  };

  const syncWaterQualityConservation = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const data = {
      propertyId: Number(propertyId),
      monitorsQuality: answers["14"] ?? 0,
      monitoredWaterPointsPercent: answers["15"] ?? 0,
      nitrateAnalysis: answers["16"] ?? 0,
      eColiAnalysis: answers["17"] ?? 0,
      animalsAccessWaterBodies: answers["18"] ?? 0,
      drinkerWaterSupply: answers["19"] ?? 0,
      waterAccumulationAreas: answers["20"] ?? 0,
      drinkerCleaningFrequency: answers["21"] ?? 0,
    };

    await WaterQualityConservationService.createWaterQualityConservation(data);
  };

  const syncAllQuestionnaires = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const answerKeys = Object.keys(answers);
    const hasWaterIndicator = answerKeys.some((key) => QUESTION_IDS.waterIndicator.has(key));
    const hasWaterQuality = answerKeys.some((key) => QUESTION_IDS.waterQuality.has(key));
    const hasWasteManagement = answerKeys.some((key) => QUESTION_IDS.wasteManagement.has(key));

    if (hasWaterIndicator) {
      await syncWaterIndicator(answers, propertyId);
    }
    if (hasWaterQuality) {
      await syncWaterQualityConservation(answers, propertyId);
    }
    if (hasWasteManagement) {
      await syncWasteManagement(answers, propertyId);
    }
  };

  const syncWaterIndicator = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const data = {
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
    };

    await WaterIndicatorService.createWaterIndicator(data);
  };

  const forceSyncNow = useCallback(() => {
    syncFailedRef.current = false;
    if (!isAuthenticated) {
      Toast.show({
        type: "warning",
        text1: t("offlineMode.loginRequiredTitle"),
        text2: t("offlineMode.loginRequiredMessage"),
        visibilityTime: 3000,
      });
      return;
    }

    if (!isOnline) {
      Toast.show({
        type: "warning",
        text1: t("offlineMode.noConnectionTitle"),
        text2: t("offlineMode.connectToSync"),
        visibilityTime: 3000,
      });
      return;
    }

    syncOfflineData();
  }, [isOnline, isAuthenticated]);

  const syncWasteManagement = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const data = {
      propertyId: Number(propertyId),
      wasteStorageSystem: answers["22"] ?? 0,
      impermeabilizedSystem: answers["23"] ?? 0,
      rainwaterDiverted: answers["24"] ?? 0,
      systemLeaks: answers["25"] ?? 0,
      roofGutters: answers["26"] ?? 0,
      floorWashingPercentage: answers["27"] ?? 0,
      manureRaking: answers["28"] ?? 0,
      pressureWashing: answers["29"] ?? 0,
      emergencyPlan: answers["30"] ?? 0,
      fertilizerDocumentation: answers["31"] ?? 0,
      organicResidueLab: answers["32"] ?? 0,
      soilAnalysis: answers["33"] ?? 0,
      residueApplicationFrequency: answers["34"] ?? 0,
      residueApplicationMethod: answers["35"] ?? 0,
    };

    await WasteManagementService.createWasteManagement(data);
  };

  const syncOfflineData = async () => {
    if (!isOnline) return;
    if (syncFailedRef.current) return;
    if (!isAuthenticated) {
      Toast.show({
        type: "warning",
        text1: t("offlineMode.loginRequiredTitle"),
        text2: t("offlineMode.loginRequiredMessage"),
        visibilityTime: 3000,
      });
      return;
    }
    if (globalIsSyncingRef.current) return;

    setIsSyncing(true);
    globalIsSyncingRef.current = true;

    try {
      const pendingSync = await OfflineSyncService.getPendingSync();

      if (!pendingSync) {
        return;
      }

      let propertyId = pendingSync.propertyId;

      if (propertyId && OfflineSyncService.isTempPropertyId(propertyId)) {
        const offlineProperty = await OfflineSyncService.getOfflineProperty();

        if (!offlineProperty) {
          throw new Error("Dados da propriedade offline não encontrados no SQLite");
        }

        const propertyData = mapFormDataToPropertyRequest(offlineProperty.formData);

        const response = await PropertyService.createProperty(propertyData);

        const realId = response?.property?.id;

        if (!realId) {
          throw new Error(`Backend não retornou ID da propriedade. Resposta: ${JSON.stringify(response)}`);
        }

        propertyId = String(realId);

        await OfflineSyncService.saveOfflinePropertyId(propertyId);
        await OfflineSyncService.setPendingSync(false, pendingSync.hasAnswersToSync, propertyId);
      }

      if (propertyId && !OfflineSyncService.isTempPropertyId(propertyId)) {
        const validPropertyId = propertyId;
        const offlineAnswers = await OfflineSyncService.getOfflineAnswers();

        if (!offlineAnswers) {
          console.warn("[Sync] estado órfão: pendingSync existe mas não há respostas no SQLite");
          await OfflineSyncService.clearOfflineData();
          await OfflineSyncService.clearFormCompletedOffline();
          await NotificationService.clearNotificationScheduled();
          setHasPendingData(false);
          return;
        }

        await syncAllQuestionnaires(offlineAnswers.answers, validPropertyId);

        try {
          const offlineScores = await OfflineSyncService.getOfflineScores();
          if (offlineScores) {
            await WaterPerformanceIndexService.createWaterPerformanceIndex({
              propertyId: Number(validPropertyId),
              waterManagementScore: offlineScores.macroIndicators.quantidadeAgua,
              waterQualityConservationScore: offlineScores.macroIndicators.qualidadeAgua,
              wasteManagementScore: offlineScores.macroIndicators.manejoResiduos,
              finalScore: offlineScores.finalScore,
            });
          }
        } catch (e) {
          console.error("[Sync] Não foi possível salvar o WPI:", e);
        }

        await OfflineSyncService.clearOfflineData();
        await OfflineSyncService.clearFormCompletedOffline();
        await NotificationService.clearNotificationScheduled();
        setHasPendingData(false);

        Toast.show({
          type: "success",
          text1: t("offlineMode.syncComplete"),
          text2: t("offlineMode.syncCompleteMessage"),
          visibilityTime: 3000,
        });

        refetchUser().catch(console.error);
      }
    } catch (error: any) {
      syncFailedRef.current = true;
      console.error("[Sync] ERRO:", error?.message ?? error, "\nStack:", error?.stack);
      console.error("[Sync] Detalhes API:", JSON.stringify({
        status: error?.response?.status,
        data: error?.response?.data,
        url: error?.config?.url,
        requestData: error?.config?.data,
      }, null, 2));
      const apiError =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      const errorDetail = apiError
        ? String(apiError).substring(0, 120)
        : t("offlineMode.syncErrorMessage");
      Toast.show({
        type: "error",
        text1: t("offlineMode.syncError"),
        text2: errorDetail,
        visibilityTime: 8000,
      });
    } finally {
      setIsSyncing(false);
      globalIsSyncingRef.current = false;
    }
  };

  return {
    isSyncing,
    hasPendingData,
    syncOfflineData,
    forceSyncNow,
    isOnline,
    isAuthenticated,
  };
};
