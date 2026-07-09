import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface NetworkStatusBannerProps {
  isOffline: boolean;
  isSyncing: boolean;
}

export const NetworkStatusBanner: React.FC<NetworkStatusBannerProps> = ({
  isOffline,
  isSyncing,
}) => {
  const { t } = useTranslation();
  const [fadeAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isOffline || isSyncing) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOffline, isSyncing, fadeAnim]);

  if (!isOffline && !isSyncing) {
    return null;
  }

  const backgroundColor = isSyncing
    ? "#3b82f6"
    : "#ef4444";

  const icon = isSyncing ? "cloud-upload-outline" : "cloud-offline-outline";
  const text = isSyncing
    ? t("offlineMode.syncing")
    : t("offlineMode.offlineBanner");

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor,
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons name={icon} size={20} color="#ffffff" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
});
