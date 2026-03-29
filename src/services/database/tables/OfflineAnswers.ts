import { getDatabase } from "../connection";

export async function saveAnswers(answers: string, timestamp: number): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_answers`);
  await db.runAsync(
    `INSERT INTO offline_answers (answers, timestamp) VALUES (?, ?)`,
    [answers, timestamp],
  );
}

export async function getAnswers(): Promise<{ answers: string; timestamp: number } | null> {
  const db = await getDatabase();
  const result = await db.getFirstAsync<{ answers: string; timestamp: number }>(
    `SELECT answers, timestamp FROM offline_answers ORDER BY id DESC LIMIT 1`,
  );
  if (!result) return null;
  return { answers: result.answers, timestamp: result.timestamp };
}

export async function clearAnswers(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_answers`);
}
