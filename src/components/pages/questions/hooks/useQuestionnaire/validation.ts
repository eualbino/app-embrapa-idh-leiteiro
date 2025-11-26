import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export const validateCaracterizacaoForm = (
  data: FormData,
  t: (key: string) => string,
): string[] => {
  const errors: string[] = [];

  // Localização
  if (!data.localizacao?.cidade?.trim()) {
    errors.push(t("questionnaire.validation.cidadeRequired"));
  }
  if (!data.localizacao?.pais?.trim()) {
    errors.push(t("questionnaire.validation.paisRequired"));
  }

  // Sistema de Produção
  if (!data.sistemaProducao.tipo) {
    errors.push(t("questionnaire.validation.productionSystemRequired"));
  }

  if (
    data.sistemaProducao.tipo === "outro" &&
    !data.sistemaProducao.outroEspecificacao?.trim()
  ) {
    errors.push(t("questionnaire.validation.specifyOtherProductionSystem"));
  }

  // Área
  if (data.area.propriedade === undefined || data.area.propriedade === null) {
    errors.push(t("questionnaire.validation.farmAreaRequired"));
  }
  if (data.area.pastagem === undefined || data.area.pastagem === null) {
    errors.push(t("questionnaire.validation.pastureAreaRequired"));
  }
  if (data.area.silagem === undefined || data.area.silagem === null) {
    errors.push(t("questionnaire.validation.silageAreaRequired"));
  }

  if (
    data.area.propriedade !== undefined &&
    data.area.pastagem !== undefined &&
    data.area.silagem !== undefined
  ) {
    const somaAreas = data.area.pastagem + data.area.silagem;
    if (somaAreas > data.area.propriedade) {
      errors.push(t("questionnaire.validation.areaExceedsTotalArea"));
    }
  }

  // Rebanho
  if (
    data.rebanho.vacasLactacao === undefined ||
    data.rebanho.vacasLactacao === null
  ) {
    errors.push(t("questionnaire.validation.lactatingCowsRequired"));
  }
  if (
    data.rebanho.vacasSecas === undefined ||
    data.rebanho.vacasSecas === null
  ) {
    errors.push(t("questionnaire.validation.dryCowsRequired"));
  }
  if (data.rebanho.novilhas === undefined || data.rebanho.novilhas === null) {
    errors.push(t("questionnaire.validation.heifersRequired"));
  }
  if (data.rebanho.bezerros === undefined || data.rebanho.bezerros === null) {
    errors.push(t("questionnaire.validation.calvesRequired"));
  }
  if (data.rebanho.garrotes === undefined || data.rebanho.garrotes === null) {
    errors.push(t("questionnaire.validation.steersRequired"));
  }

  // Produção Leiteira
  if (
    data.producaoLeiteira.litrosDiaPropriedade === undefined ||
    data.producaoLeiteira.litrosDiaPropriedade === null ||
    data.producaoLeiteira.litrosDiaPropriedade === 0
  ) {
    errors.push(t("questionnaire.validation.dailyProductionRequired"));
  }

  if (
    data.producaoLeiteira.litrosVacaDia === undefined ||
    data.producaoLeiteira.litrosVacaDia === null ||
    data.producaoLeiteira.litrosVacaDia === 0
  ) {
    errors.push(t("questionnaire.validation.productionPerCowRequired"));
  } else if (data.producaoLeiteira.litrosVacaDia < 0.1) {
    errors.push(t("questionnaire.validation.productionPerCowMinimum"));
  }

  // Composição do Leite
  if (
    data.composicaoLeite.percentualGordura === undefined ||
    data.composicaoLeite.percentualGordura === null ||
    data.composicaoLeite.percentualGordura === 0
  ) {
    errors.push(t("questionnaire.validation.fatPercentageRequired"));
  }

  if (
    data.composicaoLeite.percentualProteina === undefined ||
    data.composicaoLeite.percentualProteina === null ||
    data.composicaoLeite.percentualProteina === 0
  ) {
    errors.push(t("questionnaire.validation.proteinPercentageRequired"));
  }

  // Consumo Diário
  if (
    data.consumoDiario.volumoso === undefined ||
    data.consumoDiario.volumoso === null
  ) {
    errors.push(t("questionnaire.validation.roughageConsumptionRequired"));
  }
  if (
    data.consumoDiario.concentrado === undefined ||
    data.consumoDiario.concentrado === null
  ) {
    errors.push(t("questionnaire.validation.concentrateConsumptionRequired"));
  }
  if (!data.consumoDiario.unidadeInformada) {
    errors.push(t("questionnaire.validation.consumptionUnitRequired"));
  }

  // Energia Elétrica
  if (
    data.energiaEletrica.consumoMensal === undefined ||
    data.energiaEletrica.consumoMensal === null ||
    data.energiaEletrica.consumoMensal === 0
  ) {
    errors.push(t("questionnaire.validation.electricityConsumptionRequired"));
  }

  // Legislação Ambiental
  if (!data.legislacaoAmbiental.temLicencaAmbiental) {
    errors.push(t("questionnaire.validation.environmentalLicenseRequired"));
  }
  if (!data.legislacaoAmbiental.temOutorgaAgua) {
    errors.push(t("questionnaire.validation.waterGrantRequired"));
  }

  return errors;
};
