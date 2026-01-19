import { api } from '../../http';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ConfirmCodeRequest,
  ValidateOtpResponse,
  ResetPasswordRequest,
  RefreshTokenResponse,
} from './dtos';

export class AuthService {

  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/sessions', credentials);
    return response.data;
  }

  static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await api.patch<RefreshTokenResponse>('/token/refresh', null, {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });
    return response.data;
  }

  static async register(data: RegisterRequest): Promise<void> {
    await api.post('/users', data);
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
