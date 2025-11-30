import React, { useEffect } from "react";
import { useOfflineSync } from "@/src/hooks/useOfflineSync";

/**
 * Componente que monitora a conexão e sincroniza dados automaticamente
 * quando a conexão é restaurada.
 *
 * Este componente deve ser montado no nível superior da aplicação.
 */
export const OfflineSyncMonitor: React.FC = () => {
  const { syncOfflineData, isOnline, hasPendingData, isSyncing } =
    useOfflineSync();

  useEffect(() => {
    // Quando o componente monta, verifica se há dados pendentes
    // e tenta sincronizar se estiver online
    if (isOnline && hasPendingData && !isSyncing) {
      console.log(
        "🔄 OfflineSyncMonitor: Tentando sincronizar dados pendentes...",
      );
      syncOfflineData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, hasPendingData, isSyncing]);

  // Este é um componente invisível que apenas monitora e sincroniza
  return null;
};
