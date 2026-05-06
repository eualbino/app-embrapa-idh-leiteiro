import { api } from "../../http";
import { GetMeResponse, UpdateProfileRequest, UserProfile } from "./dtos";

export class UserService {
  static async getMe(): Promise<GetMeResponse> {
    const response = await api.get<GetMeResponse>("/me");
    return response.data;
  }

  static async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const response = await api.patch<UserProfile>("/me", data);
    return response.data;
  }
}
