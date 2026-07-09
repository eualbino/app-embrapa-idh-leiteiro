// External Libraries
import { useState, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { Input } from "@/src/components/commons/Input";

// Styles
import { styles } from "./styles";

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ visible, onClose }: ChangePasswordModalProps) {
  const { t } = useTranslation();
  const { changePassword, isLoading } = useAuthContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordValidation = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    };
  }, [newPassword]);

  const isPasswordValid = useMemo(
    () => Object.values(passwordValidation).every(Boolean),
    [passwordValidation],
  );

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!currentPassword.trim()) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.changePassword.errors.emptyCurrentPassword"),
      });
      return;
    }

    if (!isPasswordValid) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.changePassword.errors.invalidPassword"),
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.changePassword.errors.passwordMismatch"),
      });
      return;
    }

    if (newPassword === currentPassword) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.changePassword.errors.samePassword"),
      });
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      handleClose();
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("profile.changePassword.title")}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Input
              label={t("profile.changePassword.currentPassword")}
              placeholder={t("profile.changePassword.currentPasswordPlaceholder")}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <Input
              label={t("profile.changePassword.newPassword")}
              placeholder={t("profile.changePassword.newPasswordPlaceholder")}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <View style={styles.passwordRequirements}>
              <Text
                style={[
                  styles.requirementText,
                  passwordValidation.minLength
                    ? styles.requirementMet
                    : styles.requirementNotMet,
                ]}
              >
                {passwordValidation.minLength ? "✓" : "○"}{" "}
                {t("forgotPassword.passwordRequirements.minLength")}
              </Text>
              <Text
                style={[
                  styles.requirementText,
                  passwordValidation.hasUpperCase
                    ? styles.requirementMet
                    : styles.requirementNotMet,
                ]}
              >
                {passwordValidation.hasUpperCase ? "✓" : "○"}{" "}
                {t("forgotPassword.passwordRequirements.hasUpperCase")}
              </Text>
              <Text
                style={[
                  styles.requirementText,
                  passwordValidation.hasLowerCase
                    ? styles.requirementMet
                    : styles.requirementNotMet,
                ]}
              >
                {passwordValidation.hasLowerCase ? "✓" : "○"}{" "}
                {t("forgotPassword.passwordRequirements.hasLowerCase")}
              </Text>
              <Text
                style={[
                  styles.requirementText,
                  passwordValidation.hasNumber
                    ? styles.requirementMet
                    : styles.requirementNotMet,
                ]}
              >
                {passwordValidation.hasNumber ? "✓" : "○"}{" "}
                {t("forgotPassword.passwordRequirements.hasNumber")}
              </Text>
              <Text
                style={[
                  styles.requirementText,
                  passwordValidation.hasSpecialChar
                    ? styles.requirementMet
                    : styles.requirementNotMet,
                ]}
              >
                {passwordValidation.hasSpecialChar ? "✓" : "○"}{" "}
                {t("forgotPassword.passwordRequirements.hasSpecialChar")}
              </Text>
            </View>

            <Input
              label={t("profile.changePassword.confirmPassword")}
              placeholder={t("profile.changePassword.confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
              activeOpacity={0.7}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
              disabled={
                isLoading ||
                !currentPassword ||
                !isPasswordValid ||
                newPassword !== confirmPassword
              }
              activeOpacity={0.7}
            >
              <Text style={styles.saveText}>
                {isLoading
                  ? t("profile.changePassword.submitting")
                  : t("profile.changePassword.submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
