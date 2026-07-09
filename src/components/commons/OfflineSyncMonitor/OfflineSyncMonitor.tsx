// External Libraries
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { useTranslation } from "react-i18next";

// Hooks
import { useOfflineSync } from "@/src/hooks/useOfflineSync";
import { useSyncNotification } from "@/src/hooks/useSyncNotification";

export const OfflineSyncMonitor: React.FC = () => {
  const { isSyncing } = useOfflineSync();
  const { t } = useTranslation();
  useSyncNotification();

  return (
    <Modal visible={isSyncing} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <ActivityIndicator size="large" color="#006f36" />
          <Text style={styles.text}>{t("offlineMode.syncing")}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 40,
    alignItems: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "center",
  },
});
