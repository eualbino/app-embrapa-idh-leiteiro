// External Libraries
import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
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

    const sent = await sendForgotPasswordEmail({ email });

    if (!sent) {
      return;
    }

    Toast.show({
      type: "success",
      text1: t("forgotPassword.success.passwordSent"),
      text2: t("forgotPassword.success.passwordSentMessage"),
    });

    router.replace("/login");
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {t("forgotPassword.sendEmailTitle")}
            </Text>

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
                  ? t("forgotPassword.sendingPassword")
                  : t("forgotPassword.sendPassword")}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
