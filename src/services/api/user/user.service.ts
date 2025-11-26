import { api } from "../../http";
import { GetMeResponse } from "./dtos";

export class UserService {
  static async getMe(): Promise<GetMeResponse> {
    const response = await api.get<GetMeResponse>("/me");
    return response.data;
  }
}
