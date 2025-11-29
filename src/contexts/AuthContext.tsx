// External Libraries
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

// Services
import { AuthService } from "@/src/services";

// Types
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
  const [isInitializing, setIsInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsInitializing(true);
      const token = await AsyncStorage.getItem("@app:token");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);

      await AsyncStorage.setItem("@app:token", response.token);
      setIsAuthenticated(true);

      Toast.show({
        type: "success",
        text1: "Login realizado!",
        text2: "Bem-vindo de volta!",
      });

      router.replace({ pathname: "/(protected)/(tabs)/(home)" } as any);
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

      await AsyncStorage.removeItem("@app:token");

      setIsAuthenticated(false);

      router.replace("/login");

      Toast.show({
        type: "success",
        text1: "Logout realizado",
        text2: "Até logo!",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
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
        isLoading: isLoading || isInitializing,
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
