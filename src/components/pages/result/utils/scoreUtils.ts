export interface ScoreUtilsParams {
  score: number | null;
  minimum: number;
}

export const getScoreColor = (
  score: number | null,
  minimum: number,
): string => {
  if (score === null) return "#999";
  return score >= minimum ? "#10B981" : "#EF4444";
};

export const getScoreStatus = (
  score: number | null,
  minimum: number,
  t: (key: string) => string,
): string => {
  if (score === null) return t("common.notApplicable");
  return score >= minimum
    ? t("result.approved")
    : t("result.didNotReachMinimum");
};

export const needsImprovement = (
  score: number | null,
  minimum: number,
): boolean => {
  if (score === null) return false;
  return score < minimum;
};

export const formatScore = (
  score: number | null,
  t: (key: string) => string,
): string => {
  if (score === null) return t("common.notApplicable");
  return score.toFixed(2).replace(".", ",");
};

export const hasAnyImprovement = (
  scores: {
    waterManagement: number | null;
    waterQuality: number | null;
    wasteManagement: number | null;
  },
  minimumScores: {
    waterManagement: number;
    waterQuality: number;
    wasteManagement: number;
  },
): boolean => {
  return (
    needsImprovement(scores.waterManagement, minimumScores.waterManagement) ||
    needsImprovement(scores.waterQuality, minimumScores.waterQuality) ||
    needsImprovement(scores.wasteManagement, minimumScores.wasteManagement)
  );
};

export const allScoresApproved = (
  scores: {
    waterManagement: number | null;
    waterQuality: number | null;
    wasteManagement: number | null;
  },
  minimumScores: {
    waterManagement: number;
    waterQuality: number;
    wasteManagement: number;
  },
): boolean => {
  return !hasAnyImprovement(scores, minimumScores);
};
