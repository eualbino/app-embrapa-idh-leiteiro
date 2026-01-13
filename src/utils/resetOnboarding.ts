import AsyncStorage from "@react-native-async-storage/async-storage";

export async function resetOnboarding(): Promise<void> {
  try {
    await AsyncStorage.removeItem("@app:hasSeenWelcome");
  } catch {
    throw new Error("Failed to reset onboarding");
  }
}

export async function hasSeenOnboarding(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem("@app:hasSeenWelcome");
    return value === "true";
  } catch {
    return false;
  }
}

export async function setOnboardingAsSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem("@app:hasSeenWelcome", "true");
  } catch {
    throw new Error("Failed to mark onboarding as seen");
  }
}
