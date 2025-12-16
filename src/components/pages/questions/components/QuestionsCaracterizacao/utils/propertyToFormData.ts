import { PropertySummary } from "@/src/services/api/user";
import { FormData } from "../types";

export function propertyToFormData(property: PropertySummary): FormData {
  const productionSystemMap: { [key: string]: string } = {
    PASTO: "exclusivamente_pasto",
    PASTO_SUPLEMENTACAO: "pastagem_suplementacao",
    CONFINADO: "confinado_sem_pasto",
    CONFINADO_MISTO: "confinado_vacas_lactacao",
    OUTRO: "outro",
  };

  const sistemaProducao = productionSystemMap[property.productionSystem] || "";
  const isOutro = sistemaProducao === "outro";

  const licenseStatusMap: { [key: string]: string } = {
    SIM: "sim",
    NAO: "nao",
    DISPENSA: "nao_se_aplica",
  };

  const temLicencaAmbiental =
    licenseStatusMap[property.hasEnvironmentalLicense] || "";
  const temOutorgaAgua = licenseStatusMap[property.hasWaterGrant] || "";

  return {
    localizacao: {
      pais: property.country || "",
      cidade: property.city || "",
    },
    sistemaProducao: {
      tipo: sistemaProducao,
      outroEspecificacao: isOutro ? property.productionSystem : null,
    },
    area: {
      propriedade: property.totalAreaHa,
      pastagem: property.pastureAreaHa,
      silagem: property.silageAreaHa,
    },
    rebanho: {
      vacasLactacao: 0,
      vacasSecas: 0,
      novilhas: 0,
      bezerros: 0,
      garrotes: 0,
      bulls: 0,
    },
    producaoLeiteira: {
      litrosDiaPropriedade: 0,
      litrosVacaDia: 0,
    },
    composicaoLeite: {
      percentualGordura: 0,
      percentualProteina: 0,
    },
    consumoDiario: {
      volumoso: 0,
      concentrado: 0,
      unidadeInformada: "",
    },
    energiaEletrica: {
      consumoMensal: property.monthlyEnergyKWh,
      temEnergiaFotovoltaica: property.hasPhotovoltaicEnergy || false,
    },
    legislacaoAmbiental: {
      temLicencaAmbiental: temLicencaAmbiental,
      temOutorgaAgua: temOutorgaAgua,
    },
  };
}
