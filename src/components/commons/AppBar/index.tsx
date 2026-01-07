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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Styles
import { styles } from "./styles";

interface AppBarProps {
  title?: string;
}

export const AppBar: React.FC<AppBarProps> = ({ title = "IDH Leite" }) => {
  const { width } = Dimensions.get("window");
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width * 0.75));
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

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

  const isActive = (route: string) => {
    if (route === "home") {
      const active = !pathname?.includes("history");
      return active;
    }

    if (route === "history") {
      const active = pathname?.includes("history");
      return active;
    }
    return false;
  };

  return (
    <>
      <View style={[styles.appBar, { paddingTop: insets.top }]}>
        <View style={styles.appBarContent}>
          <TouchableOpacity
            onPress={openMenu}
            style={styles.menuButton}
            activeOpacity={0.7}
          >
            <Ionicons name="menu" size={28} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.placeholder} />
        </View>
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
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
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
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuItem,
                  isActive("history") && styles.menuItemActive,
                ]}
                onPress={() => navigateTo("/(protected)/(tabs)/history")}
                activeOpacity={0.7}
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
                  Histórico
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};
