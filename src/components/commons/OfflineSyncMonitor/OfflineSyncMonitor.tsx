import React from "react";
import { useOfflineSync } from "@/src/hooks/useOfflineSync";

export const OfflineSyncMonitor: React.FC = () => {
  useOfflineSync();
  
  return null;
};
