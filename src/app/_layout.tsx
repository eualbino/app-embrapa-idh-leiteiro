import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";
import * as NavigationBar from "expo-navigation-bar";
import { AuthProvider } from "@/src/contexts/AuthContext";

export default function RootLayout() {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <AuthProvider>
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
              contentStyle: { backgroundColor: "#ffffff" },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                contentStyle: {
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 20,
                },
              }}
            />
            <Stack.Screen
              name="forgot-password"
              options={{
                contentStyle: {
                  backgroundColor: "#ffffff",
                },
              }}
            />
            <Stack.Screen
              name="(logged)"
              options={{
                contentStyle: { backgroundColor: "#ffffff" },
              }}
            />
          </Stack>
          <Toast config={toastConfig} topOffset={100} />
        </SafeAreaView>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
