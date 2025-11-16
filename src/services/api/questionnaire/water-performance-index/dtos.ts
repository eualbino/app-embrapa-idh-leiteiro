export interface GetWaterPerformanceIndexParams {
  propertyId: string;
}

export interface WaterPerformanceMacroIndicators {
  quantidadeAgua: number;
  qualidadeAgua: number;
  manejoResiduos: number;
}

export interface WaterPerformanceWeights {
  quantidadeAgua: number;
  qualidadeAgua: number;
  manejoResiduos: number;
}

export interface WaterPerformanceDetails {
  waterManagement: object | null;
  waterQualityConservation: object | null;
  wasteManagement: object | null;
}

export interface WaterPerformanceIndexData {
  propertyId: string;
  finalScore: number;
  macroIndicators: WaterPerformanceMacroIndicators;
  weights: WaterPerformanceWeights;
  details: WaterPerformanceDetails;
}

export interface GetWaterPerformanceIndexResponse {
  message: string;
  data: WaterPerformanceIndexData;
}
