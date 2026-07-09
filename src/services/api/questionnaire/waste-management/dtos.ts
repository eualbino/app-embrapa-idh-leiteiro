export interface CreateWasteManagementRequest {
  propertyId: number;
  wasteStorageSystem: number;
  impermeabilizedSystem: number;
  rainwaterDiverted: number;
  systemLeaks: number;
  roofGutters: number;
  floorWashingPercentage: number;
  manureRaking: number;
  pressureWashing: number;
  emergencyPlan: number;
  fertilizerDocumentation: number;
  organicResidueLab: number;
  soilAnalysis: number;
  residueApplicationFrequency: number;
  residueApplicationMethod: number;
}

export interface WasteManagementMesoIndicators {
  estrutura: number;
  manejoResiduo: number;
  adubacao: number;
}

export interface WasteManagementScores {
  wasteStorageSystemScore: number;
  impermeabilizedSystemScore: number;
  rainwaterDivertedScore: number;
  systemLeaksScore: number;
  roofGuttersScore: number;
  floorWashingPercentageScore: number;
  manureRakingScore: number;
  pressureWashingScore: number;
  emergencyPlanScore: number;
  fertilizerDocumentationScore: number;
  organicResidueLabScore: number;
  soilAnalysisScore: number;
  residueApplicationFrequencyScore: number;
  residueApplicationMethodScore: number;
}

export interface WasteManagementData {
  propertyId: number;
  finalScore: number;
  mesoIndicators: WasteManagementMesoIndicators;
  scores: WasteManagementScores;
}

export interface CreateWasteManagementResponse {
  message: string;
  data: WasteManagementData;
}
