import axios from "axios";
import { api } from "../../http";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./dtos";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api1.cppse.embrapa.br";

// Admin credentials used to create new user accounts
const ADMIN_USERNAME = "app-idh";
const ADMIN_PASSWORD =
  "$2a$12$QzQX8wt3MgVs40OcEKbB4eZwBOGsUXORTrWt7DcZruqx.9JVh5r1W";


export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/autenticar`,
      credentials,
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data;
  }

  static async getCurrentUserEmail(): Promise<string> {
    const response = await api.get<{ mailAddress: string }>("/usuario");
    return response.data.mailAddress;
  }

  static async getAdminToken(): Promise<string> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/autenticar`,
      { username: ADMIN_USERNAME, password: ADMIN_PASSWORD },
      { headers: { "Content-Type": "application/json" } },
    );
    return response.data.token;
  }

  static async register(data: RegisterRequest): Promise<RegisterResponse> {
    const adminToken = await AuthService.getAdminToken();

    const cadastroResponse = await axios.post<{ idt: number }>(
      `${API_URL}/update`,
      {
        entity: "UsuariosCadastro",
        idValue: "",
        data: {
          matricula: data.cpf,
          email: data.email,
          nome: data.name,
          senha: data.password,
          stsativo: true,
          ststrabalhaembrapa: false,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      },
    );

    const usuariosCadastroId = cadastroResponse.data.idt;

    const usersResponse = await axios.post<{ id: number }>(
      `${API_URL}/update`,
      {
        entity: "Users",
        idValue: "",
        data: {
          email: data.email,
          name: data.name,
          cpf: data.cpf || null,
          passwordHash: data.password,
          role: "USER",
          createdAt: new Date().toISOString().slice(0, 23),
          usuariosCadastroId,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      },
    );

    return { userId: usersResponse.data.id };
  }
}
