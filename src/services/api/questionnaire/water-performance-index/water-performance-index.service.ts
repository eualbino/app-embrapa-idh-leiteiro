import { api } from "../../../http";
import {
  GetWaterPerformanceIndexParams,
  GetWaterPerformanceIndexResponse,
} from "./dtos";
export class WaterPerformanceIndexService {
  static async getWaterPerformanceIndex(
    params: GetWaterPerformanceIndexParams,
  ): Promise<GetWaterPerformanceIndexResponse> {
    const response = await api.get<GetWaterPerformanceIndexResponse>(
      `/water-performance-index/${params.propertyId}`,
    );
    return response.data;
  }
}
