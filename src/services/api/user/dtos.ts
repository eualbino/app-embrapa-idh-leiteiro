export interface UserProfile {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
  createdAt: string;
}

export interface PropertySummary {
  id: string;
  userId: string;
  country: string;
  state: string;
  city: string;
  productionSystem: string;
  totalAreaHa: number;
  pastureAreaHa: number;
  silageAreaHa: number;
  lactatingCows: number;
  dryCows: number;
  heifersOver12M: number;
  calvesUnder12M: number;
  steers: number;
  bulls: number;
  milkLitersPerDayProperty: number;
  milkLitersPerCowDay: number;
  milkFatPercentage: number;
  milkProteinPercentage: number;
  roughageKgPerCow: number;
  concentrateKgPerCow: number;
  feedUnit: string;
  monthlyEnergyKWh: number;
  hasPhotovoltaicEnergy: boolean;
  hasEnvironmentalLicense: string;
  hasWaterGrant: string;
  createdAt: string;
  updatedAt: string;
  waterManagementScore: number;
  waterQualityConservationScore: number;
  wasteManagementScore: number;
  waterPerformanceIndexScore: number;
}

export interface GetMeResponse {
  user: UserProfile;
  properties: PropertySummary[];
}
