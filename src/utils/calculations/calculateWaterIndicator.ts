import type {
  CreateWaterIndicatorRequest,
  WaterIndicatorData,
} from "@/src/services/api/questionnaire/water-indicator/dtos";
import { roundToTwo } from "./roundToTwo";

function redistributeWeights(
  weights: Record<string, number>,
  nullKeys: string[],
): Record<string, number> {
  const applicable = Object.entries(weights).filter(
    ([k]) => !nullKeys.includes(k),
  );
  const total = applicable.reduce((sum, [, w]) => sum + w, 0);
  return Object.fromEntries(
    Object.entries(weights).map(([k, w]) =>
      nullKeys.includes(k) ? [k, 0] : [k, w / total],
    ),
  );
}

export function calculateWaterIndicator(
  data: Omit<CreateWaterIndicatorRequest, "propertyId">,
): Omit<WaterIndicatorData, "propertyId"> {
  // Consumo de Água (Q1-Q5)
  const consumoAgua =
    data.hasHydraulicMap * 0.173 +
    data.hasWaterMeasurement * 0.205 +
    data.measurementFrequency * 0.191 +
    data.monitoredConsumption * 0.186 +
    data.hasReductionGoals * 0.245;

  // Perdas de Água (Q6-Q11) com redistribuição de pesos para Q10/Q11 nulos
  const baseWeights = {
    flowControlSystem: 0.149,
    levelFloatDrinkers: 0.156,
    levelFloatStorage: 0.145,
    leakIdentification: 0.222,
    irrigationProgram: 0.179,
    coolingSystem: 0.149,
  };

  const nullKeys: string[] = [];
  if (data.irrigationProgram === null) nullKeys.push("irrigationProgram");
  if (data.coolingSystem === null) nullKeys.push("coolingSystem");

  const w = redistributeWeights(baseWeights, nullKeys);

  const perdasAgua =
    data.flowControlSystem * w.flowControlSystem +
    data.levelFloatDrinkers * w.levelFloatDrinkers +
    data.levelFloatStorage * w.levelFloatStorage +
    data.leakIdentification * w.leakIdentification +
    (data.irrigationProgram !== null
      ? data.irrigationProgram! * w.irrigationProgram
      : 0) +
    (data.coolingSystem !== null ? data.coolingSystem! * w.coolingSystem : 0);

  // Segurança Hídrica (Q12-Q13)
  const segurancaHidrica =
    data.rainwaterHarvest * 0.505 + data.waterReuse * 0.495;

  const finalScore =
    consumoAgua * 0.337 + perdasAgua * 0.34 + segurancaHidrica * 0.323;

  return {
    finalScore: roundToTwo(finalScore) as number,
    mesoIndicators: {
      consumoAgua: roundToTwo(consumoAgua) as number,
      perdasAgua: roundToTwo(perdasAgua) as number,
      segurancaHidrica: roundToTwo(segurancaHidrica) as number,
    },
    scores: {
      hasHydraulicMapScore: data.hasHydraulicMap,
      hasWaterMeasurementScore: data.hasWaterMeasurement,
      measurementFrequencyScore: data.measurementFrequency,
      monitoredConsumptionScore: data.monitoredConsumption,
      hasReductionGoalsScore: data.hasReductionGoals,
      hasFlowControlSystemScore: data.flowControlSystem,
      hasLevelFloatDrinkersScore: data.levelFloatDrinkers,
      hasLevelFloatStorageScore: data.levelFloatStorage,
      leakIdentificationScore: data.leakIdentification,
      irrigationProgramScore: data.irrigationProgram,
      coolingSystemScore: data.coolingSystem,
      rainwaterHarvestScore: data.rainwaterHarvest,
      waterReuseScore: data.waterReuse,
    },
  };
}
