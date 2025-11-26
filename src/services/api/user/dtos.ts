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
  productionSystem: string;
  totalAreaHa: number;
  city: string;
  country: string;
  createdAt: string;
  waterManagementScore: number | null;
  waterQualityConservationScore: number | null;
  wasteManagementScore: number | null;
  waterPerformanceIndexScore: number | null;
}

export interface GetMeResponse {
  user: UserProfile;
  properties: PropertySummary[];
}
