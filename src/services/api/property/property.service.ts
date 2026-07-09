import { api } from "../../http";
import { UserService } from "../user";
import type { CreatePropertyRequest, CreatePropertyResponse, Property } from "./dtos";

export class PropertyService {
  static async createProperty(
    data: CreatePropertyRequest
  ): Promise<CreatePropertyResponse> {
    let userProfile = await UserService.loadUserProfile();

    if (!userProfile?.id) {
      // Cache ainda vazio (ex: sync disparado antes do getMe() do login terminar
      // de gravar o perfil). Busca direto da API antes de desistir.
      console.warn("createProperty — perfil não encontrado no cache, buscando via getMe()...");
      const { user } = await UserService.getMe();
      userProfile = user;
    }

    const userId = userProfile?.id;
    if (!userId) {
      throw new Error("Perfil do usuário não encontrado. Faça login novamente.");
    }
    const propertyData = {
      userId,
      country: data.country,
      state: data.state,
      city: data.city,
      productionSystem: data.productionSystem,
      totalAreaHa: data.totalAreaHa,
      pastureAreaHa: data.pastureAreaHa,
      silageAreaHa: data.silageAreaHa,
      lactatingCows: data.lactatingCows,
      dryCows: data.dryCows,
      heifersOver12M: data.heifersOver12M,
      calvesUnder12M: data.calvesUnder12M,
      steers: data.steers,
      bulls: data.bulls,
      milkLitersPerDayProperty: data.milkLitersPerDayProperty,
      milkLitersPerCowDay: data.milkLitersPerCowDay,
      milkFatPercentage: data.milkFatPercentage,
      milkProteinPercentage: data.milkProteinPercentage,
      roughageKgPerCow: data.roughageKgPerCow,
      concentrateKgPerCow: data.concentrateKgPerCow,
      feedUnit: data.feedUnit,
      monthlyEnergyKwh: data.monthlyEnergyKwh,
      hasPhotovoltaicEnergy: data.hasPhotovoltaicEnergy,
      hasEnvironmentalLicense: data.hasEnvironmentalLicense,
      hasWaterGrant: data.hasWaterGrant,
    };

    const response = await api.post<Property>("/update", {
      entity: "Properties",
      idValue: "",
      data: { ...propertyData, updatedAt: new Date().toISOString() },
    });

    return { property: response.data };
  }

  static async getPropertyById(propertyId: number): Promise<Property> {
    const response = await api.post<Property>("/retrieve", {
      entity: "Properties",
      idValue: String(propertyId),
    });
    return response.data;
  }
}
