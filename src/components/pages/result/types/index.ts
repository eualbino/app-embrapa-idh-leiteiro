export interface ScoreData {
  waterManagement: number | null;
  waterQuality: number | null;
  wasteManagement: number | null;
  waterPerformanceIndex: number | null;
}

export interface MinimumScores {
  waterManagement: number;
  waterQuality: number;
  wasteManagement: number;
  waterPerformanceIndex: number;
}

export interface ImprovementItem {
  title: string;
  subtitle: string;
  items: string[];
}

export interface ImprovementsData {
  waterManagement: ImprovementItem[];
  waterQuality: ImprovementItem[];
  wasteManagement: ImprovementItem[];
}
