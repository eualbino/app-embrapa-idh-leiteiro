import { useEffect, useState, useCallback } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";

import { AuthProvider, useAuthContext } from "@/src/contexts/AuthContext";
import {
  OnboardingProvider,
  useOnboardingContext,
} from "@/src/contexts/OnboardingContext";

import { OfflineSyncMonitor } from "@/src/components/commons/OfflineSyncMonitor";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isAuthenticated, isInitializing } = useAuthContext();
  const { hasSeenWelcome, isLoading: isOnboardingLoading } =
    useOnboardingContext();
  const router = useRouter();
  const pathname = usePathname();
  const [isSplashReady, setIsSplashReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isInitializing && !isOnboardingLoading && hasSeenWelcome !== null) {
      const isProtectedRoute = pathname?.startsWith("/(protected)");
      const isAuthRoute =
        pathname === "/login" || pathname?.startsWith("/forgot-password");
      const isWelcomeRoute = pathname === "/welcome";

      if (!hasSeenWelcome && !isWelcomeRoute) {
        router.replace("/welcome");
        return;
      }

      if (hasSeenWelcome && isWelcomeRoute) {
        router.replace("/login");
        return;
      }

      if (isAuthenticated && isAuthRoute) {
        router.replace("/(protected)/(tabs)/(home)" as any);
      } else if (!isAuthenticated && isProtectedRoute) {
        router.replace("/login");
      }
    }
  }, [
    isAuthenticated,
    isInitializing,
    isOnboardingLoading,
    hasSeenWelcome,
    pathname,
    router,
  ]);

  const onLayoutRootView = useCallback(async () => {
    if (
      isSplashReady &&
      !isInitializing &&
      !isOnboardingLoading &&
      hasSeenWelcome !== null
    ) {
      await SplashScreen.hideAsync();
    }
  }, [isSplashReady, isInitializing, isOnboardingLoading, hasSeenWelcome]);

  if (
    !isSplashReady ||
    isInitializing ||
    isOnboardingLoading ||
    hasSeenWelcome === null
  ) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <OfflineSyncMonitor />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="login"
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
          name="(protected)"
          options={{
            contentStyle: { backgroundColor: "#ffffff" },
          }}
        />
      </Stack>
      <Toast config={toastConfig} topOffset={100} />
    </View>
  );
}

export default function RootLayout() {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <OnboardingProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar
            translucent
            backgroundColor="#006f36"
            barStyle="light-content"
          />
          <SafeAreaView style={styles.safeArea} edges={[]}>
            <RootNavigator />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </OnboardingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
