import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { AuthService } from "@/src/services";
import type {
  ForgotPasswordRequest,
} from "@/src/services/api/auth/dtos";

const RESET_TOKEN_KEY = "@app:reset_token";
const RESET_EMAIL_KEY = "@app:reset_email";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendForgotPasswordEmail = async (data: ForgotPasswordRequest) => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem(RESET_EMAIL_KEY, data.email);
      await AuthService.forgotPassword(data);

      Toast.show({
        type: "success",
        text1: "Email Enviado",
        text2: "Código de verificação enviado para seu email.",
      });

      router.push("/forgot-password/confirm-code");
    } catch (error: any) {
      console.error("Erro ao enviar email:", error);

      const status = error?.response?.status;
      let errorMessage = "Não foi possível enviar o email. Tente novamente.";

      if (status === 404) {
        errorMessage = "Email não encontrado.";
      } else if (status === 400) {
        errorMessage = error?.response?.data?.message || "Email inválido.";
      }

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateOtp = async (otp_code: string) => {
    try {
      setIsLoading(true);

      const email = await AsyncStorage.getItem(RESET_EMAIL_KEY);

      if (!email) {
        throw new Error("Email não encontrado. Inicie o processo novamente.");
      }

      const response = await AuthService.validateOtp({ email, otp_code });

      await SecureStore.setItemAsync(RESET_TOKEN_KEY, response.token);

      Toast.show({
        type: "success",
        text1: "Código Verificado",
        text2: "Código confirmado com sucesso!",
      });

      router.push("/forgot-password/reset-password");
    } catch (error: any) {
      console.error("Erro ao validar código:", error);
      console.error("Error response:", error?.response?.data);
      console.error("Error status:", error?.response?.status);

      const status = error?.response?.status;
      const responseData = error?.response?.data;
      let errorMessage = "Código inválido ou expirado. Tente novamente.";

      if (status === 400) {
        errorMessage =
          responseData?.err || responseData?.message || "Código inválido.";
      } else if (status === 404) {
        errorMessage =
          responseData?.message ||
          "Email ou código não encontrado. Solicite um novo código.";
      }

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (password: string) => {
    try {
      setIsLoading(true);

      const token = await SecureStore.getItemAsync(RESET_TOKEN_KEY);

      if (!token) {
        throw new Error("Token de reset não encontrado");
      }

      await AuthService.resetPassword({ new_password: password }, token);

      Toast.show({
        type: "success",
        text1: "Senha Redefinida",
        text2: "Sua senha foi redefinida com sucesso!",
      });

      await SecureStore.deleteItemAsync(RESET_TOKEN_KEY);
      await AsyncStorage.removeItem(RESET_EMAIL_KEY);

      router.replace("/");
    } catch (error: any) {
      console.error("Erro ao redefinir senha:", error);

      const status = error?.response?.status;
      let errorMessage = "Não foi possível redefinir a senha. Tente novamente.";

      if (status === 400) {
        errorMessage = error?.response?.data?.message || "Senha inválida.";
      } else if (status === 401) {
        errorMessage = "Token expirado. Solicite um novo código.";
      } else if (status === 404) {
        errorMessage = "Usuário não encontrado.";
      }

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: errorMessage,
      });

      // Se token expirou, limpar e redirecionar
      if (status === 401) {
        await SecureStore.deleteItemAsync(RESET_TOKEN_KEY);
        await AsyncStorage.removeItem(RESET_EMAIL_KEY);
        router.replace("/forgot-password/send-email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStoredEmail = async (): Promise<string> => {
    const email = await AsyncStorage.getItem(RESET_EMAIL_KEY);
    return email || "";
  };

  return {
    isLoading,
    sendForgotPasswordEmail,
    validateOtp,
    resetPassword,
    getStoredEmail,
  };
}
