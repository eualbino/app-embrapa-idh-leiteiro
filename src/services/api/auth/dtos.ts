export interface LoginRequest {
  email?: string;
  cpf?: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ConfirmCodeRequest {
  email: string;
  otp_code: string;
}

export interface ResetPasswordRequest {
  new_password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
}

export interface ValidateOtpResponse {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};
