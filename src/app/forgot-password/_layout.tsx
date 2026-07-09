// External Libraries
import { Stack } from "expo-router";

export default function ForgotPasswordLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="send-email/index" />
    </Stack>
  );
}
