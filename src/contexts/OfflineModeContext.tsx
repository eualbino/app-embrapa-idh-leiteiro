// External Libraries
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import NetInfo from "@react-native-community/netinfo";

// Services
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

interface OfflineModeContextData {
  isOfflineMode: boolean;
  isCheckingOfflineMode: boolean;
  enterOfflineMode: () => Promise<void>;
  exitOfflineMode: () => Promise<void>;
}

const OfflineModeContext = createContext<OfflineModeContextData>(
  {} as OfflineModeContextData
);

export function OfflineModeProvider({ children }: { children: ReactNode }) {
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isCheckingOfflineMode, setIsCheckingOfflineMode] = useState(true);
  const { isOffline, justReconnected } = useNetworkStatus();
  const router = useRouter();
  const { t } = useTranslation();
  const hasShownAlertRef = useRef(false);

  // Check if user was in offline mode on app start
  useEffect(() => {
    const checkOfflineMode = async () => {
      try {
        setIsCheckingOfflineMode(true);
        const wasInOfflineMode = await OfflineSyncService.isInOfflineMode();

        if (wasInOfflineMode) {
          // If the app restarted with internet, exit offline mode so _layout
          // redirects to login instead of letting the user in unauthenticated
          const networkState = await NetInfo.fetch();
          const hasInternet =
            (networkState.isConnected ?? false) &&
            networkState.isInternetReachable !== false;

          if (hasInternet) {
            await OfflineSyncService.setOfflineMode(false);
            setIsOfflineMode(false);
          } else {
            setIsOfflineMode(true);
          }
        } else {
          setIsOfflineMode(false);
        }
      } catch (error) {
        console.error("Error checking offline mode:", error);
        setIsOfflineMode(false);
      } finally {
        setIsCheckingOfflineMode(false);
      }
    };

    checkOfflineMode();
  }, []);

  // Reset alert flag when going offline
  useEffect(() => {
    if (isOffline) {
      hasShownAlertRef.current = false;
    }
  }, [isOffline]);

  // Redirect to login when internet comes back while in offline mode
  useEffect(() => {
    const handleReconnection = async () => {
      if (!justReconnected || !isOfflineMode || hasShownAlertRef.current) {
        return;
      }

      hasShownAlertRef.current = true;

      // Check if there's pending data to sync
      const pendingSync = await OfflineSyncService.getPendingSync();
      const hasPendingData = pendingSync?.hasPropertyToSync || pendingSync?.hasAnswersToSync;

      if (hasPendingData) {
        Alert.alert(
          t("offlineMode.connectionRestored", "Conexão Restaurada"),
          t("offlineMode.loginToSync", "A internet voltou! Faça login para sincronizar seus dados preenchidos offline."),
          [
            {
              text: t("common.later", "Depois"),
              style: "cancel",
            },
            {
              text: t("common.login", "Login"),
              onPress: async () => {
                await exitOfflineMode();
                router.replace("/login");
              },
            },
          ]
        );
      }
    };

    handleReconnection();
  }, [justReconnected, isOfflineMode, t]);

  /**
   * Enter offline mode - allows user to access app without login
   * This should be called when user is offline and tries to access the app
   */
  const enterOfflineMode = useCallback(async () => {
    try {
      await OfflineSyncService.setOfflineMode(true);
      setIsOfflineMode(true);

      router.replace("/(protected)/(tabs)/(home)" as any);
    } catch (error) {
      console.error("Error entering offline mode:", error);
    }
  }, [router]);

  /**
   * Exit offline mode - should be called when user logs in
   */
  const exitOfflineMode = useCallback(async () => {
    try {
      await OfflineSyncService.setOfflineMode(false);
      setIsOfflineMode(false);
    } catch (error) {
      console.error("Error exiting offline mode:", error);
    }
  }, []);

  return (
    <OfflineModeContext.Provider
      value={{
        isOfflineMode,
        isCheckingOfflineMode,
        enterOfflineMode,
        exitOfflineMode,
      }}
    >
      {children}
    </OfflineModeContext.Provider>
  );
}

export function useOfflineModeContext() {
  const context = useContext(OfflineModeContext);
  if (!context) {
    throw new Error(
      "useOfflineModeContext must be used within an OfflineModeProvider"
    );
  }
  return context;
}
