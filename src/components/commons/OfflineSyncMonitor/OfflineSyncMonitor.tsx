import React, { useEffect } from "react";
import { useOfflineSync } from "@/src/hooks/useOfflineSync";

export const OfflineSyncMonitor: React.FC = () => {
  const { syncOfflineData, isOnline, hasPendingData, isSyncing } =
    useOfflineSync();

  useEffect(() => {
    if (isOnline && hasPendingData && !isSyncing) {
      syncOfflineData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, hasPendingData, isSyncing]);
  
  return null;
};
