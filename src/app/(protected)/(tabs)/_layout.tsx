// External Libraries
import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen name="(home)" />
      <Stack.Screen name="history" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
