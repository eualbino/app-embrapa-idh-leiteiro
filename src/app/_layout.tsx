// External Libraries
import { useEffect, useState, useCallback } from "react";
import { Platform, StatusBar, View } from "react-native";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as NavigationBar from "expo-navigation-bar";

// Config
import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";

// Contexts
import { AuthProvider, useAuthContext } from "@/src/contexts/AuthContext";
import {
  OnboardingProvider,
  useOnboardingContext,
} from "@/src/contexts/OnboardingContext";
import {
  OfflineModeProvider,
  useOfflineModeContext,
} from "@/src/contexts/OfflineModeContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Components
import { OfflineSyncMonitor } from "@/src/components/commons/OfflineSyncMonitor";
import { CustomSplashScreen } from "@/src/components/commons/CustomSplashScreen";
import { AppErrorBoundary } from "@/src/components/commons/AppErrorBoundary";

// Styles
import { styles } from "@/src/styles/_layout.styles";

// Captura exceções de render de qualquer rota e evita o crash em release
// (Apple Guideline 2.1). O expo-router usa este export automaticamente.
export { AppErrorBoundary as ErrorBoundary };

// Tempo mínimo de splash: só evita o "piscar" quando a inicialização é
// instantânea. O que realmente libera a navegação são os estados de
// inicialização observados abaixo, não este timer.
const MIN_SPLASH_MS = 600;

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
    }, MIN_SPLASH_MS);

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

  useEffect(() => {
    if (initialRoute !== null && !hasNavigatedToInitial && isSplashReady) {
      router.replace(initialRoute as any);
      setHasNavigatedToInitial(true);
    }
  }, [initialRoute, hasNavigatedToInitial, isSplashReady, router]);

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

      if (isAuthenticated && isAuthRoute) {
        router.replace("/(protected)/(tabs)/(home)" as any);
      }
      else if (
        !isAuthenticated &&
        isProtectedRoute &&
        !isOfflineMode &&
        !isOffline
      ) {
        router.replace("/auth-landing" as any);
      }
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
        <Stack.Screen name="welcome" />
        <Stack.Screen name="auth-landing" />
        <Stack.Screen
          name="login"
          options={{
            contentStyle: {
              backgroundColor: "#ffffff",
              paddingHorizontal: 20,
            },
          }}
        />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="(protected)" />
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
  // Efeito colateral fora do corpo do render: com o React Compiler ligado
  // (app.json → experiments.reactCompiler) isso é comportamento indefinido,
  // e em iOS a chamada só emitia um warning a cada render.
  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("dark");
    }
  }, []);

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
