export interface CreateWaterQualityConservationRequest {
  propertyId: number;
  monitorsQuality: number;
  monitoredWaterPointsPercent: number;
  nitrateAnalysis: number;
  eColiAnalysis: number;
  animalsAccessWaterBodies: number;
  drinkerWaterSupply: number;
  waterAccumulationAreas: number;
  drinkerCleaningFrequency: number;
}

export interface WaterQualityConservationMesoIndicators {
  qualidadeAgua: number;
  conservacaoAgua: number;
}

export interface WaterQualityConservationScores {
  monitorsQualityScore: number;
  monitoredWaterPointsPercentScore: number | null;
  nitrateAnalysisScore: number | null;
  eColiAnalysisScore: number | null;
  animalsAccessWaterBodiesScore: number;
  drinkerWaterSupplyScore: number;
  waterAccumulationAreasScore: number;
  drinkerCleaningFrequencyScore: number;
}

export interface WaterQualityConservationData {
  propertyId: number;
  finalScore: number;
  mesoIndicators: WaterQualityConservationMesoIndicators;
  scores: WaterQualityConservationScores;
}

export interface CreateWaterQualityConservationResponse {
  message: string;
  data: WaterQualityConservationData;
}
