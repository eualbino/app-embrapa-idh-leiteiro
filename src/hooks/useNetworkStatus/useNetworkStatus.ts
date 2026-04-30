// External Libraries
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: string | null;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: null,
    type: null,
  });

  const [previousConnection, setPreviousConnection] = useState<boolean>(true);
  const [justReconnected, setJustReconnected] = useState<boolean>(false);

  useEffect(() => {
    const checkInitialConnection = async () => {
      const state = await NetInfo.fetch();
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable ?? null;

      setNetworkStatus({
        isConnected,
        isInternetReachable,
        type: state.type,
      });
      setPreviousConnection(isConnected && isInternetReachable !== false);
    };

    checkInitialConnection();

    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable ?? null;
      const hasConnection = isConnected && isInternetReachable !== false;

      setNetworkStatus({
        isConnected,
        isInternetReachable,
        type: state.type,
      });

      if (!previousConnection && hasConnection) {
        setJustReconnected(true);

        setTimeout(() => {
          setJustReconnected(false);
        }, 5000);
      }

      setPreviousConnection(hasConnection);
    });

    return () => {
      unsubscribe();
    };
  }, [previousConnection]);

  // isInternetReachable can return false on Android even with a valid connection,
  // so we rely only on isConnected to avoid false offline negatives.
  const isOnline = networkStatus.isConnected ?? false;

  return {
    isOnline,
    isOffline: !isOnline,
    justReconnected,
    networkStatus,
  };
};
