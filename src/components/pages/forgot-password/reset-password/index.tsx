import React, { useState, useMemo } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { Input } from "@/src/components/commons/Input";
import { ButtonCommon } from "@/src/components/commons/Button";
import { styles } from "./styles";

export default function ResetPasswordForgotPassword() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = (params.email as string) || "";
  const code = (params.code as string) || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordValidation = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
  }, [newPassword]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidation).every(Boolean);
  }, [passwordValidation]);

  const handleResetPassword = async () => {
    if (!newPassword.trim()) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.emptyPassword'),
      });
      return;
    }

    if (!isPasswordValid) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.invalidPassword'),
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.passwordMismatch'),
      });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Toast.show({
        type: "success",
        text1: t('forgotPassword.success.passwordReset'),
        text2: t('forgotPassword.success.passwordResetMessage'),
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: t('common.error'),
        text2: t('forgotPassword.errors.resetFailed'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/");
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('forgotPassword.resetPasswordTitle')}</Text>

        <Text style={styles.description}>
          {t('forgotPassword.resetPasswordDescription')}
        </Text>

        <View style={styles.inputContainer}>
          <Input
            label={t('forgotPassword.newPassword')}
            placeholder={t('forgotPassword.newPasswordPlaceholder')}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.passwordRequirements}>
          <Text style={[
            styles.requirementText,
            passwordValidation.minLength ? styles.requirementMet : styles.requirementNotMet
          ]}>
            {passwordValidation.minLength ? "✓" : "○"} {t('forgotPassword.passwordRequirements.minLength')}
          </Text>
          <Text style={[
            styles.requirementText,
            passwordValidation.hasUpperCase ? styles.requirementMet : styles.requirementNotMet
          ]}>
            {passwordValidation.hasUpperCase ? "✓" : "○"} {t('forgotPassword.passwordRequirements.hasUpperCase')}
          </Text>
          <Text style={[
            styles.requirementText,
            passwordValidation.hasLowerCase ? styles.requirementMet : styles.requirementNotMet
          ]}>
            {passwordValidation.hasLowerCase ? "✓" : "○"} {t('forgotPassword.passwordRequirements.hasLowerCase')}
          </Text>
          <Text style={[
            styles.requirementText,
            passwordValidation.hasNumber ? styles.requirementMet : styles.requirementNotMet
          ]}>
            {passwordValidation.hasNumber ? "✓" : "○"} {t('forgotPassword.passwordRequirements.hasNumber')}
          </Text>
          <Text style={[
            styles.requirementText,
            passwordValidation.hasSpecialChar ? styles.requirementMet : styles.requirementNotMet
          ]}>
            {passwordValidation.hasSpecialChar ? "✓" : "○"} {t('forgotPassword.passwordRequirements.hasSpecialChar')}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label={t('forgotPassword.confirmPassword')}
            placeholder={t('forgotPassword.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleResetPassword}
            variant="primary"
            disabled={
              isLoading || !isPasswordValid || newPassword !== confirmPassword
            }
          >
            {isLoading ? t('forgotPassword.resetting') : t('forgotPassword.resetPassword')}
          </ButtonCommon>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleBackToLogin}
            variant="secondary"
            disabled={isLoading}
          >
            {t('auth.backToLogin')}
          </ButtonCommon>
        </View>
      </View>
    </View>
  );
}
