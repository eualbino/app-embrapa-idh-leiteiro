export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  password: string;
}

export interface RegisterResponse {
  userId: number;
}
