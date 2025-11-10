import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

export const validateCaracterizacaoForm = (
  data: FormData,
  t: (key: string) => string
): string[] => {
  const errors: string[] = [];

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
  if (!data.area.propriedade || data.area.propriedade === 0) {
    errors.push(t("questionnaire.validation.farmAreaRequired"));
  }
  if (!data.area.pastagem || data.area.pastagem === 0) {
    errors.push(t("questionnaire.validation.pastureAreaRequired"));
  }
  if (!data.area.silagem || data.area.silagem === 0) {
    errors.push(t("questionnaire.validation.silageAreaRequired"));
  }

  // Rebanho
  if (!data.rebanho.vacasLactacao || data.rebanho.vacasLactacao === 0) {
    errors.push(t("questionnaire.validation.lactatingCowsRequired"));
  }
  if (!data.rebanho.vacasSecas || data.rebanho.vacasSecas === 0) {
    errors.push(t("questionnaire.validation.dryCowsRequired"));
  }
  if (!data.rebanho.novilhas || data.rebanho.novilhas === 0) {
    errors.push(t("questionnaire.validation.heifersRequired"));
  }
  if (!data.rebanho.bezerros || data.rebanho.bezerros === 0) {
    errors.push(t("questionnaire.validation.calvesRequired"));
  }
  if (!data.rebanho.garrotes || data.rebanho.garrotes === 0) {
    errors.push(t("questionnaire.validation.steersRequired"));
  }

  // Produção Leiteira
  if (
    !data.producaoLeiteira.litrosDiaPropriedade ||
    data.producaoLeiteira.litrosDiaPropriedade === 0
  ) {
    errors.push(t("questionnaire.validation.dailyProductionRequired"));
  }
  if (
    !data.producaoLeiteira.litrosVacaDia ||
    data.producaoLeiteira.litrosVacaDia === 0
  ) {
    errors.push(t("questionnaire.validation.productionPerCowRequired"));
  }

  // Composição do Leite
  if (
    !data.composicaoLeite.percentualGordura ||
    data.composicaoLeite.percentualGordura === 0
  ) {
    errors.push(t("questionnaire.validation.fatPercentageRequired"));
  }
  if (
    !data.composicaoLeite.percentualProteina ||
    data.composicaoLeite.percentualProteina === 0
  ) {
    errors.push(t("questionnaire.validation.proteinPercentageRequired"));
  }

  // Consumo Diário
  if (!data.consumoDiario.volumoso || data.consumoDiario.volumoso === 0) {
    errors.push(t("questionnaire.validation.roughageConsumptionRequired"));
  }
  if (!data.consumoDiario.concentrado || data.consumoDiario.concentrado === 0) {
    errors.push(t("questionnaire.validation.concentrateConsumptionRequired"));
  }
  if (!data.consumoDiario.unidadeInformada) {
    errors.push(t("questionnaire.validation.consumptionUnitRequired"));
  }

  // Energia Elétrica
  if (
    !data.energiaEletrica.consumoMensal ||
    data.energiaEletrica.consumoMensal === 0
  ) {
    errors.push(t("questionnaire.validation.electricityConsumptionRequired"));
  }
  if (
    data.energiaEletrica.temEnergiaFotovoltaica === undefined ||
    data.energiaEletrica.temEnergiaFotovoltaica === null
  ) {
    errors.push(t("questionnaire.validation.photovoltaicEnergyRequired"));
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
