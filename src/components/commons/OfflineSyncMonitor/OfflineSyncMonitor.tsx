import React from "react";
import { useOfflineSync } from "@/src/hooks/useOfflineSync";
import { useSyncNotification } from "@/src/hooks/useSyncNotification";

export const OfflineSyncMonitor: React.FC = () => {
  useOfflineSync();
  useSyncNotification();

  return null;
};
