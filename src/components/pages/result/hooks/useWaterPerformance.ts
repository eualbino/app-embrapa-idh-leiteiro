import { useState, useEffect } from "react";
import { WaterPerformanceIndexService } from "@/src/services/api/questionnaire";
import type { WaterPerformanceIndexData } from "@/src/services/api/questionnaire/water-performance-index/dtos";

interface UseWaterPerformanceResult {
  data: WaterPerformanceIndexData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useWaterPerformance = (
  propertyId: string | null,
): UseWaterPerformanceResult => {
  const [data, setData] = useState<WaterPerformanceIndexData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        const response =
          await WaterPerformanceIndexService.getWaterPerformanceIndex({
            propertyId,
          });
        setData(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar dados de performance:", err);
        setError(
          err?.response?.data?.message ||
            "Erro ao carregar dados de performance",
        );
        setData(null);
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
      const response =
        await WaterPerformanceIndexService.getWaterPerformanceIndex({
          propertyId,
        });
      setData(response.data);
    } catch (err: any) {
      console.error("Erro ao buscar dados de performance:", err);
      setError(
        err?.response?.data?.message || "Erro ao carregar dados de performance",
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
