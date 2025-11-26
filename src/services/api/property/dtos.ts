export interface CreatePropertyRequest {
  country: string;
  city: string;
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
  monthlyEnergyKWh: number;
  hasPhotovoltaicEnergy: boolean;
  hasEnvironmentalLicense: LicenseStatusType;
  hasWaterGrant: LicenseStatusType;
}

export interface Property {
  id: string;
  userId: string;
  country: string;
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
  monthlyEnergyKWh?: number;
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
  | "PASTO_SUPLEMENTACAO"
  | "CONFINADO"
  | "CONFINADO_MISTO"
  | "OUTRO";

export type FeedUnitType = "MATERIA_NATURAL" | "MATERIA_SECA";

export type LicenseStatusType = "SIM" | "NAO" | "DISPENSA";
