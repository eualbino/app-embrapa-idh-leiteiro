import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_SCHEDULED_KEY = "@app:sync_notification_scheduled";
const FORM_COMPLETED_OFFLINE_KEY = "@app:form_completed_offline";
const NOTIFICATION_PERMISSION_REQUESTED_KEY =
  "@app:notification_permission_requested";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export class NotificationService {
  /**
   * Check if we have already requested permissions before
   */
  static async hasAlreadyRequestedPermissions(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(
        NOTIFICATION_PERMISSION_REQUESTED_KEY,
      );
      return value === "true";
    } catch (error) {
      console.error("Error checking permission requested flag:", error);
      return false;
    }
  }

  /**
   * Mark that we have requested permissions
   */
  static async markPermissionRequested(): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PERMISSION_REQUESTED_KEY, "true");
    } catch (error) {
      console.error("Error marking permission requested:", error);
    }
  }

  /**
   * Request notification permissions (only asks once, on first app use)
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      // Check if we already have permission
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      // If already granted, just configure Android channel and return
      if (existingStatus === "granted") {
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("sync-reminder", {
            name: "Lembrete de Sincronização",
            description:
              "Notificações para lembrar de sincronizar dados offline",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#006f36",
          });
        }
        return true;
      }

      const alreadyRequested = await this.hasAlreadyRequestedPermissions();
      if (alreadyRequested) {
        return false;
      }

      // First time asking - request permission
      const { status } = await Notifications.requestPermissionsAsync();

      // Mark that we've requested (regardless of result)
      await this.markPermissionRequested();

      if (status !== "granted") {
        return false;
      }

      // Configure Android channel
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("sync-reminder", {
          name: "Lembrete de Sincronização",
          description: "Notificações para lembrar de sincronizar dados offline",
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#006f36",
        });
      }

      return true;
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      return false;
    }
  }

  /**
   * Mark that the form was completed while offline
   */
  static async markFormCompletedOffline(): Promise<void> {
    try {
      await AsyncStorage.setItem(FORM_COMPLETED_OFFLINE_KEY, "true");
    } catch (error) {
      console.error("Error marking form completed offline:", error);
    }
  }

  /**
   * Check if form was completed offline
   */
  static async wasFormCompletedOffline(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(FORM_COMPLETED_OFFLINE_KEY);
      return value === "true";
    } catch (error) {
      console.error("Error checking form completed offline:", error);
      return false;
    }
  }

  /**
   * Clear the form completed offline flag
   */
  static async clearFormCompletedOffline(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FORM_COMPLETED_OFFLINE_KEY);
    } catch (error) {
      console.error("Error clearing form completed offline:", error);
    }
  }

  /**
   * Send a local notification to remind user to sync data
   */
  static async sendSyncReminderNotification(): Promise<void> {
    try {
      // Check if we already sent a notification recently
      const alreadyScheduled = await AsyncStorage.getItem(
        NOTIFICATION_SCHEDULED_KEY,
      );
      if (alreadyScheduled) {
        const scheduledTime = parseInt(alreadyScheduled, 10);
        const hoursSinceScheduled =
          (Date.now() - scheduledTime) / (1000 * 60 * 60);

        // Don't send another notification if one was sent in the last hour
        if (hoursSinceScheduled < 1) {
          return;
        }
      }

      // Request permissions if not already granted
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return;
      }

      // Schedule immediate notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📱 Dados prontos para sincronizar!",
          body: "Você completou o formulário offline. Abra o app e faça login para sincronizar seus dados.",
          data: { type: "sync_reminder" },
          sound: true,
        },
        trigger: null, // null means show immediately
      });

      // Mark that we sent the notification
      await AsyncStorage.setItem(
        NOTIFICATION_SCHEDULED_KEY,
        Date.now().toString(),
      );
    } catch (error) {
      console.error("Error sending sync reminder notification:", error);
    }
  }

  /**
   * Clear the notification scheduled flag
   */
  static async clearNotificationScheduled(): Promise<void> {
    try {
      await AsyncStorage.removeItem(NOTIFICATION_SCHEDULED_KEY);
    } catch (error) {
      console.error("Error clearing notification scheduled flag:", error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Error canceling notifications:", error);
    }
  }

  /**
   * Add notification response listener
   */
  static addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void,
  ): Notifications.EventSubscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  /**
   * Add notification received listener
   */
  static addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void,
  ): Notifications.EventSubscription {
    return Notifications.addNotificationReceivedListener(callback);
  }
}
