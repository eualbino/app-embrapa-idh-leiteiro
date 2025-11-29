// External Libraries
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Style
import { styles } from "./styles";

export function LogoutButton() {
  const { t } = useTranslation();
  const { logout, isLoading } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    setModalVisible(false);
    await logout();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#FFFFFF"
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutButtonText}>{t("common.logout")}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="log-out-outline" size={40} color="#D32F2F" />
            </View>

            <Text style={styles.modalTitle}>{t("common.logoutTitle")}</Text>

            <Text style={styles.modalMessage}>{t("common.logoutMessage")}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>
                  {t("common.cancel")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleLogout}
                disabled={isLoading}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmButtonText}>
                  {isLoading ? t("common.loading") : t("common.logoutConfirm")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
