// External Libraries
import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

// Components
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";

// Hooks
import { useForgotPassword } from "@/src/components/pages/forgot-password/hooks/useForgotPassword/useForgotPassword";

// Style
import { styles } from "./styles";

export default function SendEmailForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const { isLoading, sendForgotPasswordEmail } = useForgotPassword();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("forgotPassword.errors.emptyEmail"),
      });
      return;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("forgotPassword.errors.invalidEmail"),
      });
      return;
    }

    await sendForgotPasswordEmail({ email });
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View>
      <View style={styles.card}>
        <Text style={styles.title}>{t("forgotPassword.sendEmailTitle")}</Text>

        <Text style={styles.description}>
          {t("forgotPassword.sendEmailDescription")}
        </Text>

        <View style={styles.inputContainer}>
          <Input
            label={t("forgotPassword.email")}
            type="email-address"
            placeholder={t("forgotPassword.emailPlaceholder")}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleSendEmail}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading
              ? t("forgotPassword.sending")
              : t("forgotPassword.sendCode")}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading}
          >
            {t("auth.backToLogin")}
          </ButtonCommon>
        </View>
      </View>
    </View>
  );
}
