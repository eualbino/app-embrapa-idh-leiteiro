import { api } from "../../http";
import { CreatePropertyRequest, CreatePropertyResponse } from "./dtos";

export class PropertyService {
  static async createProperty(
    data: CreatePropertyRequest
  ): Promise<CreatePropertyResponse> {
    const response = await api.post<CreatePropertyResponse>(
      "/properties",
      data
    );
    return response.data;
  }
}
