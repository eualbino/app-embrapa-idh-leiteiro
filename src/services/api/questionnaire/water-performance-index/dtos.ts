export interface WaterPerformanceIndexApiResponse {
  id: number;
  propertyId: number;
  waterManagementScore: number;
  waterQualityConservationScore: number;
  wasteManagementScore: number;
  finalScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetWaterPerformanceIndexParams {
  propertyId: number;
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
  propertyId: number;
  finalScore: number;
  macroIndicators: WaterPerformanceMacroIndicators;
  weights: WaterPerformanceWeights;
  details: WaterPerformanceDetails;
}

export interface GetWaterPerformanceIndexResponse {
  message: string;
  data: WaterPerformanceIndexData;
}
