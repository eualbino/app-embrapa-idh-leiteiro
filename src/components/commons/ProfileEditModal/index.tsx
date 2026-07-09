// External Libraries
import { useState, useEffect } from "react";
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

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { Input } from "@/src/components/commons/Input";
import { ChangePasswordModal } from "@/src/components/commons/ChangePasswordModal";

// Config
import { theme } from "@/src/config";

// Utils
import { formatPhoneInput } from "@/src/utils";

// Styles
import { styles } from "./styles";

interface ProfileEditModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ProfileEditModal({ visible, onClose }: ProfileEditModalProps) {
  const { t } = useTranslation();
  const { user, updateProfile, isLoading } = useAuthContext();
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (visible && user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone ? formatPhoneInput(user.phone) : "",
      });
    }
  }, [visible, user]);

  const handleSave = async () => {
    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        phone: form.phone.replace(/\D/g, ""),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    }
  };

  const avatarInitials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        onRequestClose={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.overlay}
        >
          <View style={styles.sheet}>
            <View style={styles.header}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{avatarInitials}</Text>
              </View>
              <Text style={styles.title}>{t("profile.title")}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={styles.body}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Input
                label={t("common.name")}
                placeholder="Marcelo Souza"
                value={form.name}
                onChangeText={(text) => setForm((p) => ({ ...p, name: text }))}
                autoComplete="name"
              />
              <Input
                label={t("common.email")}
                placeholder="email@gmail.com"
                value={form.email}
                onChangeText={(text) => setForm((p) => ({ ...p, email: text }))}
                keyboardType="email-address"
                autoComplete="email"
                autoCapitalize="none"
              />
              <Input
                label={t("common.phone")}
                placeholder="(11) 99999-9999"
                value={form.phone}
                onChangeText={(text) =>
                  setForm((p) => ({ ...p, phone: formatPhoneInput(text) }))
                }
                keyboardType="phone-pad"
                maxLength={15}
              />

              <View style={styles.cpfRow}>
                <Ionicons name="lock-closed-outline" size={14} color="#999" />
                <Text style={styles.cpfLabel}>CPF: {user?.cpf}</Text>
                <Text style={styles.cpfHint}>{t("profile.cpfReadOnly")}</Text>
              </View>

              <TouchableOpacity
                style={styles.changePasswordButton}
                onPress={() => setChangePasswordVisible(true)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="key-outline"
                  size={18}
                  color={theme.colors.primary.default}
                />
                <Text style={styles.changePasswordText}>
                  {t("profile.changePasswordButton")}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>{t("common.cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <Text style={styles.saveText}>
                  {isLoading ? t("common.loading") : t("common.save")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <ChangePasswordModal
        visible={changePasswordVisible}
        onClose={() => setChangePasswordVisible(false)}
      />
    </>
  );
}
