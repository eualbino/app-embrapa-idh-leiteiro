import { useState, useEffect, useCallback } from "react";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { PropertyService } from "@/src/services/api/property";
import { WaterIndicatorService } from "@/src/services/api/questionnaire/water-indicator";
import { WaterQualityConservationService } from "@/src/services/api/questionnaire/water-quality-conservation";
import { WasteManagementService } from "@/src/services/api/questionnaire/waste-management";
import Toast from "react-native-toast-message";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export const useOfflineSync = () => {
  const { isOnline, justReconnected } = useNetworkStatus();
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasPendingData, setHasPendingData] = useState(false);

  useEffect(() => {
    checkPendingData();
  }, []);

  useEffect(() => {
    if (justReconnected && !isSyncing) {
      syncOfflineData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justReconnected, isSyncing]);

  const checkPendingData = async () => {
    const pendingSync = await OfflineSyncService.getPendingSync();
    setHasPendingData(
      pendingSync?.hasPropertyToSync || pendingSync?.hasAnswersToSync || false,
    );
  };

  const syncOfflineData = async () => {
    if (!isOnline || isSyncing) {
      return;
    }

    setIsSyncing(true);

    try {
      const pendingSync = await OfflineSyncService.getPendingSync();

      if (!pendingSync) {
        console.log("Nenhum dado pendente para sincronizar");
        setIsSyncing(false);
        return;
      }

      let propertyId = pendingSync.propertyId;

      if (pendingSync.hasPropertyToSync) {
        const offlineProperty = await OfflineSyncService.getOfflineProperty();

        if (offlineProperty) {
          console.log("🔄 Sincronizando propriedade...");

          try {
            const response = await createPropertyFromFormData(
              offlineProperty.formData,
            );

            if (response?.property?.id) {
              propertyId = response.property.id;
              await OfflineSyncService.saveOfflinePropertyId(propertyId);
              await OfflineSyncService.clearOfflineProperty();

              console.log("✅ Propriedade sincronizada com sucesso!");

              Toast.show({
                type: "success",
                text1: "Sincronização",
                text2: "Propriedade criada com sucesso!",
                visibilityTime: 3000,
              });
            }
          } catch (error) {
            console.error("❌ Erro ao sincronizar propriedade:", error);
            throw error;
          }
        }
      }

      if (propertyId && !OfflineSyncService.isTempPropertyId(propertyId)) {
        const offlineAnswers = await OfflineSyncService.getOfflineAnswers();

        if (offlineAnswers) {
          console.log("🔄 Sincronizando respostas...");

          try {
            await syncAllQuestionnaires(offlineAnswers.answers, propertyId);

            console.log("✅ Respostas sincronizadas com sucesso!");

            Toast.show({
              type: "success",
              text1: "Sincronização Completa",
              text2: "Todos os dados foram sincronizados!",
              visibilityTime: 3000,
            });

            await OfflineSyncService.clearOfflineData();
            setHasPendingData(false);
          } catch (error) {
            console.error("❌ Erro ao sincronizar respostas:", error);
            throw error;
          }
        }
      }
    } catch (error) {
      console.error("❌ Erro durante sincronização:", error);

      Toast.show({
        type: "error",
        text1: "Erro na Sincronização",
        text2: "Não foi possível sincronizar os dados. Tentaremos novamente.",
        visibilityTime: 5000,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const createPropertyFromFormData = async (formData: FormData) => {
    const propertyData = mapFormDataToPropertyRequest(formData);
    return await PropertyService.createProperty(propertyData);
  };

  const mapFormDataToPropertyRequest = (formData: FormData) => {
    let productionSystem:
      | "PASTO"
      | "PASTO_SUPLEMENTACAO"
      | "CONFINADO"
      | "CONFINADO_MISTO"
      | "OUTRO" = "PASTO";

    switch (formData.sistemaProducao.tipo) {
      case "exclusivamente_pasto":
        productionSystem = "PASTO";
        break;
      case "pasto_suplementacao":
        productionSystem = "PASTO_SUPLEMENTACAO";
        break;
      case "confinado_sem_pasto":
        productionSystem = "CONFINADO";
        break;
      case "confinado_vacas_lactacao":
        productionSystem = "CONFINADO_MISTO";
        break;
      case "outro":
        productionSystem = "OUTRO";
        break;
    }

    const feedUnit: "MATERIA_NATURAL" | "MATERIA_SECA" =
      formData.consumoDiario.unidadeInformada === "materia_natural"
        ? "MATERIA_NATURAL"
        : "MATERIA_SECA";

    const mapLicenseStatus = (status: string): "SIM" | "NAO" | "DISPENSA" => {
      const normalizedStatus = status.toLowerCase().trim();

      if (normalizedStatus === "sim") {
        return "SIM";
      }
      if (normalizedStatus === "nao") {
        return "NAO";
      }
      if (normalizedStatus === "nao_se_aplica") {
        return "DISPENSA";
      }

      return "DISPENSA";
    };

    return {
      country: formData.localizacao.pais,
      state: formData.localizacao.estado,
      city: formData.localizacao.cidade,
      productionSystem,
      totalAreaHa: formData.area.propriedade,
      pastureAreaHa: formData.area.pastagem,
      silageAreaHa: formData.area.silagem,
      lactatingCows: formData.rebanho.vacasLactacao,
      dryCows: formData.rebanho.vacasSecas,
      heifersOver12M: formData.rebanho.novilhas,
      calvesUnder12M: formData.rebanho.bezerros,
      steers: formData.rebanho.garrotes,
      bulls: formData.rebanho.bulls,
      milkLitersPerDayProperty: formData.producaoLeiteira.litrosDiaPropriedade,
      milkLitersPerCowDay: formData.producaoLeiteira.litrosVacaDia,
      milkFatPercentage: formData.composicaoLeite.percentualGordura,
      milkProteinPercentage: formData.composicaoLeite.percentualProteina,
      roughageKgPerCow: formData.consumoDiario.volumoso,
      concentrateKgPerCow: formData.consumoDiario.concentrado,
      feedUnit,
      monthlyEnergyKWh: formData.energiaEletrica.consumoMensal,
      hasPhotovoltaicEnergy:
        formData.energiaEletrica.temEnergiaFotovoltaica === true,
      hasEnvironmentalLicense: mapLicenseStatus(
        formData.legislacaoAmbiental.temLicencaAmbiental,
      ),
      hasWaterGrant: mapLicenseStatus(
        formData.legislacaoAmbiental.temOutorgaAgua,
      ),
    };
  };

  const syncAllQuestionnaires = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    // Water Indicator (perguntas 1-13)
    const hasWaterIndicator = Object.keys(answers).some(
      (key) => parseInt(key) >= 1 && parseInt(key) <= 13,
    );

    // Water Quality Conservation (perguntas 14-21)
    const hasWaterQuality = Object.keys(answers).some(
      (key) => parseInt(key) >= 14 && parseInt(key) <= 21,
    );

    // Waste Management (perguntas 22+)
    const hasWasteManagement = Object.keys(answers).some(
      (key) => parseInt(key) >= 22,
    );

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

    await WaterIndicatorService.createWaterIndicator(data);
  };

  const syncWaterQualityConservation = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const data = {
      propertyId,
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

  const syncWasteManagement = async (
    answers: { [key: string]: number | null },
    propertyId: string,
  ) => {
    const data = {
      propertyId,
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

  const forceSyncNow = useCallback(() => {
    if (isOnline) {
      syncOfflineData();
    } else {
      Toast.show({
        type: "warning",
        text1: "Sem conexão",
        text2: "Conecte-se à internet para sincronizar",
        visibilityTime: 3000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  return {
    isSyncing,
    hasPendingData,
    syncOfflineData,
    forceSyncNow,
    isOnline,
  };
};
