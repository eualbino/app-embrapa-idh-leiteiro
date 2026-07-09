import { api } from "../../../http";
import type {
  GetWaterPerformanceIndexParams,
  GetWaterPerformanceIndexResponse,
  WaterPerformanceIndexApiResponse,
} from "./dtos";
import type { RetrievePageResponse } from "../../property/dtos";

export interface CreateWaterPerformanceIndexRequest {
  propertyId: number;
  waterManagementScore: number;
  waterQualityConservationScore: number;
  wasteManagementScore: number;
  finalScore: number;
}

const DEFAULT_WEIGHTS = {
  quantidadeAgua: 0.361,
  qualidadeAgua: 0.322,
  manejoResiduos: 0.317,
};

export class WaterPerformanceIndexService {
  static async createWaterPerformanceIndex(
    data: CreateWaterPerformanceIndexRequest,
  ): Promise<void> {
    await api.post("/update", {
      entity: "WaterPerformanceIndex",
      idValue: "",
      data: {
        propertyId: data.propertyId,
        waterManagementScore: data.waterManagementScore,
        waterQualityConservationScore: data.waterQualityConservationScore,
        wasteManagementScore: data.wasteManagementScore,
        finalScore: data.finalScore,
        updatedAt: new Date().toISOString(),
      },
    });

  }

  static async getWaterPerformanceIndex(
    params: GetWaterPerformanceIndexParams,
  ): Promise<GetWaterPerformanceIndexResponse> {
    let found: WaterPerformanceIndexApiResponse | undefined;
    let page = 1;

    while (!found) {
      const res = await api.post<RetrievePageResponse<WaterPerformanceIndexApiResponse>>(
        "/retrievePage",
        { entity: "WaterPerformanceIndex", page: String(page) },
      );
      const pageItems = res.data.data;
      if (pageItems.length === 0) break;

      found = pageItems.find(
        (item) => Number(item.propertyId) === Number(params.propertyId),
      );
      page++;
    }

    if (!found) {
      throw new Error("Resultado não encontrado para esta propriedade.");
    }

    return {
      message: "ok",
      data: {
        propertyId: found.propertyId,
        finalScore: found.finalScore,
        macroIndicators: {
          quantidadeAgua: found.waterManagementScore,
          qualidadeAgua: found.waterQualityConservationScore,
          manejoResiduos: found.wasteManagementScore,
        },
        weights: DEFAULT_WEIGHTS,
        details: {
          waterManagement: null,
          waterQualityConservation: null,
          wasteManagement: null,
        },
      },
    };
  }
}
