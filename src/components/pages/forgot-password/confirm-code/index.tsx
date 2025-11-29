// External Libraries
import React, { useState, useEffect } from "react";
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

export default function ConfirmCodeForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isLoading, validateOtp, sendForgotPasswordEmail, getStoredEmail } =
    useForgotPassword();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    getStoredEmail().then(setEmail);
  }, [getStoredEmail]);

  const handleConfirmCode = async () => {
    if (!code.trim()) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("forgotPassword.errors.emptyCode"),
      });
      return;
    }

    if (code.length < 4) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("forgotPassword.errors.invalidCode"),
      });
      return;
    }

    await validateOtp(code);
  };

  const handleResendCode = async () => {
    if (isResending || isLoading) return;

    setIsResending(true);

    try {
      await sendForgotPasswordEmail({ email });
      setCode("");
    } finally {
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.card}>
        <Text style={styles.title}>{t("forgotPassword.confirmCodeTitle")}</Text>

        <Text style={styles.description}>
          {t("forgotPassword.confirmCodeDescription")}
        </Text>

        <Text style={styles.emailText}>{email}</Text>

        <View style={styles.inputContainer}>
          <Input
            label={t("forgotPassword.code")}
            type="number-pad"
            placeholder={t("forgotPassword.codePlaceholder")}
            value={code}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
            maxLength={6}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleConfirmCode}
            variant="primary"
            disabled={isLoading || isResending}
          >
            {isLoading
              ? t("forgotPassword.verifying")
              : t("forgotPassword.confirmCode")}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading || isResending}
          >
            {t("common.back")}
          </ButtonCommon>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            {t("forgotPassword.didntReceiveCode")}
          </Text>
          <Text
            style={styles.resendLink}
            onPress={isResending ? undefined : handleResendCode}
          >
            {isResending
              ? t("forgotPassword.resending")
              : t("forgotPassword.resendCode")}
          </Text>
        </View>
      </View>
    </View>
  );
}
