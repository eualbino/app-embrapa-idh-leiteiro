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

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Services
import { AuthService } from "@/src/services";
import { UserService } from "@/src/services/api/user";
import { PropertyHistory } from "@/src/services/database";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { NotificationService } from "@/src/services/notifications";

// Types
import type { RegisterRequest } from "@/src/services/api/auth/dtos";
import type { UserProfile, PropertySummary } from "@/src/services/api/user";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  isLoading: boolean;
  isInitializing: boolean;
  isAuthenticated: boolean;
  user: UserProfile | null;
  properties: PropertySummary[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: (currentPassword: string) => Promise<void>;
  refetchUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
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
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsInitializing(true);
      const token = await AsyncStorage.getItem("@app:token");

      if (token) {
        // Carrega do cache imediatamente para liberar a splash screen
        const cachedProfile = await UserService.loadUserProfile();
        const cachedProperties = await UserService.loadProperties();
        if (cachedProfile) setUser(cachedProfile);
        setProperties(cachedProperties);
        setIsAuthenticated(true);
        setIsInitializing(false);

        // Valida o token e atualiza dados em background
        UserService.getMe()
          .then((response) => {
            setUser(response.user);
            setProperties(response.properties || []);
          })
          .catch(async (error) => {
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
              console.error("Token inválido, fazendo logout:", error);
              await AsyncStorage.removeItem("@app:token");
              setIsAuthenticated(false);
              setUser(null);
              setProperties([]);
            } else {
              console.error("Falha ao atualizar perfil em background (sem internet?):", error?.message);
            }
          });
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setProperties([]);
        setIsInitializing(false);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      setUser(null);
      setProperties([]);
      setIsInitializing(false);
    }
  };

  const refetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("@app:token");
      if (token && isAuthenticated) {
        const response = await UserService.getMe();
        setUser(response.user);
        setProperties(response.properties || []);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const username = credentials.email;
      const response = await AuthService.login({
        username,
        password: credentials.password,
      });

      await AsyncStorage.setItem("@app:token", response.token);

      // Carrega do cache imediatamente para não bloquear a navegação
      const cachedProfile = await UserService.loadUserProfile();
      const cachedProperties = await UserService.loadProperties();
      if (cachedProfile) setUser(cachedProfile);
      setProperties(cachedProperties);

      let hasPendingData = false;
      try {
        await OfflineSyncService.setOfflineMode(false);
        await NotificationService.clearNotificationScheduled();
        const pendingSync = await OfflineSyncService.getPendingSync();
        hasPendingData =
          (pendingSync?.hasPropertyToSync || pendingSync?.hasAnswersToSync) ??
          false;
      } catch (error) {
        console.error("Erro ao configurar estado pós-login:", error);
      }

      setIsAuthenticated(true);

      if (hasPendingData) {
        Toast.show({
          type: "success",
          text1: t("auth.success.loginSuccess"),
          text2: t("offlineMode.syncingPending"),
        });
      } else {
        Toast.show({
          type: "success",
          text1: t("auth.success.loginSuccess"),
          text2: t("auth.success.loginWelcome"),
        });
      }

      router.replace({ pathname: "/(protected)/(tabs)/(home)" } as any);

      // Atualiza dados frescos do backend em background sem bloquear a UI
      UserService.getMe()
        .then((userData) => {
          setUser(userData.user);
          setProperties(userData.properties || []);
        })
        .catch((error) => {
          console.error("Erro ao atualizar dados do usuário em background:", error);
        });
    } catch (error: any) {
      // Nunca logar o corpo da resposta: ele repassa a mensagem do banco, que
      // pode conter e-mail e CPF, e em release isso vai para o logcat.
      console.error("Erro no login. status:", error?.response?.status);
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
      const { userId } = await AuthService.register(data);

      const profile: UserProfile = {
        id: userId,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        role: "USER",
        createdAt: new Date().toISOString(),
      };
      await UserService.saveUserProfile(profile);

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
      // Ver comentário em `login`: o corpo da resposta carrega dado pessoal.
      console.error("Erro no registro. status:", error?.response?.status);
      const status = error?.response?.status;
      let errorMessage = t("auth.errors.registerFailed");

      // O backend retorna 401 (em vez de 400/409) quando o INSERT viola a
      // constraint de unicidade de e-mail/CPF, então a detecção não pode
      // depender só do status HTTP.
      const responseErrorText: string = error?.response?.data?.erro || "";
      const isDuplicateKeyError = /duplicate key/i.test(responseErrorText);

      if (status === 400 || isDuplicateKeyError) {
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

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!isOnline) {
      Toast.show({
        type: "warning",
        text1: t("offlineMode.noConnectionTitle"),
        text2: t("profile.changePassword.errors.offline"),
        visibilityTime: 4000,
      });
      throw new Error("offline");
    }

    try {
      setIsLoading(true);
      await UserService.changePassword(currentPassword, newPassword);
      Toast.show({
        type: "success",
        text1: t("common.success"),
        text2: t("profile.changePassword.success"),
      });
    } catch (error: any) {
      console.error("Erro ao alterar senha:", error);
      const errorMap: Record<string, string> = {
        WRONG_CURRENT_PASSWORD: t("profile.changePassword.errors.wrongCurrentPassword"),
        PROFILE_NOT_FOUND: t("auth.errors.loginFailed"),
      };
      const message =
        errorMap[error?.message] || t("profile.changePassword.errors.generic");
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: message,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove do aparelho tudo que identifica o usuário.
   *
   * Antes daqui o logout apagava só o token, e nome, e-mail, CPF, telefone e o
   * histórico de propriedades continuavam legíveis no aparelho — problema real
   * em celular compartilhado, comum no público deste app.
   *
   * A preferência de idioma e o flag de onboarding não são pessoais e ficam.
   */
  const clearLocalUserData = async (userId?: number) => {
    await AsyncStorage.multiRemove([
      "@app:token",
      "@app:userProfile",
      "@app:userProperties",
    ]);

    if (userId) {
      try {
        await PropertyHistory.clearProperties(userId);
      } catch (error) {
        console.error("Erro ao limpar histórico local de propriedades:", error);
      }
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      await clearLocalUserData(user?.id);

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

  /**
   * Encerra a conta e sai. Ver UserService.deleteAccount para o que acontece
   * no servidor. O erro é repassado para a tela poder distinguir senha errada.
   */
  const deleteAccount = async (currentPassword: string) => {
    try {
      setIsLoading(true);

      const userId = user?.id;
      await UserService.deleteAccount(currentPassword);

      await clearLocalUserData(userId);
      await OfflineSyncService.clearOfflineData();

      setIsAuthenticated(false);
      setUser(null);
      setProperties([]);

      router.replace("/auth-landing");

      Toast.show({
        type: "success",
        text1: t("profile.deleteAccount.successTitle"),
        text2: t("profile.deleteAccount.successMessage"),
      });
    } catch (error: any) {
      console.error(
        "Erro ao excluir conta:",
        error?.message === "WRONG_CURRENT_PASSWORD"
          ? "senha incorreta"
          : error?.response?.status,
      );
      throw error;
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
        deleteAccount,
        refetchUser,
        changePassword,
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
