import { getDatabase } from "../connection";

export async function saveProperty(formData: string, timestamp: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_property`);
  await db.runAsync(
    `INSERT INTO offline_property (form_data, timestamp) VALUES (?, ?)`,
    [formData, timestamp],
  );
}

export async function getProperty(): Promise<{ formData: string; timestamp: number } | null> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ form_data: string; timestamp: number }>(
    `SELECT form_data, timestamp FROM offline_property ORDER BY id DESC LIMIT 1`,
  );
  if (!result) return null;
  return { formData: result.form_data, timestamp: result.timestamp };
}

export async function clearProperty(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_property`);
}
