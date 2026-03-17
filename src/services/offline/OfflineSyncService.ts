import { DatabaseService } from "@/src/services/database";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys para armazenamento genérico (compatibilidade)
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

/**
 * Serviço de sincronização offline usando SQLite
 * Os dados são persistidos em banco de dados local que NÃO é apagado ao limpar cache do app
 */
export class OfflineSyncService {
  /**
   * Salva os dados da propriedade no SQLite
   */
  static async saveOfflineProperty(formData: FormData): Promise<void> {
    try {
      const timestamp = Date.now();
      await DatabaseService.saveProperty(JSON.stringify(formData), timestamp);
      await this.setPendingSync(true, false);
    } catch (error) {
      console.error("Erro ao salvar propriedade offline:", error);
      throw error;
    }
  }

  /**
   * Salva as respostas do questionário no SQLite
   */
  static async saveOfflineAnswers(answers: {
    [key: string]: number | null;
  }): Promise<void> {
    try {
      const timestamp = Date.now();
      await DatabaseService.saveAnswers(JSON.stringify(answers), timestamp);
    } catch (error) {
      console.error("Erro ao salvar respostas offline:", error);
      throw error;
    }
  }

  /**
   * Salva um propertyId temporário (gerado localmente ou recebido após sync)
   */
  static async saveOfflinePropertyId(propertyId: string): Promise<void> {
    try {
      await DatabaseService.setItem(OFFLINE_PROPERTY_ID_KEY, propertyId);
    } catch (error) {
      console.error("Erro ao salvar propertyId offline:", error);
      throw error;
    }
  }

  /**
   * Recupera os dados da propriedade salvos offline
   */
  static async getOfflineProperty(): Promise<OfflinePropertyData | null> {
    try {
      const result = await DatabaseService.getProperty();
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

  /**
   * Recupera as respostas salvas offline
   */
  static async getOfflineAnswers(): Promise<OfflineAnswersData | null> {
    try {
      const result = await DatabaseService.getAnswers();
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

  /**
   * Recupera o propertyId salvo offline
   */
  static async getOfflinePropertyId(): Promise<string | null> {
    try {
      return await DatabaseService.getItem(OFFLINE_PROPERTY_ID_KEY);
    } catch (error) {
      console.error("Erro ao recuperar propertyId offline:", error);
      return null;
    }
  }

  /**
   * Salva os scores (resultados do IDH) no SQLite para uso offline
   */
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
      await DatabaseService.saveScores(
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

  /**
   * Recupera os scores salvos offline
   */
  static async getOfflineScores(): Promise<OfflineScoresData | null> {
    try {
      const result = await DatabaseService.getScores();
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

  /**
   * Limpa os scores salvos offline
   */
  static async clearOfflineScores(): Promise<void> {
    try {
      await DatabaseService.clearScores();
    } catch (error) {
      console.error("Erro ao limpar scores offline:", error);
      throw error;
    }
  }

  /**
   * Marca se há dados pendentes de sincronização
   */
  static async setPendingSync(
    hasPropertyToSync: boolean,
    hasAnswersToSync: boolean,
    propertyId?: string,
  ): Promise<void> {
    try {
      const data: PendingSyncData = {
        hasPropertyToSync,
        hasAnswersToSync,
        propertyId,
      };
      await DatabaseService.setItem(PENDING_SYNC_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao marcar pending sync:", error);
      throw error;
    }
  }

  /**
   * Verifica se há dados pendentes de sincronização
   */
  static async getPendingSync(): Promise<PendingSyncData | null> {
    try {
      const data = await DatabaseService.getItem(PENDING_SYNC_KEY);
      if (!data) return null;

      return JSON.parse(data) as PendingSyncData;
    } catch (error) {
      return null;
    }
  }

  /**
   * Limpa todos os dados offline após sincronização bem-sucedida
   */
  static async clearOfflineData(): Promise<void> {
    try {
      await DatabaseService.clearAllOfflineData();
      await DatabaseService.multiRemove([
        OFFLINE_PROPERTY_ID_KEY,
        PENDING_SYNC_KEY,
      ]);
    } catch (error) {
      console.error("Erro ao limpar dados offline:", error);
      throw error;
    }
  }

  /**
   * Limpa apenas os dados da propriedade após sync
   */
  static async clearOfflineProperty(): Promise<void> {
    try {
      await DatabaseService.clearProperty();
    } catch (error) {
      console.error("Erro ao limpar propriedade offline:", error);
      throw error;
    }
  }

  /**
   * Gera um ID temporário para a propriedade (usado no modo offline)
   */
  static generateTempPropertyId(): string {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Verifica se um propertyId é temporário
   */
  static isTempPropertyId(propertyId: string): boolean {
    return propertyId.startsWith("temp_");
  }

  /**
   * Marca que o formulário foi completado enquanto offline
   */
  static async markFormCompletedOffline(): Promise<void> {
    try {
      await DatabaseService.setSetting(FORM_COMPLETED_OFFLINE_KEY, "true");
    } catch (error) {
      console.error("Erro ao marcar formulário completado offline:", error);
    }
  }

  /**
   * Verifica se o formulário foi completado offline
   */
  static async wasFormCompletedOffline(): Promise<boolean> {
    try {
      const value = await DatabaseService.getSetting(
        FORM_COMPLETED_OFFLINE_KEY,
      );
      return value === "true";
    } catch (error) {
      return false;
    }
  }

  /**
   * Limpa a flag de formulário completado offline
   */
  static async clearFormCompletedOffline(): Promise<void> {
    try {
      await DatabaseService.removeSetting(FORM_COMPLETED_OFFLINE_KEY);
    } catch (error) {
      console.error("Erro ao limpar flag de formulário completado:", error);
    }
  }

  /**
   * Marca que o usuário está em modo offline (não logado)
   */
  static async setOfflineMode(isOffline: boolean): Promise<void> {
    try {
      if (isOffline) {
        await DatabaseService.setSetting(OFFLINE_MODE_KEY, "true");
      } else {
        await DatabaseService.removeSetting(OFFLINE_MODE_KEY);
      }
    } catch (error) {
      // Log detailed error for diagnosis
      console.error("Erro ao definir modo offline (DatabaseService):", error);

      // Fallback: persist the offline flag in AsyncStorage to avoid native SQLite failures
      try {
        if (isOffline) {
          await AsyncStorage.setItem(OFFLINE_MODE_KEY, "true");
        } else {
          await AsyncStorage.removeItem(OFFLINE_MODE_KEY);
        }
        console.warn("Offline mode persisted via AsyncStorage fallback.");
      } catch (asError) {
        console.error(
          "Erro no fallback ao definir modo offline com AsyncStorage:",
          asError,
        );
      }
    }
  }

  /**
   * Verifica se o usuário está em modo offline
   */
  static async isInOfflineMode(): Promise<boolean> {
    try {
      const value = await DatabaseService.getSetting(OFFLINE_MODE_KEY);
      return value === "true";
    } catch (error) {
      return false;
    }
  }
}
