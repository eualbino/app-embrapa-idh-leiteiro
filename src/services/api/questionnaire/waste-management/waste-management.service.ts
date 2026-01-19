import { api } from "../../../http";
import {
  CreateWasteManagementRequest,
  CreateWasteManagementResponse,
} from "./dtos";

export class WasteManagementService {
  static async createWasteManagement(
    data: CreateWasteManagementRequest
  ): Promise<CreateWasteManagementResponse> {
    const response = await api.post<CreateWasteManagementResponse>(
      "forms/waste-management",
      data
    );
    return response.data;
  }
}
