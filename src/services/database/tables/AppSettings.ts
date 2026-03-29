import { getDatabase } from "../connection";

export async function setSetting(key: string, value: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)`,
    [key, value],
  );
}

export async function getSetting(key: string): Promise<string | null> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM app_settings WHERE key = ?`,
    [key],
  );
  return result?.value ?? null;
}

export async function removeSetting(key: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM app_settings WHERE key = ?`, [key]);
}
