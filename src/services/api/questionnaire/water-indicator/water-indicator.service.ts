import { api } from "../../../http";
import { calculateWaterIndicator } from "@/src/utils/calculations";
import type {
  CreateWaterIndicatorRequest,
  CreateWaterIndicatorResponse,
} from "./dtos";


export class WaterIndicatorService {
  static async createWaterIndicator(
    data: CreateWaterIndicatorRequest,
    offline = false,
  ): Promise<CreateWaterIndicatorResponse> {
    const { propertyId, ...input } = data;
    const result = calculateWaterIndicator(input);

    if (offline) {
      return { message: "ok", data: { propertyId, ...result } };
    }

    await api.post("/update", {
      entity: "WaterManagement",
      idValue: "",
      data: {
        propertyId,
        hasHydraulicMapScore: result.scores.hasHydraulicMapScore,
        hasWaterMeasurementScore: result.scores.hasWaterMeasurementScore,
        measurementFrequencyScore: result.scores.measurementFrequencyScore,
        monitoredConsumptionScore: result.scores.monitoredConsumptionScore,
        hasReductionGoalsScore: result.scores.hasReductionGoalsScore,
        hasFlowControlSystemScore: result.scores.hasFlowControlSystemScore,
        hasLevelFloatDrinkersScore: result.scores.hasLevelFloatDrinkersScore,
        hasLevelFloatStorageScore: result.scores.hasLevelFloatStorageScore,
        leakIdentificationScore: result.scores.leakIdentificationScore,
        irrigationProgramScore: result.scores.irrigationProgramScore ?? 0.0,
        coolingSystemScore: result.scores.coolingSystemScore ?? 0.0,
        rainwaterHarvestScore: result.scores.rainwaterHarvestScore,
        waterReuseScore: result.scores.waterReuseScore,
        finalScore: result.finalScore,
        updatedAt: new Date().toISOString(),
      },
    });

    return {
      message: "ok",
      data: { propertyId, ...result },
    };
  }
}
