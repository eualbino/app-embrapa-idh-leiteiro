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

// Styles
import { styles } from "./styles";

interface ProfileEditModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ProfileEditModal({ visible, onClose }: ProfileEditModalProps) {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (visible && user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [visible, user]);

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
                value={form.name}
                editable={false}
                inputStyle={styles.disabledInput}
              />
              <Input
                label={t("common.email")}
                value={form.email}
                editable={false}
                inputStyle={styles.disabledInput}
              />
              <View style={styles.cpfRow}>
                <Ionicons name="lock-closed-outline" size={14} color="#999" />
                <Text style={styles.cpfHint}>{t("profile.nameEmailReadOnly")}</Text>
              </View>

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
