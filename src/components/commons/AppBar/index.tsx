// External Libraries
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { ProfileEditModal } from "@/src/components/commons/ProfileEditModal";
import { NetworkStatusBanner } from "@/src/components/commons/NetworkStatusBanner";

// Config
import { DOCUMENTS_URL } from "@/src/config/documents";

// Styles
import { styles } from "./styles";

interface AppBarProps {
  title?: string;
}

export const AppBar: React.FC<AppBarProps> = ({ title = "IDH Leite" }) => {
  const { width } = Dimensions.get("window");
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width * 0.75));
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { isOffline } = useNetworkStatus();

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const navigateTo = (route: string) => {
    closeMenu();
    setTimeout(() => {
      router.push(route as any);
    }, 300);
  };

  const handleOpenProfile = () => {
    closeMenu();
    setTimeout(() => {
      setProfileModalVisible(true);
    }, 320);
  };

  // A política de privacidade só era alcançável na tela de cadastro. As duas
  // lojas esperam que ela continue acessível para quem já tem conta.
  const openDocument = async (url: string) => {
    closeMenu();
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Erro ao abrir documento:", error);
      Toast.show({
        type: "error",
        text1: t("common.error"),
        text2: t("menu.openDocumentError"),
      });
    }
  };

  const isActive = (route: string) => {
    if (route === "home") return !pathname?.includes("history");
    if (route === "history") return pathname?.includes("history");
    return false;
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
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <View style={styles.appBarContent}>
          <TouchableOpacity
            onPress={openMenu}
            style={styles.menuButton}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={t("menu.title")}
          >
            <Ionicons name="menu" size={28} color="#ffffff" />
          </TouchableOpacity>
          <Image
            // Versão reduzida: o arquivo original tem 5121x7916 e era
            // decodificado inteiro em memória para exibir 40x40.
            source={require("@/src/assets/images/icon-white-small.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.placeholder} />
        </View>
        <NetworkStatusBanner isOffline={isOffline} isSyncing={false} />
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.backdrop} onPress={closeMenu} />
          <Animated.View
            style={[
              styles.drawerMenu,
              {
                transform: [{ translateX: slideAnim }],
                paddingTop: insets.top,
                paddingBottom: insets.bottom || 16,
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle} accessibilityRole="header">
                {t("menu.title")}
              </Text>
              <TouchableOpacity
                onPress={closeMenu}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel={t("common.cancel")}
              >
                <Ionicons name="close" size={28} color="#006f36" />
              </TouchableOpacity>
            </View>

            <View style={styles.menuItems}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isActive("home") && styles.menuItemActive,
                ]}
                onPress={() => navigateTo("/(protected)/(tabs)/(home)")}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={t("menu.home")}
                accessibilityState={{ selected: isActive("home") }}
              >
                <Ionicons
                  name="home"
                  size={24}
                  color={isActive("home") ? "#006f36" : "#666"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    isActive("home") && styles.menuItemTextActive,
                  ]}
                >
                  {t("menu.home")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isActive("history") && styles.menuItemActive,
                ]}
                onPress={() => navigateTo("/(protected)/(tabs)/history")}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={t("menu.history")}
                accessibilityState={{ selected: isActive("history") }}
              >
                <Ionicons
                  name="time"
                  size={24}
                  color={isActive("history") ? "#006f36" : "#666"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    isActive("history") && styles.menuItemTextActive,
                  ]}
                >
                  {t("menu.history")}
                </Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => openDocument(DOCUMENTS_URL.TERMO_USO_PRIVACIDADE)}
                activeOpacity={0.7}
                accessibilityRole="link"
                accessibilityLabel={t("menu.termsOfUse")}
              >
                <Ionicons name="document-text-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>{t("menu.termsOfUse")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => openDocument(DOCUMENTS_URL.AVISO_PRIVACIDADE)}
                activeOpacity={0.7}
                accessibilityRole="link"
                accessibilityLabel={t("menu.privacyNotice")}
              >
                <Ionicons name="shield-outline" size={24} color="#666" />
                <Text style={styles.menuItemText}>
                  {t("menu.privacyNotice")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerFooter}>
              <View style={styles.footerDivider} />

              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{avatarInitials}</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {user?.name || "—"}
                  </Text>
                  <Text style={styles.userEmail} numberOfLines={1}>
                    {user?.email || "—"}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={handleOpenProfile}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={t("profile.edit")}
              >
                <Ionicons name="pencil-outline" size={18} color="#006f36" />
                <Text style={styles.editProfileText}>{t("profile.edit")}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <ProfileEditModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
      />
    </>
  );
};
