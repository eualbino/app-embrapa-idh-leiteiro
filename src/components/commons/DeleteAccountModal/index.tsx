// External Libraries
import { useState } from "react";
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

// Contexts
import { useAuthContext } from "@/src/contexts/AuthContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Components
import { Input } from "@/src/components/commons/Input";

// Styles
import { styles } from "./styles";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Exclusão de conta iniciada pelo usuário, exigida pela App Store
 * (Guideline 5.1.1(v)) e pelo Google Play.
 *
 * A conta é encerrada aqui mesmo — não é uma solicitação de atendimento. A
 * Embrapa é notificada em paralelo para concluir a remoção definitiva dos
 * registros do lado dela.
 */
export function DeleteAccountModal({
  visible,
  onClose,
}: DeleteAccountModalProps) {
  const { t } = useTranslation();
  const { deleteAccount, isLoading } = useAuthContext();
  const { isOnline } = useNetworkStatus();

  const [password, setPassword] = useState("");

  const handleClose = () => {
    setPassword("");
    onClose();
  };

  const handleDelete = async () => {
    if (!password.trim()) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.deleteAccount.errors.emptyPassword"),
      });
      return;
    }

    if (!isOnline) {
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("profile.deleteAccount.errors.offline"),
      });
      return;
    }

    try {
      await deleteAccount(password);
      // A navegação e o toast de sucesso ficam no contexto, que também limpa
      // os dados locais. Aqui só é preciso fechar a folha.
      handleClose();
    } catch (error: any) {
      const message =
        error?.message === "WRONG_CURRENT_PASSWORD"
          ? t("profile.deleteAccount.errors.wrongPassword")
          : t("profile.deleteAccount.errors.generic");

      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: message,
      });
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
            <Text style={styles.title} accessibilityRole="header">
              {t("profile.deleteAccount.title")}
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel={t("common.cancel")}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                {t("profile.deleteAccount.warning")}
              </Text>
              <Text style={styles.detailText}>
                {t("profile.deleteAccount.whatIsRemoved")}
              </Text>
              <Text style={styles.irreversibleText}>
                {t("profile.deleteAccount.irreversible")}
              </Text>
            </View>

            {/*
              O que fica precisa ser dito com a mesma clareza do que sai: a
              Embrapa mantém as avaliações para pesquisa, e omitir isso na tela
              de exclusão seria informação enganosa ao usuário.
            */}
            <View style={styles.keptBox}>
              <Ionicons name="information-circle-outline" size={18} color="#4A5A52" />
              <Text style={styles.keptText}>
                {t("profile.deleteAccount.whatIsKept")}
              </Text>
            </View>

            <Input
              label={t("profile.deleteAccount.confirmPassword")}
              placeholder={t(
                "profile.deleteAccount.confirmPasswordPlaceholder",
              )}
              value={password}
              onChangeText={setPassword}
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
              accessibilityRole="button"
              accessibilityLabel={t("profile.deleteAccount.cancel")}
            >
              <Text style={styles.cancelText}>
                {t("profile.deleteAccount.cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deleteButton,
                (isLoading || !password) && styles.deleteButtonDisabled,
              ]}
              onPress={handleDelete}
              disabled={isLoading || !password}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={t("profile.deleteAccount.submit")}
              accessibilityState={{ disabled: isLoading || !password }}
            >
              <Text style={styles.deleteText}>
                {isLoading
                  ? t("profile.deleteAccount.submitting")
                  : t("profile.deleteAccount.submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
