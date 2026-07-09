// External Libraries
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { PropertyService } from "@/src/services/api/property";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";

// Utils
import { mapFormDataToPropertyRequest } from "./mapFormDataToPropertyRequest";

// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export const useProperty = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { properties, isAuthenticated } = useAuthContext();

  const hasExistingProperty = properties && properties.length > 0;

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
          text2: t("offlineMode.dataSavedLocally"),
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
      console.error("Erro ao criar propriedade:", JSON.stringify({
        status: error?.response?.status,
        data: error?.response?.data,
        message: error?.message,
        config: {
          url: error?.config?.url,
          data: error?.config?.data,
          headers: error?.config?.headers,
        },
      }, null, 2));

      if (error.response?.status === 401 || error.response?.status === 403) {
        await OfflineSyncService.saveOfflineProperty(formData);
        const tempId = OfflineSyncService.generateTempPropertyId();
        await OfflineSyncService.setOfflineMode(true);

        Toast.show({
          type: "warning",
          text1: t("offlineMode.sessionExpired"),
          text2: t("offlineMode.savedLoginAgain"),
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
