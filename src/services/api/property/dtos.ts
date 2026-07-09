export interface CreatePropertyRequest {
  country: string;
  state: string | null;
  city: string | null;
  productionSystem: ProductionSystemType;
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
  feedUnit: FeedUnitType;
  monthlyEnergyKwh: number;
  hasPhotovoltaicEnergy: boolean;
  hasEnvironmentalLicense: LicenseStatusType;
  hasWaterGrant: LicenseStatusType;
}

export interface Property {
  id: number;
  userId: number;
  country: string;
  state: string;
  city: string;
  productionSystem: string;
  totalAreaHa: number;
  pastureAreaHa?: number;
  silageAreaHa?: number;
  lactatingCows?: number;
  dryCows?: number;
  heifersOver12M?: number;
  calvesUnder12M?: number;
  steers?: number;
  bulls?: number;
  milkLitersPerDayProperty?: number;
  milkLitersPerCowDay?: number;
  milkFatPercentage?: number;
  milkProteinPercentage?: number;
  roughageKgPerCow?: number;
  concentrateKgPerCow?: number;
  feedUnit?: string;
  monthlyEnergyKwh?: number;
  hasPhotovoltaicEnergy?: boolean;
  hasEnvironmentalLicense?: string;
  hasWaterGrant?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePropertyResponse {
  property: Property;
}

export type ProductionSystemType =
  | "PASTO"
  | "PASTO_SUPLEMENTADO"
  | "CONFINADO"
  | "CONFINADO_MISTO"
  | "OUTRO";

export type FeedUnitType = "MATERIA_NATURAL" | "MATERIA_SECA";

export type LicenseStatusType = "SIM" | "NAO" | "DISPENSA" | null;

export interface PropertyApiResponse {
  id: number;
  userId: number;
  country: string;
  state: string;
  city: string;
  productionSystem: string;
  totalAreaHa: number;
  pastureAreaHa: number | null;
  silageAreaHa: number | null;
  lactatingCows: number | null;
  dryCows: number | null;
  heifersOver12m: number | null;
  calvesUnder12m: number | null;
  steers: number | null;
  bulls: number | null;
  milkLitersPerDayProperty: number | null;
  milkLitersPerCowDay: number | null;
  milkFatPercentage: number | null;
  milkProteinPercentage: number | null;
  roughageKgPerCow: number | null;
  concentrateKgPerCow: number | null;
  feedUnit: string | null;
  monthlyEnergyKwh: number | null;
  hasPhotovoltaicEnergy: boolean;
  hasEnvironmentalLicense: string | null;
  hasWaterGrant: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RetrievePageResponse<T> {
  totalPages: number;
  page: number;
  data: T[];
}
