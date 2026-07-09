import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "embrapa_idh.db";

let db: SQLite.SQLiteDatabase | null = null;
let initPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    // Verify the connection is still alive before returning
    try {
      await db.getFirstAsync("SELECT 1");
      return db;
    } catch (error) {
      console.error("Erro ao verificar conexão com o banco:", error);
      // Native connection is stale (e.g. closed by Android lifecycle), reopen it
      db = null;
      initPromise = null;
    }
  }

  if (!initPromise) {
    initPromise = SQLite.openDatabaseAsync(DATABASE_NAME)
      .then(async (database) => {
        await initializeTables(database);
        db = database;
        return database;
      })
      .catch((error) => {
        console.error("Erro ao inicializar o banco de dados:", error);
        initPromise = null;
        throw error;
      });
  }

  return initPromise;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
    initPromise = null;
  }
}

async function initializeTables(database: SQLite.SQLiteDatabase): Promise<void> {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS offline_storage (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS offline_property (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_data TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS offline_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      answers TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS offline_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      property_id TEXT NOT NULL,
      final_score REAL NOT NULL,
      macro_indicators TEXT NOT NULL,
      weights TEXT,
      details TEXT,
      timestamp INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS property_history (
      id INTEGER PRIMARY KEY NOT NULL,
      user_id INTEGER NOT NULL,
      property_json TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
}
