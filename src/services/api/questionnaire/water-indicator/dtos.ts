export interface CreateWaterIndicatorRequest {
  propertyId: string;
  hasHydraulicMap: number;
  hasWaterMeasurement: number;
  measurementFrequency: number;
  monitoredConsumption: number;
  hasReductionGoals: number;
  flowControlSystem: number;
  levelFloatDrinkers: number;
  levelFloatStorage: number;
  leakIdentification: number;
  irrigationProgram: number | null;
  coolingSystem: number | null;
  rainwaterHarvest: number;
  waterReuse: number;
}

export interface WaterIndicatorMesoIndicators {
  consumoAgua: number;
  perdasAgua: number;
  segurancaHidrica: number;
}

export interface WaterIndicatorScores {
  hasHydraulicMapScore: number;
  hasWaterMeasurementScore: number;
  measurementFrequencyScore: number;
  monitoredConsumptionScore: number;
  hasReductionGoalsScore: number;
  hasFlowControlSystemScore: number;
  hasLevelFloatDrinkersScore: number;
  hasLevelFloatStorageScore: number;
  leakIdentificationScore: number;
  irrigationProgramScore: number | null;
  coolingSystemScore: number | null;
  rainwaterHarvestScore: number;
  waterReuseScore: number;
}

export interface WaterIndicatorData {
  propertyId: string;
  finalScore: number;
  mesoIndicators: WaterIndicatorMesoIndicators;
  scores: WaterIndicatorScores;
}

export interface CreateWaterIndicatorResponse {
  message: string;
  data: WaterIndicatorData;
}
