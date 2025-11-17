import { api } from '../../http';
import { ApiResponse } from '../../http/types';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ConfirmCodeRequest,
  ValidateOtpResponse,
  ResetPasswordRequest,
} from './dtos';

export class AuthService {

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/sessions', credentials);
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<void> {
    await api.post('/users', data);
  }

  static async logout(): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  }

  static async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post('/forgot-password', data);
  }

  static async validateOtp(data: ConfirmCodeRequest): Promise<ValidateOtpResponse> {
    const response = await api.post<ValidateOtpResponse>('/validate', data);
    return response.data;
  }

  static async resetPassword(data: ResetPasswordRequest, token: string): Promise<void> {
    await api.post('/reset-password', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
