import { api } from "../../../http";
import {
  CreateWaterIndicatorRequest,
  CreateWaterIndicatorResponse,
} from "./dtos";

export class WaterIndicatorService {
  static async createWaterIndicator(
    data: CreateWaterIndicatorRequest,
  ): Promise<CreateWaterIndicatorResponse> {
    const response = await api.post<CreateWaterIndicatorResponse>(
      "forms/water-indicator",
      data,
    );
    return response.data;
  }
}
