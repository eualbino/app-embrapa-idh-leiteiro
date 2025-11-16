import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";
import * as NavigationBar from "expo-navigation-bar";

export default function RootLayout() {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#ffffff", paddingHorizontal: 20 },
          }}
        />
        <Toast config={toastConfig} topOffset={100} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
