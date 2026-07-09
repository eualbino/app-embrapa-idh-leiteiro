import { api } from "../../../http";
import { calculateWasteManagement } from "@/src/utils/calculations";
import type {
  CreateWasteManagementRequest,
  CreateWasteManagementResponse,
} from "./dtos";


export class WasteManagementService {
  static async createWasteManagement(
    data: CreateWasteManagementRequest,
    offline = false,
  ): Promise<CreateWasteManagementResponse> {
    const { propertyId, ...input } = data;
    const result = calculateWasteManagement(input);

    if (offline) {
      return { message: "ok", data: { propertyId, ...result } };
    }

    await api.post("/update", {
      entity: "WasteManagement",
      idValue: "",
      data: {
        propertyId,
        wasteStorageSystemScore: result.scores.wasteStorageSystemScore,
        impermeabilizedSystemScore: result.scores.impermeabilizedSystemScore,
        rainwaterDivertedScore: result.scores.rainwaterDivertedScore,
        systemLeaksScore: result.scores.systemLeaksScore,
        roofGuttersScore: result.scores.roofGuttersScore,
        floorWashingPercentageScore: result.scores.floorWashingPercentageScore,
        manureRakingScore: result.scores.manureRakingScore,
        pressureWashingScore: result.scores.pressureWashingScore,
        emergencyPlanScore: result.scores.emergencyPlanScore,
        fertilizerDocumentationScore: result.scores.fertilizerDocumentationScore,
        organicResidueLabScore: result.scores.organicResidueLabScore,
        soilAnalysisScore: result.scores.soilAnalysisScore,
        residueApplicationFrequencyScore:
          result.scores.residueApplicationFrequencyScore,
        residueApplicationMethodScore:
          result.scores.residueApplicationMethodScore,
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
