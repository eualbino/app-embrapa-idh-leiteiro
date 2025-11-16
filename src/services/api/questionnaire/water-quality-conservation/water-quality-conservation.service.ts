import { api } from "../../../http";
import {
  CreateWaterQualityConservationRequest,
  CreateWaterQualityConservationResponse,
} from "./dtos";

export class WaterQualityConservationService {
  static async createWaterQualityConservation(
    data: CreateWaterQualityConservationRequest
  ): Promise<CreateWaterQualityConservationResponse> {
    const response = await api.post<CreateWaterQualityConservationResponse>(
      "/water-quality-conservation",
      data
    );
    return response.data;
  }
}
