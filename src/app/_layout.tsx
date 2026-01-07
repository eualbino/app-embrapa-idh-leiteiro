// External Libraries
import { useEffect, useState, useCallback } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";

// Config
import toastConfig from "@/src/config/toast";
import "@/src/locales/i18n";

// Context
import { AuthProvider, useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { OfflineSyncMonitor } from "@/src/components/commons/OfflineSyncMonitor";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthContext();
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
    if (!isLoading) {
      const isProtectedRoute = pathname?.startsWith("/(protected)");
      const isAuthRoute =
        pathname === "/login" || pathname?.startsWith("/forgot-password");

      if (isAuthenticated && isAuthRoute) {
        router.replace("/(protected)/(tabs)/(home)" as any);
      } else if (!isAuthenticated && isProtectedRoute) {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const onLayoutRootView = useCallback(async () => {
    if (isSplashReady && !isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isSplashReady, isLoading]);

  if (!isSplashReady || isLoading) {
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});
