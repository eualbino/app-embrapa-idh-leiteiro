// Types
import type { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import type { CreatePropertyRequest } from "@/src/services/api/property";

export function mapFormDataToPropertyRequest(formData: FormData): CreatePropertyRequest {
  let productionSystem: CreatePropertyRequest["productionSystem"] = "PASTO";

  switch (formData.sistemaProducao.tipo) {
    case "exclusivamente_pasto":
      productionSystem = "PASTO";
      break;
    case "pasto_suplementacao":
      productionSystem = "PASTO_SUPLEMENTADO";
      break;
    case "confinado_sem_pasto":
      productionSystem = "CONFINADO";
      break;
    case "confinado_vacas_lactacao":
      productionSystem = "CONFINADO_MISTO";
      break;
    case "outro":
      productionSystem = "OUTRO";
      break;
  }

  const feedUnit: "MATERIA_NATURAL" | "MATERIA_SECA" =
    formData.consumoDiario.unidadeInformada === "materia_natural"
      ? "MATERIA_NATURAL"
      : "MATERIA_SECA";

  const mapLicenseStatus = (status: string | null): "SIM" | "NAO" | "DISPENSA" => {
    if (!status) return "DISPENSA";
    const normalizedStatus = status.toLowerCase().trim();
    if (normalizedStatus === "sim") return "SIM";
    if (normalizedStatus === "nao") return "NAO";
    if (normalizedStatus === "nao_se_aplica") return "DISPENSA";
    return "DISPENSA";
  };

  return {
    country: formData.localizacao.pais,
    state: formData.localizacao.estado || "",
    city: formData.localizacao.cidade || "",
    productionSystem,
    totalAreaHa: formData.area.propriedade,
    pastureAreaHa: formData.area.pastagem,
    silageAreaHa: formData.area.silagem,
    lactatingCows: formData.rebanho.vacasLactacao,
    dryCows: formData.rebanho.vacasSecas,
    heifersOver12M: formData.rebanho.novilhas,
    calvesUnder12M: formData.rebanho.bezerros,
    steers: formData.rebanho.garrotes,
    bulls: formData.rebanho.bulls,
    milkLitersPerDayProperty: formData.producaoLeiteira.litrosDiaPropriedade,
    milkLitersPerCowDay: formData.producaoLeiteira.litrosVacaDia,
    milkFatPercentage: formData.composicaoLeite.percentualGordura,
    milkProteinPercentage: formData.composicaoLeite.percentualProteina,
    roughageKgPerCow: formData.consumoDiario.volumoso,
    concentrateKgPerCow: formData.consumoDiario.concentrado,
    feedUnit,
    monthlyEnergyKwh: formData.energiaEletrica.consumoMensal,
    hasPhotovoltaicEnergy: formData.energiaEletrica.temEnergiaFotovoltaica === true,
    hasEnvironmentalLicense: mapLicenseStatus(formData.legislacaoAmbiental.temLicencaAmbiental),
    hasWaterGrant: mapLicenseStatus(formData.legislacaoAmbiental.temOutorgaAgua),
  };
}
