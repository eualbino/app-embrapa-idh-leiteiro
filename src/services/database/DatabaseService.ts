import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "embrapa_idh.db";

// Singleton database instance
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Serviço de banco de dados SQLite para armazenamento persistente
 * Os dados são salvos em um arquivo SQLite que NÃO é apagado ao limpar cache do app
 */
export class DatabaseService {
  /**
   * Obtém a instância do banco de dados (cria se não existir)
   */
  static async getDatabase(): Promise<SQLite.SQLiteDatabase> {
    if (db) {
      return db;
    }

    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await this.initializeTables();
    return db;
  }

  /**
   * Inicializa as tabelas do banco de dados
   */
  private static async initializeTables(): Promise<void> {
    if (!db) return;

    // Tabela para armazenar key-value pairs (similar ao AsyncStorage)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS offline_storage (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `);

    // Tabela específica para dados de propriedade (mais estruturada)
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS offline_property (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        form_data TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        synced INTEGER DEFAULT 0
      );
    `);

    // Tabela para respostas do questionário
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS offline_answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        answers TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        synced INTEGER DEFAULT 0
      );
    `);

    // Tabela para scores/resultados
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS offline_scores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        property_id TEXT NOT NULL,
        final_score REAL NOT NULL,
        macro_indicators TEXT NOT NULL,
        weights TEXT,
        details TEXT,
        timestamp INTEGER NOT NULL
      );
    `);

    // Tabela para configurações e flags
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS app_settings (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );
    `);
  }

  /**
   * Insere ou atualiza um valor no storage genérico
   */
  static async setItem(key: string, value: string): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(
      `INSERT OR REPLACE INTO offline_storage (key, value, updated_at) VALUES (?, ?, ?)`,
      [key, value, Date.now()]
    );
  }

  /**
   * Recupera um valor do storage genérico
   */
  static async getItem(key: string): Promise<string | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{ value: string }>(
      `SELECT value FROM offline_storage WHERE key = ?`,
      [key]
    );
    return result?.value ?? null;
  }

  /**
   * Remove um item do storage genérico
   */
  static async removeItem(key: string): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`DELETE FROM offline_storage WHERE key = ?`, [key]);
  }

  /**
   * Remove múltiplos itens do storage genérico
   */
  static async multiRemove(keys: string[]): Promise<void> {
    const database = await this.getDatabase();
    const placeholders = keys.map(() => "?").join(", ");
    await database.runAsync(
      `DELETE FROM offline_storage WHERE key IN (${placeholders})`,
      keys
    );
  }

  /**
   * Salva dados de propriedade
   */
  static async saveProperty(formData: string, timestamp: number): Promise<void> {
    const database = await this.getDatabase();
    // Limpa dados anteriores não sincronizados antes de salvar novo
    await database.runAsync(`DELETE FROM offline_property WHERE synced = 0`);
    await database.runAsync(
      `INSERT INTO offline_property (form_data, timestamp, synced) VALUES (?, ?, 0)`,
      [formData, timestamp]
    );
  }

  /**
   * Recupera dados de propriedade não sincronizados
   */
  static async getProperty(): Promise<{ formData: string; timestamp: number } | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{
      form_data: string;
      timestamp: number;
    }>(`SELECT form_data, timestamp FROM offline_property WHERE synced = 0 ORDER BY id DESC LIMIT 1`);

    if (!result) return null;
    return { formData: result.form_data, timestamp: result.timestamp };
  }

  /**
   * Marca propriedade como sincronizada
   */
  static async markPropertySynced(): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`UPDATE offline_property SET synced = 1 WHERE synced = 0`);
  }

  /**
   * Limpa dados de propriedade
   */
  static async clearProperty(): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`DELETE FROM offline_property WHERE synced = 0`);
  }

  /**
   * Salva respostas do questionário
   */
  static async saveAnswers(answers: string, timestamp: number): Promise<void> {
    const database = await this.getDatabase();
    // Limpa respostas anteriores não sincronizadas
    await database.runAsync(`DELETE FROM offline_answers WHERE synced = 0`);
    await database.runAsync(
      `INSERT INTO offline_answers (answers, timestamp, synced) VALUES (?, ?, 0)`,
      [answers, timestamp]
    );
  }

  /**
   * Recupera respostas não sincronizadas
   */
  static async getAnswers(): Promise<{ answers: string; timestamp: number } | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{
      answers: string;
      timestamp: number;
    }>(`SELECT answers, timestamp FROM offline_answers WHERE synced = 0 ORDER BY id DESC LIMIT 1`);

    if (!result) return null;
    return { answers: result.answers, timestamp: result.timestamp };
  }

  /**
   * Marca respostas como sincronizadas
   */
  static async markAnswersSynced(): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`UPDATE offline_answers SET synced = 1 WHERE synced = 0`);
  }

  /**
   * Salva scores/resultados
   */
  static async saveScores(
    propertyId: string,
    finalScore: number,
    macroIndicators: string,
    weights: string | null,
    details: string | null,
    timestamp: number
  ): Promise<void> {
    const database = await this.getDatabase();
    // Limpa scores anteriores do mesmo propertyId
    await database.runAsync(`DELETE FROM offline_scores WHERE property_id = ?`, [propertyId]);
    await database.runAsync(
      `INSERT INTO offline_scores (property_id, final_score, macro_indicators, weights, details, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
      [propertyId, finalScore, macroIndicators, weights, details, timestamp]
    );
  }

  /**
   * Recupera scores por propertyId
   */
  static async getScores(propertyId?: string): Promise<{
    propertyId: string;
    finalScore: number;
    macroIndicators: string;
    weights: string | null;
    details: string | null;
    timestamp: number;
  } | null> {
    const database = await this.getDatabase();
    
    let result;
    if (propertyId) {
      result = await database.getFirstAsync<{
        property_id: string;
        final_score: number;
        macro_indicators: string;
        weights: string | null;
        details: string | null;
        timestamp: number;
      }>(`SELECT * FROM offline_scores WHERE property_id = ? ORDER BY id DESC LIMIT 1`, [propertyId]);
    } else {
      result = await database.getFirstAsync<{
        property_id: string;
        final_score: number;
        macro_indicators: string;
        weights: string | null;
        details: string | null;
        timestamp: number;
      }>(`SELECT * FROM offline_scores ORDER BY id DESC LIMIT 1`);
    }

    if (!result) return null;
    return {
      propertyId: result.property_id,
      finalScore: result.final_score,
      macroIndicators: result.macro_indicators,
      weights: result.weights,
      details: result.details,
      timestamp: result.timestamp,
    };
  }

  /**
   * Limpa scores
   */
  static async clearScores(): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`DELETE FROM offline_scores`);
  }

  /**
   * Salva uma configuração do app
   */
  static async setSetting(key: string, value: string): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(
      `INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)`,
      [key, value]
    );
  }

  /**
   * Recupera uma configuração do app
   */
  static async getSetting(key: string): Promise<string | null> {
    const database = await this.getDatabase();
    const result = await database.getFirstAsync<{ value: string }>(
      `SELECT value FROM app_settings WHERE key = ?`,
      [key]
    );
    return result?.value ?? null;
  }

  /**
   * Remove uma configuração do app
   */
  static async removeSetting(key: string): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`DELETE FROM app_settings WHERE key = ?`, [key]);
  }

  /**
   * Limpa todos os dados offline (para usar após sincronização completa)
   */
  static async clearAllOfflineData(): Promise<void> {
    const database = await this.getDatabase();
    await database.runAsync(`DELETE FROM offline_property WHERE synced = 0`);
    await database.runAsync(`DELETE FROM offline_answers WHERE synced = 0`);
    await database.runAsync(`DELETE FROM offline_scores`);
    await database.runAsync(`DELETE FROM offline_storage`);
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  static async closeDatabase(): Promise<void> {
    if (db) {
      await db.closeAsync();
      db = null;
    }
  }
}
