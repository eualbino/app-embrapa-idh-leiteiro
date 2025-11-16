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

/**
 * Serviço de autenticação
 */
export class AuthService {
  /**
   * Faz login do usuário
   * POST /sessions
   * Aceita email+senha OU cpf+senha
   */
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/sessions', credentials);
    return response.data;
  }

  /**
   * Registra um novo usuário
   * POST /users
   * Retorna 201 sem corpo na resposta
   */
  static async register(data: RegisterRequest): Promise<void> {
    await api.post('/users', data);
  }

  /**
   * Faz logout do usuário
   */
  static async logout(): Promise<ApiResponse<void>> {
    const response = await api.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  }

  /**
   * Solicita recuperação de senha
   * POST /forgot-password
   * Retorna 200 sem corpo na resposta
   */
  static async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await api.post('/forgot-password', data);
  }

  /**
   * Valida o código OTP
   * POST /validate
   * Retorna token para reset de senha
   */
  static async validateOtp(data: ConfirmCodeRequest): Promise<ValidateOtpResponse> {
    const response = await api.post<ValidateOtpResponse>('/validate', data);
    return response.data;
  }

  /**
   * Redefine a senha
   * POST /reset-password
   * Requer token de autenticação no header
   * Retorna 201 sem corpo na resposta
   */
  static async resetPassword(data: ResetPasswordRequest, token: string): Promise<void> {
    await api.post('/reset-password', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
