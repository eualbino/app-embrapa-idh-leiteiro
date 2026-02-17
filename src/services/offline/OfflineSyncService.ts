import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

const OFFLINE_PROPERTY_KEY = "@app:offline_property";
const OFFLINE_ANSWERS_KEY = "@app:offline_answers";
const OFFLINE_PROPERTY_ID_KEY = "@app:offline_property_id";
const PENDING_SYNC_KEY = "@app:pending_sync";
const OFFLINE_SCORES_KEY = "@app:offline_scores";

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
  /**
   * Salva os dados da propriedade no AsyncStorage
   */
  static async saveOfflineProperty(formData: FormData): Promise<void> {
    try {
      const data: OfflinePropertyData = {
        formData,
        timestamp: Date.now(),
      };

      await AsyncStorage.setItem(OFFLINE_PROPERTY_KEY, JSON.stringify(data));

      await this.setPendingSync(true, false);
    } catch (error) {
      throw error;
    }
  }

  static async saveOfflineAnswers(answers: {
    [key: string]: number | null;
  }): Promise<void> {
    try {
      const data: OfflineAnswersData = {
        answers,
        timestamp: Date.now(),
      };

      await AsyncStorage.setItem(OFFLINE_ANSWERS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("❌ Erro ao salvar respostas offline:", error);
      throw error;
    }
  }

  /**
   * Salva um propertyId temporário (gerado localmente ou recebido após sync)
   */
  static async saveOfflinePropertyId(propertyId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(OFFLINE_PROPERTY_ID_KEY, propertyId);
    } catch (error) {
      console.error("❌ Erro ao salvar propertyId offline:", error);
      throw error;
    }
  }

  /**
   * Recupera os dados da propriedade salvos offline
   */
  static async getOfflineProperty(): Promise<OfflinePropertyData | null> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_PROPERTY_KEY);
      if (!data) return null;

      return JSON.parse(data) as OfflinePropertyData;
    } catch (error) {
      console.error("❌ Erro ao recuperar propriedade offline:", error);
      return null;
    }
  }

  /**
   * Recupera as respostas salvas offline
   */
  static async getOfflineAnswers(): Promise<OfflineAnswersData | null> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_ANSWERS_KEY);
      if (!data) return null;

      return JSON.parse(data) as OfflineAnswersData;
    } catch (error) {
      console.error("❌ Erro ao recuperar respostas offline:", error);
      return null;
    }
  }

  /**
   * Recupera o propertyId salvo offline
   */
  static async getOfflinePropertyId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(OFFLINE_PROPERTY_ID_KEY);
    } catch (error) {
      console.error("❌ Erro ao recuperar propertyId offline:", error);
      return null;
    }
  }

  /**
   * Salva os scores (resultados do IDH) no AsyncStorage para uso offline
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
      const data: OfflineScoresData = {
        propertyId,
        finalScore,
        macroIndicators,
        weights,
        details,
        timestamp: Date.now(),
      };

      await AsyncStorage.setItem(OFFLINE_SCORES_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("❌ Erro ao salvar scores offline:", error);
      throw error;
    }
  }

  /**
   * Recupera os scores salvos offline
   */
  static async getOfflineScores(): Promise<OfflineScoresData | null> {
    try {
      const data = await AsyncStorage.getItem(OFFLINE_SCORES_KEY);
      if (!data) return null;

      return JSON.parse(data) as OfflineScoresData;
    } catch (error) {
      console.error("❌ Erro ao recuperar scores offline:", error);
      return null;
    }
  }

  /**
   * Limpa os scores salvos offline
   */
  static async clearOfflineScores(): Promise<void> {
    try {
      await AsyncStorage.removeItem(OFFLINE_SCORES_KEY);
    } catch (error) {
      console.error("❌ Erro ao limpar scores offline:", error);
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

      await AsyncStorage.setItem(PENDING_SYNC_KEY, JSON.stringify(data));
    } catch (error) {
      console.error("❌ Erro ao marcar pending sync:", error);
      throw error;
    }
  }

  /**
   * Verifica se há dados pendentes de sincronização
   */
  static async getPendingSync(): Promise<PendingSyncData | null> {
    try {
      const data = await AsyncStorage.getItem(PENDING_SYNC_KEY);
      if (!data) return null;

      return JSON.parse(data) as PendingSyncData;
    } catch (error) {
      console.error("❌ Erro ao verificar pending sync:", error);
      return null;
    }
  }

  /**
   * Limpa todos os dados offline após sincronização bem-sucedida
   */
  static async clearOfflineData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        OFFLINE_PROPERTY_KEY,
        OFFLINE_ANSWERS_KEY,
        OFFLINE_PROPERTY_ID_KEY,
        PENDING_SYNC_KEY,
        OFFLINE_SCORES_KEY,
      ]);

    } catch (error) {
      console.error("❌ Erro ao limpar dados offline:", error);
      throw error;
    }
  }

  /**
   * Limpa apenas os dados da propriedade após sync
   */
  static async clearOfflineProperty(): Promise<void> {
    try {
      await AsyncStorage.removeItem(OFFLINE_PROPERTY_KEY);
    } catch (error) {
      console.error("❌ Erro ao limpar propriedade offline:", error);
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
}
