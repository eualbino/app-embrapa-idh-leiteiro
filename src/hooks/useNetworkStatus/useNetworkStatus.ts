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
    // Verifica o estado inicial da conexão
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

    // Monitora mudanças na conexão
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isConnected = state.isConnected ?? false;
      const isInternetReachable = state.isInternetReachable ?? null;
      const hasConnection = isConnected && isInternetReachable !== false;

      setNetworkStatus({
        isConnected,
        isInternetReachable,
        type: state.type,
      });

      // Detecta reconexão (estava offline e agora está online)
      if (!previousConnection && hasConnection) {
        setJustReconnected(true);
        console.log("🌐 Dispositivo reconectado à internet!");

        // Reseta o flag após 5 segundos
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

  const isOnline = networkStatus.isConnected &&
                   networkStatus.isInternetReachable !== false;

  return {
    isOnline,
    isOffline: !isOnline,
    justReconnected,
    networkStatus,
  };
};
