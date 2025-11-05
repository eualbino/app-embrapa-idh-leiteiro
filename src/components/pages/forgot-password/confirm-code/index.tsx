import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { styles } from "./styles";

export default function ConfirmCodeForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string || "seu.email@exemplo.com";
  
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleConfirmCode = async () => {
    if (!code.trim()) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.emptyCode'),
      });
      return;
    }

    if (code.length < 4) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.invalidCode'),
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      Toast.show({
        type: "success",
        text1: t('forgotPassword.success.codeVerified'),
        text2: t('forgotPassword.success.codeVerifiedMessage'),
      });

      setTimeout(() => {
        router.push({
          pathname: "/forgot-password/reset-password",
          params: { email, code }
        });
      }, 1000);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.verifyCodeFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Toast.show({
        type: "success",
        text1: t('forgotPassword.success.codeResent'),
        text2: t('forgotPassword.success.codeResentMessage'),
      });
      setCode("");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.resendFailed'),
      });
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
        <Text style={styles.title}>{t('forgotPassword.confirmCodeTitle')}</Text>
        
        <Text style={styles.description}>
          {t('forgotPassword.confirmCodeDescription')}
        </Text>

        <Text style={styles.emailText}>{email}</Text>

        <View style={styles.inputContainer}>
          <Input
            label={t('forgotPassword.code')}
            type="number-pad"
            placeholder={t('forgotPassword.codePlaceholder')}
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
            {isLoading ? t('forgotPassword.verifying') : t('forgotPassword.confirmCode')}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading || isResending}
          >
            {t('common.back')}
          </ButtonCommon>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>{t('forgotPassword.didntReceiveCode')}</Text>
          <Text 
            style={styles.resendLink}
            onPress={isResending ? undefined : handleResendCode}
          >
            {isResending ? t('forgotPassword.resending') : t('forgotPassword.resendCode')}
          </Text>
        </View>
      </View>
    </View>
  );
}
