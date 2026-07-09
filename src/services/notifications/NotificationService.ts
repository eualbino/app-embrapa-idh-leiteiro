import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIFICATION_SCHEDULED_KEY = "@app:sync_notification_scheduled";
const FORM_COMPLETED_OFFLINE_KEY = "@app:form_completed_offline";
const NOTIFICATION_PERMISSION_REQUESTED_KEY =
  "@app:notification_permission_requested";

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

  static async markPermissionRequested(): Promise<void> {
    try {
      await AsyncStorage.setItem(NOTIFICATION_PERMISSION_REQUESTED_KEY, "true");
    } catch (error) {
      console.error("Error marking permission requested:", error);
    }
  }

  static async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

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

      const { status } = await Notifications.requestPermissionsAsync();

      await this.markPermissionRequested();

      if (status !== "granted") {
        return false;
      }

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

  static async wasFormCompletedOffline(): Promise<boolean> {
    try {
      const value = await AsyncStorage.getItem(FORM_COMPLETED_OFFLINE_KEY);
      return value === "true";
    } catch (error) {
      console.error("Error checking form completed offline:", error);
      return false;
    }
  }

  static async clearFormCompletedOffline(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FORM_COMPLETED_OFFLINE_KEY);
    } catch (error) {
      console.error("Error clearing form completed offline:", error);
    }
  }

  static async sendSyncReminderNotification(): Promise<void> {
    try {
      const alreadyScheduled = await AsyncStorage.getItem(
        NOTIFICATION_SCHEDULED_KEY,
      );
      if (alreadyScheduled) {
        const scheduledTime = parseInt(alreadyScheduled, 10);
        const hoursSinceScheduled =
          (Date.now() - scheduledTime) / (1000 * 60 * 60);

        if (hoursSinceScheduled < 1) {
          return;
        }
      }

      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "📱 Dados prontos para sincronizar!",
          body: "Você completou o formulário offline. Abra o app e faça login para sincronizar seus dados.",
          data: { type: "sync_reminder" },
          sound: true,
        },
        trigger: null,
      });

      await AsyncStorage.setItem(
        NOTIFICATION_SCHEDULED_KEY,
        Date.now().toString(),
      );
    } catch (error) {
      console.error("Error sending sync reminder notification:", error);
    }
  }

  static async clearNotificationScheduled(): Promise<void> {
    try {
      await AsyncStorage.removeItem(NOTIFICATION_SCHEDULED_KEY);
    } catch (error) {
      console.error("Error clearing notification scheduled flag:", error);
    }
  }

  static async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Error canceling notifications:", error);
    }
  }


  static addNotificationResponseListener(
    callback: (response: Notifications.NotificationResponse) => void,
  ): Notifications.EventSubscription {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }

  static addNotificationReceivedListener(
    callback: (notification: Notifications.Notification) => void,
  ): Notifications.EventSubscription {
    return Notifications.addNotificationReceivedListener(callback);
  }
}
