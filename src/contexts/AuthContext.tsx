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
import { useTranslation } from "react-i18next";

// Services
import { AuthService } from "@/src/services";
import { UserService } from "@/src/services/api/user";

// Types
import type {
  LoginRequest,
  RegisterRequest,
} from "@/src/services/api/auth/dtos";
import type { UserProfile, PropertySummary } from "@/src/services/api/user";

interface AuthContextData {
  isLoading: boolean;
  isInitializing: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  properties: PropertySummary[];
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsInitializing(true);
      const token = await AsyncStorage.getItem("@app:token");

      if (token) {
        try {
          const response = await UserService.getMe();
          setUser(response.user);
          setProperties(response.properties || []);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token inválido:", error);
          await AsyncStorage.multiRemove(["@app:token", "@app:refreshToken"]);
          setIsAuthenticated(false);
          setUser(null);
          setProperties([]);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setProperties([]);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      setUser(null);
      setProperties([]);
    } finally {
      setIsInitializing(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login(credentials);

      await AsyncStorage.setItem("@app:token", response.token);
      
      if (response.refreshToken) {
        await AsyncStorage.setItem("@app:refreshToken", response.refreshToken);
      }

      try {
        const userData = await UserService.getMe();
        setUser(userData.user);
        setProperties(userData.properties || []);
        setIsAuthenticated(true);

        Toast.show({
          type: "success",
          text1: t("auth.success.loginSuccess"),
          text2: t("auth.success.loginWelcome"),
        });

        router.replace({ pathname: "/(protected)/(tabs)/(home)" } as any);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);

        await AsyncStorage.multiRemove(["@app:token", "@app:refreshToken"]);

        throw new Error("Não foi possível carregar dados do usuário");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      const status = error?.response?.status;
      let errorMessage = t("auth.errors.loginFailed");

      if (status === 401 || status === 404) {
        errorMessage = t("auth.errors.invalidCredentials");
      } else if (status === 400) {
        errorMessage =
          error?.response?.data?.message || t("auth.errors.invalidData");
      }

      Toast.show({
        type: "error",
        text1: t("common.error"),
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
        text1: t("auth.success.registerSuccess"),
        text2: t("auth.success.registerMessage"),
      });

      await login({
        email: data.email,
        password: data.password,
      });
    } catch (error: any) {
      console.error("Erro no registro:", error);
      const status = error?.response?.status;
      let errorMessage = t("auth.errors.registerFailed");

      if (status === 400) {
        errorMessage =
          error?.response?.data?.message || t("auth.errors.emailOrCpfExists");
      }

      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await AsyncStorage.multiRemove(["@app:token", "@app:refreshToken"]);

      setIsAuthenticated(false);
      setUser(null);
      setProperties([]);

      router.replace("/login");

      Toast.show({
        type: "success",
        text1: t("common.success"),
        text2: t("common.logout"),
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("auth.errors.loginFailed"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isInitializing,
        isAuthenticated,
        user,
        properties,
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
