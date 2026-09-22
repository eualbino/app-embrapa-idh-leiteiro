import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../http";
import { PropertyHistory } from "../../database";
import { AuthService } from "../auth";
import type {
  GetMeResponse,
  UserProfile,
  PropertySummary,
  UsuarioResponse,
} from "./dtos";
import type { PropertyApiResponse, RetrievePageResponse } from "../property/dtos";
import type { WaterPerformanceIndexApiResponse } from "../questionnaire/water-performance-index/dtos";

const USER_PROFILE_KEY = "@app:userProfile";
const USER_PROPERTIES_KEY = "@app:userProperties";

// Deduplica varreduras paginadas concorrentes da mesma entidade (ex: login + sync
// chamando getMe() quase ao mesmo tempo não disparam duas varreduras completas).
const inFlightFetches = new Map<string, Promise<any[]>>();

async function fetchAllPages<T>(entity: string): Promise<T[]> {
  const existing = inFlightFetches.get(entity);
  if (existing) return existing as Promise<T[]>;

  const promise = (async (): Promise<T[]> => {
    const items: T[] = [];
    let page = 1;
    while (true) {
      const res = await api.post<RetrievePageResponse<T>>("/retrievePage", {
        entity,
        page: String(page),
      });
      const pageItems = res.data.data;
      if (pageItems.length === 0) break;
      items.push(...pageItems);
      page++;
    }
    return items;
  })();

  inFlightFetches.set(entity, promise);
  try {
    return await promise;
  } finally {
    inFlightFetches.delete(entity);
  }
}

export class UserService {
  static async saveUserProfile(profile: UserProfile): Promise<void> {
    await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  }

  static async loadUserProfile(): Promise<UserProfile | null> {
    const raw = await AsyncStorage.getItem(USER_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  }

  static async saveProperties(properties: PropertySummary[]): Promise<void> {
    await AsyncStorage.setItem(USER_PROPERTIES_KEY, JSON.stringify(properties));
  }

  static async loadProperties(): Promise<PropertySummary[]> {
    const raw = await AsyncStorage.getItem(USER_PROPERTIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PropertySummary[];
  }

  static async getMe(): Promise<GetMeResponse> {
    const response = await api.get<UsuarioResponse>("/usuario");
    const usuario = response.data;

    const storedProfile = await UserService.loadUserProfile();

    const user: UserProfile = {
      id: usuario.usersId ?? storedProfile?.id ?? 0,
      usuariosCadastroId: usuario.idt ?? storedProfile?.usuariosCadastroId,
      name: usuario.nome,
      email: usuario.email,
      cpf: usuario.matricula ?? storedProfile?.cpf ?? "",
      phone: storedProfile?.phone,
      role: storedProfile?.role ?? "USER",
      createdAt: storedProfile?.createdAt ?? new Date().toISOString(),
    };

    await UserService.saveUserProfile(user);

    let properties: PropertySummary[] = [];
    try {
      properties = await UserService.fetchPropertiesByUserId(user.id);
      await UserService.saveProperties(properties);
      try {
        await PropertyHistory.saveProperties(user.id, properties);
      } catch (error) {
        console.error("Erro ao salvar histórico de propriedades:", error);
        // não bloqueia o fluxo principal
      }
    } catch (error) {
      console.error("Erro ao buscar propriedades do usuário:", error);
      properties = await UserService.loadProperties();
    }

    return { user, properties };
  }

  static async fetchPropertiesByUserId(userId: number): Promise<PropertySummary[]> {
    if (!userId) return [];

    // Dispara as duas varreduras em paralelo (são entidades independentes)
    // em vez de esperar uma terminar pra começar a outra.
    const [allProperties, allWpi] = await Promise.all([
      fetchAllPages<PropertyApiResponse>("Properties"),
      fetchAllPages<WaterPerformanceIndexApiResponse>("WaterPerformanceIndex"),
    ]);
    const matchedRaw = allProperties.filter((p) => Number(p.userId) === Number(userId));

    if (matchedRaw.length === 0) return [];

    const matched: PropertySummary[] = matchedRaw.map((p) => ({
      id: p.id,
      userId: p.userId,
      country: p.country,
      state: p.state,
      city: p.city,
      productionSystem: p.productionSystem,
      totalAreaHa: p.totalAreaHa,
      pastureAreaHa: p.pastureAreaHa ?? 0,
      silageAreaHa: p.silageAreaHa ?? 0,
      lactatingCows: p.lactatingCows ?? 0,
      dryCows: p.dryCows ?? 0,
      heifersOver12M: p.heifersOver12m ?? 0,
      calvesUnder12M: p.calvesUnder12m ?? 0,
      steers: p.steers ?? 0,
      bulls: p.bulls ?? 0,
      milkLitersPerDayProperty: p.milkLitersPerDayProperty ?? 0,
      milkLitersPerCowDay: p.milkLitersPerCowDay ?? 0,
      milkFatPercentage: p.milkFatPercentage ?? 0,
      milkProteinPercentage: p.milkProteinPercentage ?? 0,
      roughageKgPerCow: p.roughageKgPerCow ?? 0,
      concentrateKgPerCow: p.concentrateKgPerCow ?? 0,
      feedUnit: p.feedUnit ?? "",
      monthlyEnergyKwh: p.monthlyEnergyKwh ?? 0,
      hasPhotovoltaicEnergy: p.hasPhotovoltaicEnergy,
      hasEnvironmentalLicense: p.hasEnvironmentalLicense ?? "",
      hasWaterGrant: p.hasWaterGrant ?? "",
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    // Junta os scores do WaterPerformanceIndex já buscado acima
    const wpiMap = new Map<number, WaterPerformanceIndexApiResponse>();
    allWpi.forEach((w) => wpiMap.set(Number(w.propertyId), w));

    return matched.map((p) => {
      const wpi = wpiMap.get(p.id);
      if (!wpi) return p;
      return {
        ...p,
        waterManagementScore: wpi.waterManagementScore,
        waterQualityConservationScore: wpi.waterQualityConservationScore,
        wasteManagementScore: wpi.wasteManagementScore,
        waterPerformanceIndexScore: wpi.finalScore,
      };
    });
  }

  static async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const storedProfile = await UserService.loadUserProfile();
    if (!storedProfile?.id || !storedProfile?.email) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    try {
      await AuthService.login({
        username: storedProfile.email,
        password: currentPassword,
      });
    } catch (error: any) {
      console.error("Erro ao verificar senha atual:", error);
      const status = error?.response?.status;
      if (status === 401 || status === 404 || status === 400) {
        throw new Error("WRONG_CURRENT_PASSWORD");
      }
      throw error;
    }

    if (storedProfile.usuariosCadastroId) {
      await api.post("/update", {
        entity: "UsuariosCadastro",
        idValue: storedProfile.usuariosCadastroId.toString(),
        data: {
          idt: storedProfile.usuariosCadastroId,
          matricula: storedProfile.cpf,
          email: storedProfile.email,
          nome: storedProfile.name,
          senha: newPassword,
        },
      });
    }
  }

  /**
   * Exclusão de conta iniciada pelo usuário.
   *
   * Exigida pela App Store (Guideline 5.1.1(v)) e pelo Google Play: a conta
   * precisa ser encerrada de dentro do app, sem depender de atendimento.
   *
   * Escopo, por decisão da Embrapa: apaga a CONTA, não os dados de avaliação.
   * Nome, e-mail e CPF são removidos de `UsuariosCadastro` e de `Users`, e o
   * acesso é cortado na hora. As propriedades e os índices hídricos ficam,
   * desvinculados de qualquer dado pessoal, para a pesquisa.
   *
   * Por isso a linha em `Users` é anonimizada e NÃO apagada: `Properties.userId`
   * aponta para ela, e removê-la deixaria as avaliações órfãs.
   *
   * Usa o token do próprio usuário (cliente `api`), nunca o token de admin.
   */
  static async deleteAccount(currentPassword: string): Promise<void> {
    const storedProfile = await UserService.loadUserProfile();
    if (!storedProfile?.id || !storedProfile?.email) {
      throw new Error("PROFILE_NOT_FOUND");
    }
    if (!storedProfile.usuariosCadastroId) {
      throw new Error("PROFILE_NOT_FOUND");
    }

    // Reautenticação, mesmo mecanismo usado em changePassword.
    try {
      await AuthService.login({
        username: storedProfile.email,
        password: currentPassword,
      });
    } catch (error: any) {
      console.error(
        "Erro ao verificar senha na exclusão de conta. status:",
        error?.response?.status,
      );
      const status = error?.response?.status;
      if (status === 401 || status === 404 || status === 400) {
        throw new Error("WRONG_CURRENT_PASSWORD");
      }
      throw error;
    }

    const cadastroId = storedProfile.usuariosCadastroId;

    // Avisa a Embrapa antes de anonimizar, enquanto os dados ainda permitem
    // identificar o cadastro a ser removido. É best-effort de propósito: uma
    // falha de e-mail não pode impedir o usuário de encerrar a conta, que é
    // justamente o que as lojas exigem.
    try {
      await api.post("/solicitarExclusaoConta", {
        usuariosCadastroId: cadastroId,
        usersId: storedProfile.id,
        nome: storedProfile.name,
        email: storedProfile.email,
        solicitadoEm: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error(
        "Falha ao notificar a Embrapa sobre exclusão de conta. status:",
        error?.response?.status,
      );
    }

    // Valores derivados do id, para não colidir com as constraints de
    // unicidade de e-mail e matrícula.
    const anonimo = `removido-${cadastroId}`;
    const emailAnonimo = `${anonimo}@conta-removida.invalid`;

    // 1º: `Users`, que guarda nome, e-mail e CPF do perfil. A linha permanece
    // (ver comentário do método) — só os campos pessoais são sobrescritos.
    // Precisa vir antes de desativar o cadastro, que é o que corta o acesso.
    await api.post("/update", {
      entity: "Users",
      idValue: String(storedProfile.id),
      data: {
        id: storedProfile.id,
        name: "Conta removida",
        email: emailAnonimo,
        cpf: null,
        role: storedProfile.role,
        createdAt: storedProfile.createdAt,
        usuariosCadastroId: cadastroId,
      },
    });

    // 2º: as credenciais. `stsativo: false` encerra o acesso.
    await api.post("/update", {
      entity: "UsuariosCadastro",
      idValue: String(cadastroId),
      data: {
        idt: cadastroId,
        matricula: anonimo,
        email: emailAnonimo,
        nome: "Conta removida",
        senha: `${anonimo}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        stsativo: false,
      },
    });
  }
}
