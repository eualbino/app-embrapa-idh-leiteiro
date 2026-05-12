import type {
  WaterPerformanceIndexData,
} from "@/src/services/api/questionnaire/water-performance-index/dtos";
import { roundToTwo } from "./roundToTwo";

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
    finalScore: roundToTwo(finalScore) as number,
    macroIndicators: {
      quantidadeAgua: roundToTwo(quantidadeAgua) as number,
      qualidadeAgua: roundToTwo(qualidadeAgua) as number,
      manejoResiduos: roundToTwo(manejoResiduos) as number,
    },
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
