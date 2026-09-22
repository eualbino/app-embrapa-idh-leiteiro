import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { AuthService } from "@/src/services/api/auth/auth.service";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api1.cppse.embrapa.br";

export function useForgotPassword() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const sendForgotPasswordEmail = async (data: { email: string }) => {
    setIsLoading(true);

    try {
      const adminToken = await AuthService.getAdminToken();

      await axios.post(
        `${API_URL}/gerarSenha`,
        {
          email: data.email,
          corpo: t("forgotPassword.emailBody"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        },
      );

      return true;
    } catch (error) {
      console.error("Erro ao enviar email de recuperação de senha:", error);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("forgotPassword.errors.sendEmailFailed"),
        visibilityTime: 5000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sendForgotPasswordEmail,
  };
}
