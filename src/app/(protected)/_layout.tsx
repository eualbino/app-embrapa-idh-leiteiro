// External Libraries
import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";
import { useOfflineModeContext } from "@/src/contexts/OfflineModeContext";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const { isOfflineMode, isCheckingOfflineMode } = useOfflineModeContext();
  const { isOffline } = useNetworkStatus();
  const router = useRouter();

  useEffect(() => {
    if (
      !isLoading &&
      !isCheckingOfflineMode &&
      !isAuthenticated &&
      !isOfflineMode &&
      !isOffline
    ) {
      router.replace("/login");
    }
  }, [
    isAuthenticated,
    isLoading,
    isOfflineMode,
    isCheckingOfflineMode,
    isOffline,
    router,
  ]);

  if (isLoading || isCheckingOfflineMode) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <ActivityIndicator size="large" color="#006f36" />
      </View>
    );
  }

  if (!isAuthenticated && !isOfflineMode && !isOffline) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
