import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingContextData {
  hasSeenWelcome: boolean | null;
  isLoading: boolean;
  markAsCompleted: () => Promise<void>;
  reset: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextData>(
  {} as OnboardingContextData,
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOnboardingStatus();
  }, []);

  const loadOnboardingStatus = async () => {
    try {
      setIsLoading(true);
      const value = await AsyncStorage.getItem("@app:hasSeenWelcome");
      const hasSeen = value === "true";
      setHasSeenWelcome(hasSeen);
    } catch {
      setHasSeenWelcome(false);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsCompleted = async () => {
    try {
      await AsyncStorage.setItem("@app:hasSeenWelcome", "true");
      setHasSeenWelcome(true);
    } catch (error) {
      throw error;
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem("@app:hasSeenWelcome");
      setHasSeenWelcome(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasSeenWelcome,
        isLoading,
        markAsCompleted,
        reset,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider",
    );
  }
  return context;
}
