// Services
import { getDatabase } from "../connection";

// Types
import type { PropertySummary } from "../../api/user/dtos";

export async function saveProperties(userId: number, properties: PropertySummary[]): Promise<void> {
  const db = await getDatabase();
  await db.withTransactionAsync(async () => {
    await db.runAsync("DELETE FROM property_history WHERE user_id = ?", [userId]);
    for (const p of properties) {
      await db.runAsync(
        "INSERT INTO property_history (id, user_id, property_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
        [p.id, userId, JSON.stringify(p), p.createdAt, p.updatedAt],
      );
    }
  });
}

export async function getProperties(userId: number): Promise<PropertySummary[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<{ property_json: string }>(
    "SELECT property_json FROM property_history WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
  );
  return rows.map((r) => JSON.parse(r.property_json) as PropertySummary);
}

export async function clearProperties(userId: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync("DELETE FROM property_history WHERE user_id = ?", [userId]);
}
