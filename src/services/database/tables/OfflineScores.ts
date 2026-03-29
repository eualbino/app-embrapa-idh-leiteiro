import { getDatabase } from "../connection";

type ScoreRow = {
  property_id: string;
  final_score: number;
  macro_indicators: string;
  weights: string | null;
  details: string | null;
  timestamp: number;
};

export async function saveScores(
  propertyId: string,
  finalScore: number,
  macroIndicators: string,
  weights: string | null,
  details: string | null,
  timestamp: number,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_scores WHERE property_id = ?`, [propertyId]);
  await db.runAsync(
    `INSERT INTO offline_scores (property_id, final_score, macro_indicators, weights, details, timestamp) VALUES (?, ?, ?, ?, ?, ?)`,
    [propertyId, finalScore, macroIndicators, weights, details, timestamp],
  );
}

export async function getScores(propertyId?: string): Promise<{
  propertyId: string;
  finalScore: number;
  macroIndicators: string;
  weights: string | null;
  details: string | null;
  timestamp: number;
} | null> {
  const db = await getDatabase();
  const result = propertyId
    ? await db.getFirstAsync<ScoreRow>(
      `SELECT * FROM offline_scores WHERE property_id = ? ORDER BY id DESC LIMIT 1`,
      [propertyId],
    )
    : await db.getFirstAsync<ScoreRow>(
      `SELECT * FROM offline_scores ORDER BY id DESC LIMIT 1`,
    );

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

export async function clearScores(): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(`DELETE FROM offline_scores`);
}
