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

  useEffect(() => {
    if (!isOnline) {
      hasNotifiedRef.current = false;
    }
  }, [isOnline]);

  useEffect(() => {
    const checkAndNotify = async () => {
      if (!justReconnected || isAuthenticated || hasNotifiedRef.current) {
        return;
      }

      try {
        const wasCompletedOffline =
          await OfflineSyncService.wasFormCompletedOffline();

        if (!wasCompletedOffline) {
          return;
        }

        const pendingSync = await OfflineSyncService.getPendingSync();
        const hasPendingData =
          pendingSync?.hasPropertyToSync || pendingSync?.hasAnswersToSync;

        if (!hasPendingData) {
          await OfflineSyncService.clearFormCompletedOffline();
          return;
        }

        hasNotifiedRef.current = true;
        await NotificationService.sendSyncReminderNotification();
      } catch (error) {
        console.error("Error checking sync notification:", error);
      }
    };

    checkAndNotify();
  }, [justReconnected, isAuthenticated]);

  useEffect(() => {
    const clearFlagsOnAuth = async () => {
      if (isAuthenticated && isOnline) {
        try {
          const wasCompletedOffline =
            await OfflineSyncService.wasFormCompletedOffline();

          if (wasCompletedOffline) {
            await NotificationService.clearNotificationScheduled();
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
