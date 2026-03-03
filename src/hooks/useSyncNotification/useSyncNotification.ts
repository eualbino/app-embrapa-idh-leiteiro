import { useEffect, useRef } from "react";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { OfflineSyncService } from "@/src/services/offline/OfflineSyncService";
import { NotificationService } from "@/src/services/notifications";
import { useAuthContext } from "@/src/contexts/AuthContext";

/**
 * Hook that monitors network reconnection and sends a notification
 * when the user has completed a form offline and internet becomes available.
 * The notification reminds them to open the app and login to sync their data.
 *
 * This hook only sends notifications when:
 * 1. The user is NOT authenticated
 * 2. The form was completed offline
 * 3. There's pending data to sync
 * 4. Internet just reconnected
 */
export const useSyncNotification = () => {
  const { isOnline, justReconnected } = useNetworkStatus();
  const { isAuthenticated } = useAuthContext();
  const hasNotifiedRef = useRef(false);

  // Reset notification flag when going offline
  useEffect(() => {
    if (!isOnline) {
      hasNotifiedRef.current = false;
    }
  }, [isOnline]);

  // When internet reconnects and user is NOT authenticated, check if we need to notify
  useEffect(() => {
    const checkAndNotify = async () => {
      // Only notify if:
      // 1. Just reconnected
      // 2. User is NOT authenticated (if authenticated, sync happens automatically)
      // 3. Haven't already notified in this session
      if (!justReconnected || isAuthenticated || hasNotifiedRef.current) {
        return;
      }

      try {
        // Check if form was completed offline
        const wasCompletedOffline =
          await OfflineSyncService.wasFormCompletedOffline();

        if (!wasCompletedOffline) {
          return;
        }

        // Check if there's pending data to sync
        const pendingSync = await OfflineSyncService.getPendingSync();
        const hasPendingData =
          pendingSync?.hasPropertyToSync || pendingSync?.hasAnswersToSync;

        if (!hasPendingData) {
          // No pending data, clear the flag
          await OfflineSyncService.clearFormCompletedOffline();
          return;
        }

        // User is not authenticated and has pending data - send notification
        hasNotifiedRef.current = true;
        await NotificationService.sendSyncReminderNotification();
      } catch (error) {
        console.error("Error checking sync notification:", error);
      }
    };

    checkAndNotify();
  }, [justReconnected, isAuthenticated]);

  // When user logs in successfully, clear notification flags
  // The actual sync will be handled by useOfflineSync
  useEffect(() => {
    const clearFlagsOnAuth = async () => {
      if (isAuthenticated && isOnline) {
        try {
          const wasCompletedOffline =
            await OfflineSyncService.wasFormCompletedOffline();

          if (wasCompletedOffline) {
            // Clear notification-related flags
            // Data sync will be handled by useOfflineSync
            await NotificationService.clearNotificationScheduled();
            // Note: Don't clear formCompletedOffline here,
            // useOfflineSync will clear it after successful sync
          }
        } catch (error) {
          console.error("Error clearing notification flags:", error);
        }
      }
    };

    clearFlagsOnAuth();
  }, [isAuthenticated, isOnline]);

  return null;
};
