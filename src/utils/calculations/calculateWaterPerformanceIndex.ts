import type {
  WaterPerformanceIndexData,
} from "@/src/services/api/questionnaire/water-performance-index/dtos";

export function calculateWaterPerformanceIndex(
  quantidadeAgua: number,
  qualidadeAgua: number,
  manejoResiduos: number,
  propertyId: string,
): WaterPerformanceIndexData {
  const finalScore =
    quantidadeAgua * 0.361 + qualidadeAgua * 0.322 + manejoResiduos * 0.317;

  return {
    propertyId,
    finalScore,
    macroIndicators: { quantidadeAgua, qualidadeAgua, manejoResiduos },
    weights: {
      quantidadeAgua: 0.361,
      qualidadeAgua: 0.322,
      manejoResiduos: 0.317,
    },
    details: {
      waterManagement: null,
      waterQualityConservation: null,
      wasteManagement: null,
    },
  };
}
