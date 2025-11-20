import { createContext, useContext, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthService } from "@/src/services";
import type {
  LoginRequest,
  RegisterRequest,
} from "@/src/services/api/auth/dtos";

interface AuthContextData {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);

      const response = await AuthService.login(credentials);

      // Salvar token
      await AsyncStorage.setItem("@app:token", response.token);

      setIsAuthenticated(true);

      Toast.show({
        type: "success",
        text1: "Login realizado!",
        text2: "Bem-vindo de volta!",
      });

      router.replace({ pathname: "/(logged)/(home)/" } as any);
    } catch (error: any) {
      console.error("Erro no login:", error);

      const status = error?.response?.status;
      let errorMessage = "Não foi possível fazer login. Tente novamente.";

      if (status === 401 || status === 404) {
        errorMessage = "Email/CPF ou senha inválidos.";
      } else if (status === 400) {
        errorMessage = error?.response?.data?.message || "Dados inválidos.";
      }

      Toast.show({
        type: "error",
        text1: "Erro no Login",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);

      await AuthService.register(data);

      Toast.show({
        type: "success",
        text1: "Cadastro realizado!",
        text2: "Faça login para continuar.",
      });

      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      console.error("Erro no registro:", error);

      const status = error?.response?.status;
      let errorMessage = "Não foi possível cadastrar. Tente novamente.";

      if (status === 400) {
        errorMessage =
          error?.response?.data?.message || "Email ou CPF já cadastrado.";
      }

      Toast.show({
        type: "error",
        text1: "Erro no Cadastro",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      // Remover token
      await AsyncStorage.removeItem("@app:token");

      setIsAuthenticated(false);

      Toast.show({
        type: "success",
        text1: "Logout realizado",
        text2: "Até logo!",
      });

      router.replace("/");
    } catch (error) {
      console.error("Erro no logout:", error);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Não foi possível fazer logout.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
