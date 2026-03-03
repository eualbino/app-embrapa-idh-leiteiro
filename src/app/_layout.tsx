import { useEffect, useState, useCallback } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import * as NavigationBar from "expo-navigation-bar";
import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";

import { AuthProvider, useAuthContext } from "@/src/contexts/AuthContext";
import {
  OnboardingProvider,
  useOnboardingContext,
} from "@/src/contexts/OnboardingContext";
import {
  OfflineModeProvider,
  useOfflineModeContext,
} from "@/src/contexts/OfflineModeContext";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

import { OfflineSyncMonitor } from "@/src/components/commons/OfflineSyncMonitor";
import { CustomSplashScreen } from "@/src/components/commons/CustomSplashScreen";

function RootNavigator() {
  const { isAuthenticated, isInitializing } = useAuthContext();
  const { hasSeenWelcome, isLoading: isOnboardingLoading } =
    useOnboardingContext();
  const { isOfflineMode, isCheckingOfflineMode } = useOfflineModeContext();
  const { isOffline } = useNetworkStatus();
  const router = useRouter();
  const pathname = usePathname();
  const [isSplashReady, setIsSplashReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [hasNavigatedToInitial, setHasNavigatedToInitial] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      !isInitializing &&
      !isOnboardingLoading &&
      !isCheckingOfflineMode &&
      hasSeenWelcome !== null &&
      initialRoute === null
    ) {
      if (!hasSeenWelcome) {
        setInitialRoute("/welcome");
      } else if (isAuthenticated) {
        setInitialRoute("/(protected)/(tabs)/(home)");
      } else if (isOfflineMode || isOffline) {
        // Se está em modo offline ou está sem internet, vai direto para o app
        setInitialRoute("/(protected)/(tabs)/(home)");
      } else {
        setInitialRoute("/auth-landing");
      }
    }
  }, [
    isInitializing,
    isOnboardingLoading,
    isCheckingOfflineMode,
    hasSeenWelcome,
    isAuthenticated,
    isOfflineMode,
    isOffline,
    initialRoute,
  ]);

  // Navegar para a rota inicial assim que for determinada
  useEffect(() => {
    if (initialRoute !== null && !hasNavigatedToInitial && isSplashReady) {
      router.replace(initialRoute as any);
      setHasNavigatedToInitial(true);
    }
  }, [initialRoute, hasNavigatedToInitial, isSplashReady, router]);

  // Gerenciar navegação após a rota inicial
  useEffect(() => {
    if (
      !isInitializing &&
      !isOnboardingLoading &&
      !isCheckingOfflineMode &&
      hasSeenWelcome !== null &&
      hasNavigatedToInitial
    ) {
      const isProtectedRoute = pathname?.startsWith("/(protected)");
      const isAuthRoute =
        pathname === "/login" || 
        pathname === "/auth-landing" || 
        pathname?.startsWith("/forgot-password");
      const isWelcomeRoute = pathname === "/welcome";

      if (!hasSeenWelcome && !isWelcomeRoute) {
        router.replace("/welcome");
        return;
      }

      if (hasSeenWelcome && isWelcomeRoute) {
        router.replace("/auth-landing" as any);
        return;
      }

      // Se autenticado e em rota de auth, vai para home
      if (isAuthenticated && isAuthRoute) {
        router.replace("/(protected)/(tabs)/(home)" as any);
      }
      // Se não autenticado, não está em modo offline e não está offline, redireciona para auth-landing
      else if (
        !isAuthenticated &&
        isProtectedRoute &&
        !isOfflineMode &&
        !isOffline
      ) {
        router.replace("/auth-landing" as any);
      }
      // Se está offline ou em modo offline, permite acesso às rotas protegidas
    }
  }, [
    isAuthenticated,
    isInitializing,
    isOnboardingLoading,
    isCheckingOfflineMode,
    hasSeenWelcome,
    pathname,
    router,
    hasNavigatedToInitial,
    isOfflineMode,
    isOffline,
  ]);

  // Determinar quando esconder a splash customizada
  const shouldHideSplash =
    isSplashReady &&
    !isInitializing &&
    !isOnboardingLoading &&
    !isCheckingOfflineMode &&
    hasSeenWelcome !== null &&
    initialRoute !== null;

  const handleSplashAnimationEnd = useCallback(() => {
    setShowCustomSplash(false);
  }, []);

  return (
    <View style={styles.container}>
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

      {showCustomSplash && (
        <CustomSplashScreen
          isVisible={!shouldHideSplash}
          onAnimationEnd={handleSplashAnimationEnd}
        />
      )}
    </View>
  );
}

export default function RootLayout() {
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <OnboardingProvider>
      <AuthProvider>
        <OfflineModeProvider>
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
        </OfflineModeProvider>
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
