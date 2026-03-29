// Services
import {
  OfflineStorage,
  OfflineProperty,
  OfflineAnswers,
  OfflineScores,
  AppSettings,
} from "@/src/services/database";

// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

const OFFLINE_PROPERTY_ID_KEY = "offline_property_id";
const PENDING_SYNC_KEY = "pending_sync";
const FORM_COMPLETED_OFFLINE_KEY = "form_completed_offline";
const OFFLINE_MODE_KEY = "offline_mode";

export interface OfflinePropertyData {
  formData: FormData;
  timestamp: number;
}

export interface OfflineAnswersData {
  answers: { [key: string]: number | null };
  timestamp: number;
}

export interface PendingSyncData {
  hasPropertyToSync: boolean;
  hasAnswersToSync: boolean;
  propertyId?: string;
}

export interface OfflineScoresData {
  propertyId: string;
  finalScore: number;
  macroIndicators: {
    quantidadeAgua: number;
    qualidadeAgua: number;
    manejoResiduos: number;
  };
  weights?: {
    quantidadeAgua: number;
    qualidadeAgua: number;
    manejoResiduos: number;
  };
  details?: any;
  timestamp: number;
}

export class OfflineSyncService {
  static async saveOfflineProperty(formData: FormData): Promise<void> {
    try {
      await OfflineProperty.saveProperty(JSON.stringify(formData), Date.now());
      await this.setPendingSync(true, false);
    } catch (error) {
      console.error("Erro ao salvar propriedade offline:", error);
      throw error;
    }
  }

  static async saveOfflineAnswers(answers: { [key: string]: number | null }): Promise<void> {
    try {
      await OfflineAnswers.saveAnswers(JSON.stringify(answers), Date.now());
    } catch (error) {
      console.error("Erro ao salvar respostas offline:", error);
      throw error;
    }
  }

  static async saveOfflinePropertyId(propertyId: string): Promise<void> {
    try {
      await OfflineStorage.setItem(OFFLINE_PROPERTY_ID_KEY, propertyId);
    } catch (error) {
      console.error("Erro ao salvar propertyId offline:", error);
      throw error;
    }
  }

  static async getOfflineProperty(): Promise<OfflinePropertyData | null> {
    try {
      const result = await OfflineProperty.getProperty();
      if (!result) return null;
      return {
        formData: JSON.parse(result.formData) as FormData,
        timestamp: result.timestamp,
      };
    } catch (error) {
      console.error("Erro ao recuperar propriedade offline:", error);
      return null;
    }
  }

  static async getOfflineAnswers(): Promise<OfflineAnswersData | null> {
    try {
      const result = await OfflineAnswers.getAnswers();
      if (!result) return null;
      return {
        answers: JSON.parse(result.answers) as { [key: string]: number | null },
        timestamp: result.timestamp,
      };
    } catch (error) {
      console.error("Erro ao recuperar respostas offline:", error);
      return null;
    }
  }

  static async getOfflinePropertyId(): Promise<string | null> {
    try {
      return await OfflineStorage.getItem(OFFLINE_PROPERTY_ID_KEY);
    } catch (error) {
      console.error("Erro ao recuperar propertyId offline:", error);
      return null;
    }
  }

  static async saveOfflineScores(
    propertyId: string,
    finalScore: number,
    macroIndicators: {
      quantidadeAgua: number;
      qualidadeAgua: number;
      manejoResiduos: number;
    },
    weights?: {
      quantidadeAgua: number;
      qualidadeAgua: number;
      manejoResiduos: number;
    },
    details?: any,
  ): Promise<void> {
    try {
      await OfflineScores.saveScores(
        propertyId,
        finalScore,
        JSON.stringify(macroIndicators),
        weights ? JSON.stringify(weights) : null,
        details ? JSON.stringify(details) : null,
        Date.now(),
      );
    } catch (error) {
      console.error("Erro ao salvar scores offline:", error);
      throw error;
    }
  }

  static async getOfflineScores(): Promise<OfflineScoresData | null> {
    try {
      const result = await OfflineScores.getScores();
      if (!result) return null;
      return {
        propertyId: result.propertyId,
        finalScore: result.finalScore,
        macroIndicators: JSON.parse(result.macroIndicators),
        weights: result.weights ? JSON.parse(result.weights) : undefined,
        details: result.details ? JSON.parse(result.details) : undefined,
        timestamp: result.timestamp,
      };
    } catch (error) {
      console.error("Erro ao recuperar scores offline:", error);
      return null;
    }
  }

  static async clearOfflineScores(): Promise<void> {
    try {
      await OfflineScores.clearScores();
    } catch (error) {
      console.error("Erro ao limpar scores offline:", error);
      throw error;
    }
  }

  static async setPendingSync(
    hasPropertyToSync: boolean,
    hasAnswersToSync: boolean,
    propertyId?: string,
  ): Promise<void> {
    try {
      const data: PendingSyncData = { hasPropertyToSync, hasAnswersToSync, propertyId };
      await OfflineStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao marcar pending sync:", error);
      throw error;
    }
  }

  static async getPendingSync(): Promise<PendingSyncData | null> {
    try {
      const data = await OfflineStorage.getItem(PENDING_SYNC_KEY);
      if (!data) return null;
      return JSON.parse(data) as PendingSyncData;
    } catch (error) {
      return null;
    }
  }

  static async clearOfflineData(): Promise<void> {
    try {
      await OfflineProperty.clearProperty();
      await OfflineAnswers.clearAnswers();
      await OfflineScores.clearScores();
      await OfflineStorage.multiRemove([OFFLINE_PROPERTY_ID_KEY, PENDING_SYNC_KEY]);
    } catch (error) {
      console.error("Erro ao limpar dados offline:", error);
      throw error;
    }
  }

  static async clearOfflineProperty(): Promise<void> {
    try {
      await OfflineProperty.clearProperty();
    } catch (error) {
      console.error("Erro ao limpar propriedade offline:", error);
      throw error;
    }
  }

  static generateTempPropertyId(): string {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static isTempPropertyId(propertyId: string): boolean {
    return propertyId.startsWith("temp_");
  }

  static async markFormCompletedOffline(): Promise<void> {
    try {
      await AppSettings.setSetting(FORM_COMPLETED_OFFLINE_KEY, "true");
    } catch (error) {
      console.error("Erro ao marcar formulário completado offline:", error);
    }
  }

  static async wasFormCompletedOffline(): Promise<boolean> {
    try {
      const value = await AppSettings.getSetting(FORM_COMPLETED_OFFLINE_KEY);
      return value === "true";
    } catch (error) {
      return false;
    }
  }

  static async clearFormCompletedOffline(): Promise<void> {
    try {
      await AppSettings.removeSetting(FORM_COMPLETED_OFFLINE_KEY);
    } catch (error) {
      console.error("Erro ao limpar flag de formulário completado:", error);
    }
  }

  static async setOfflineMode(isOffline: boolean): Promise<void> {
    try {
      if (isOffline) {
        await AppSettings.setSetting(OFFLINE_MODE_KEY, "true");
      } else {
        await AppSettings.removeSetting(OFFLINE_MODE_KEY);
      }
    } catch (error) {
      console.error("Erro ao definir modo offline:", error);
      throw error;
    }
  }

  static async isInOfflineMode(): Promise<boolean> {
    try {
      const value = await AppSettings.getSetting(OFFLINE_MODE_KEY);
      return value === "true";
    } catch (error) {
      return false;
    }
  }
}
