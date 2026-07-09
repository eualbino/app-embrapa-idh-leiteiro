import { api } from "../../../http";
import { calculateWaterQualityConservation } from "@/src/utils/calculations";
import type {
  CreateWaterQualityConservationRequest,
  CreateWaterQualityConservationResponse,
} from "./dtos";


export class WaterQualityConservationService {
  static async createWaterQualityConservation(
    data: CreateWaterQualityConservationRequest,
    offline = false,
  ): Promise<CreateWaterQualityConservationResponse> {
    const { propertyId, ...input } = data;
    const result = calculateWaterQualityConservation({
      ...input,
      monitoredWaterPointsPercent:
        input.monitoredWaterPointsPercent !== undefined
          ? input.monitoredWaterPointsPercent
          : null,
      nitrateAnalysis:
        input.nitrateAnalysis !== undefined ? input.nitrateAnalysis : null,
      eColiAnalysis:
        input.eColiAnalysis !== undefined ? input.eColiAnalysis : null,
    });

    if (offline) {
      return { message: "ok", data: { propertyId, ...result } };
    }

    await api.post("/update", {
      entity: "WaterQualityConservation",
      idValue: "",
      data: {
        propertyId,
        monitorsQualityScore: result.scores.monitorsQualityScore,
        monitoredWaterPointsPercentScore:
          result.scores.monitoredWaterPointsPercentScore ?? 0.0,
        nitrateAnalysisScore: result.scores.nitrateAnalysisScore ?? 0.0,
        eColiAnalysisScore: result.scores.eColiAnalysisScore ?? 0.0,
        animalsAccessWaterBodiesScore:
          result.scores.animalsAccessWaterBodiesScore,
        drinkerWaterSupplyScore: result.scores.drinkerWaterSupplyScore,
        waterAccumulationAreasScore: result.scores.waterAccumulationAreasScore,
        drinkerCleaningFrequencyScore:
          result.scores.drinkerCleaningFrequencyScore,
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
