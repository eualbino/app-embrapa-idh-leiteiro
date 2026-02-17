import { useState, useEffect } from "react";
import { WaterPerformanceIndexService } from "@/src/services/api/questionnaire";
import type { WaterPerformanceIndexData } from "@/src/services/api/questionnaire/water-performance-index/dtos";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";

interface UseWaterPerformanceResult {
  data: WaterPerformanceIndexData | null;
  isLoading: boolean;
  error: string | null;
  isOfflineData: boolean;
  refetch: () => void;
}

export const useWaterPerformance = (
  propertyId: string | null,
): UseWaterPerformanceResult => {
  const [data, setData] = useState<WaterPerformanceIndexData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineData, setIsOfflineData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!propertyId) {
        setIsLoading(false);
        setError("ID da propriedade não fornecido");
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setIsOfflineData(false);

        const response =
          await WaterPerformanceIndexService.getWaterPerformanceIndex({
            propertyId,
          });
        setData(response.data);

        // Salvar scores offline para uso futuro
        await OfflineSyncService.saveOfflineScores(
          response.data.propertyId,
          response.data.finalScore,
          response.data.macroIndicators,
          response.data.weights,
          response.data.details,
        );
      } catch (err: any) {
        console.error("Erro ao buscar dados de performance:", err);

        // Tentar carregar dados offline como fallback
        try {
          const offlineScores = await OfflineSyncService.getOfflineScores();
          const offlinePropertyId =
            await OfflineSyncService.getOfflinePropertyId();

          // Aceitar scores offline se:
          // 1. O propertyId coincidir exatamente, OU
          // 2. O propertyId salvo offline coincidir (para casos de sync pendente), OU
          // 3. Existem scores offline recentes (últimas 24h) como fallback
          const isMatchingPropertyId =
            offlineScores?.propertyId === propertyId ||
            offlinePropertyId === propertyId ||
            offlineScores?.propertyId === offlinePropertyId;

          const isRecentScore =
            offlineScores &&
            Date.now() - offlineScores.timestamp < 24 * 60 * 60 * 1000;

          if (offlineScores && (isMatchingPropertyId || isRecentScore)) {
            const offlineData: WaterPerformanceIndexData = {
              propertyId: offlineScores.propertyId,
              finalScore: offlineScores.finalScore,
              macroIndicators: offlineScores.macroIndicators,
              weights: offlineScores.weights || {
                quantidadeAgua: 0,
                qualidadeAgua: 0,
                manejoResiduos: 0,
              },
              details: offlineScores.details || {
                waterManagement: null,
                waterQualityConservation: null,
                wasteManagement: null,
              },
            };
            setData(offlineData);
            setIsOfflineData(true);
            setError(null);
          } else {
            // Não há dados offline disponíveis para esta propriedade
            setError(
              err?.response?.data?.message ||
                "Erro ao carregar dados de performance. Verifique sua conexão.",
            );
            setData(null);
          }
        } catch (offlineErr) {
          console.error("Erro ao recuperar dados offline:", offlineErr);
          setError(
            err?.response?.data?.message ||
              "Erro ao carregar dados de performance",
          );
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  const refetch = async () => {
    if (!propertyId) {
      setIsLoading(false);
      setError("ID da propriedade não fornecido");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setIsOfflineData(false);

      const response =
        await WaterPerformanceIndexService.getWaterPerformanceIndex({
          propertyId,
        });
      setData(response.data);

      // Salvar scores offline para uso futuro
      await OfflineSyncService.saveOfflineScores(
        response.data.propertyId,
        response.data.finalScore,
        response.data.macroIndicators,
        response.data.weights,
        response.data.details,
      );
    } catch (err: any) {
      console.error("Erro ao buscar dados de performance:", err);

      // Tentar carregar dados offline como fallback
      try {
        const offlineScores = await OfflineSyncService.getOfflineScores();
        const offlinePropertyId =
          await OfflineSyncService.getOfflinePropertyId();

        // Aceitar scores offline se:
        // 1. O propertyId coincidir exatamente, OU
        // 2. O propertyId salvo offline coincidir (para casos de sync pendente), OU
        // 3. Existem scores offline recentes (últimas 24h) como fallback
        const isMatchingPropertyId =
          offlineScores?.propertyId === propertyId ||
          offlinePropertyId === propertyId ||
          offlineScores?.propertyId === offlinePropertyId;

        const isRecentScore =
          offlineScores &&
          Date.now() - offlineScores.timestamp < 24 * 60 * 60 * 1000;

        if (offlineScores && (isMatchingPropertyId || isRecentScore)) {
          const offlineData: WaterPerformanceIndexData = {
            propertyId: offlineScores.propertyId,
            finalScore: offlineScores.finalScore,
            macroIndicators: offlineScores.macroIndicators,
            weights: offlineScores.weights || {
              quantidadeAgua: 0,
              qualidadeAgua: 0,
              manejoResiduos: 0,
            },
            details: offlineScores.details || {
              waterManagement: null,
              waterQualityConservation: null,
              wasteManagement: null,
            },
          };
          setData(offlineData);
          setIsOfflineData(true);
          setError(null);
        } else {
          setError(
            err?.response?.data?.message ||
              "Erro ao carregar dados de performance. Verifique sua conexão.",
          );
          setData(null);
        }
      } catch (offlineErr) {
        console.error("Erro ao recuperar dados offline:", offlineErr);
        setError(
          err?.response?.data?.message ||
            "Erro ao carregar dados de performance",
        );
        setData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    isOfflineData,
    refetch,
  };
};
