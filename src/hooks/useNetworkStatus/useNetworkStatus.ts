// External Libraries
import { useState, useEffect, useRef } from "react";
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

  const previousConnectionRef = useRef<boolean>(true);
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
      previousConnectionRef.current = isConnected && isInternetReachable !== false;
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

      if (!previousConnectionRef.current && hasConnection) {
        setJustReconnected(true);

        setTimeout(() => {
          setJustReconnected(false);
        }, 5000);
      }

      previousConnectionRef.current = hasConnection;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isOnline = networkStatus.isConnected ?? false;

  return {
    isOnline,
    isOffline: !isOnline,
    justReconnected,
    networkStatus,
  };
};
