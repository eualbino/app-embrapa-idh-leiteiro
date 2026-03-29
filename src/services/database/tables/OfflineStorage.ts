import { getDatabase } from "../connection";

export async function setItem(key: string, value: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO offline_storage (key, value, updated_at) VALUES (?, ?, ?)`,
    [key, value, Date.now()],
  );
}

export async function getItem(key: string): Promise<string | null> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ value: string }>(
    `SELECT value FROM offline_storage WHERE key = ?`,
    [key],
  );
  return result?.value ?? null;
}

export async function removeItem(key: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_storage WHERE key = ?`, [key]);
}

export async function multiRemove(keys: string[]): Promise<void> {
  const db = await getDatabase();
  const placeholders = keys.map(() => "?").join(", ");
  await db.runAsync(
    `DELETE FROM offline_storage WHERE key IN (${placeholders})`,
    keys,
  );
}

export async function clearAll(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_storage`);
}
