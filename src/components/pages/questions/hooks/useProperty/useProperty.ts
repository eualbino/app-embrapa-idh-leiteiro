import { useState } from "react";
import {
  PropertyService,
  CreatePropertyRequest,
} from "@/src/services/api/property";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { useAuthContext } from "@/src/contexts/AuthContext";

export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { properties, isAuthenticated } = useAuthContext();

  const hasExistingProperty = properties && properties.length > 0;

  const mapFormDataToPropertyRequest = (
    formData: FormData,
  ): CreatePropertyRequest => {
    let productionSystem: CreatePropertyRequest["productionSystem"] = "PASTO";

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

    const mapLicenseStatus = (
      status: string | null,
    ): "SIM" | "NAO" | "DISPENSA" => {
      if (!status) {
        return "DISPENSA";
      }
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

    const mappedData = {
      country: formData.localizacao.pais,
      state: formData.localizacao.estado || "",
      city: formData.localizacao.cidade || "",
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

    return mappedData;
  };

  const createProperty = async (formData: FormData) => {
    setIsLoading(true);
    try {
      if (!isOnline || !isAuthenticated) {
        await OfflineSyncService.saveOfflineProperty(formData);
        const tempId = OfflineSyncService.generateTempPropertyId();

        if (!isAuthenticated) {
          await OfflineSyncService.setOfflineMode(true);
        }

        Toast.show({
          type: "info",
          text1: t("common.offline"),
          text2:
            "Dados salvos localmente. Serão sincronizados quando houver conexão.",
          visibilityTime: 4000,
        });

        return {
          property: {
            id: tempId,
          },
        };
      }

      const propertyData = mapFormDataToPropertyRequest(formData);
      const response = await PropertyService.createProperty(propertyData);

      Toast.show({
        type: "success",
        text1: t("common.success"),
        text2: hasExistingProperty
          ? t("questionnaire.propertyUpdatedSuccess")
          : t("questionnaire.propertyCreatedSuccess"),
      });

      return response;
    } catch (error: any) {
      console.error("Erro ao criar propriedade:", error);

      // Se deu erro de autenticação (401/403), salvar offline
      if (error.response?.status === 401 || error.response?.status === 403) {
        await OfflineSyncService.saveOfflineProperty(formData);
        const tempId = OfflineSyncService.generateTempPropertyId();
        await OfflineSyncService.setOfflineMode(true);

        Toast.show({
          type: "warning",
          text1: "Sessão expirada",
          text2:
            "Dados salvos localmente. Faça login novamente para sincronizar.",
          visibilityTime: 5000,
        });

        return {
          property: {
            id: tempId,
          },
        };
      }

      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: error.response?.data?.message || "Erro ao criar propriedade",
      });

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProperty,
    isLoading,
  };
};
