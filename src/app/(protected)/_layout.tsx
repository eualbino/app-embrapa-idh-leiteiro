// External Libraries
import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

// Context
import { useAuthContext } from "@/src/contexts/AuthContext";

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
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

  if (!isAuthenticated) {
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
