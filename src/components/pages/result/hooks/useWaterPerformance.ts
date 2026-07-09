import { useState, useEffect } from "react";
import { WaterPerformanceIndexService } from "@/src/services/api/questionnaire";
import type { WaterPerformanceIndexData } from "@/src/services/api/questionnaire/water-performance-index/dtos";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";

interface UseWaterPerformanceResult {
  data: WaterPerformanceIndexData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

async function loadData(
  propertyId: string,
): Promise<{ data: WaterPerformanceIndexData }> {
  // Tenta dados locais primeiro (sempre populados após o formulário)
  const offlineScores = await OfflineSyncService.getOfflineScores();
  const offlinePropertyId = await OfflineSyncService.getOfflinePropertyId();

  const isMatchingPropertyId =
    offlineScores?.propertyId === propertyId ||
    offlinePropertyId === propertyId ||
    offlineScores?.propertyId === offlinePropertyId;

  const isRecentScore =
    offlineScores && Date.now() - offlineScores.timestamp < 24 * 60 * 60 * 1000;

  if (offlineScores && (isMatchingPropertyId || isRecentScore)) {
    return {
      data: {
        propertyId: offlineScores.propertyId,
        finalScore: offlineScores.finalScore,
        macroIndicators: offlineScores.macroIndicators,
        weights: offlineScores.weights ?? {
          quantidadeAgua: 0.361,
          qualidadeAgua: 0.322,
          manejoResiduos: 0.317,
        },
        details: offlineScores.details ?? {
          waterManagement: null,
          waterQualityConservation: null,
          wasteManagement: null,
        },
      },
    };
  }

  const response = await WaterPerformanceIndexService.getWaterPerformanceIndex({
    propertyId: Number(propertyId),
  });
  return { data: response.data };
}

export const useWaterPerformance = (
  propertyId: string | null,
): UseWaterPerformanceResult => {
  const [data, setData] = useState<WaterPerformanceIndexData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!propertyId) {
      setIsLoading(false);
      setError("ID da propriedade não fornecido");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const { data: result } = await loadData(propertyId);
      setData(result);
    } catch (err: any) {
      console.error("Erro ao buscar dados de performance:", err);
      setError(
        err?.response?.data?.message ||
          "Erro ao carregar dados de performance. Verifique sua conexão.",
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyId]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
