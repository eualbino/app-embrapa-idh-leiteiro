// External Libraries
import { useMemo } from "react";

// Types
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";
import { CharacterizationFormState } from "./useCharacterizationFormState";

export const useCharacterizationFormLogic = (
  form: CharacterizationFormState,
): FormData => {
  return useMemo<FormData>(() => {
    return {
      localizacao: {
        pais: form.pais,
        estado: form.estado,
        cidade: form.cidade,
      },
      sistemaProducao: {
        tipo: form.sistemaProducao,
        outroEspecificacao:
          form.sistemaProducao === "outro" ? form.outroSistemaProducao : null,
      },
      area: {
        propriedade: parseFloat(form.areaPropriedade) || 0,
        pastagem: parseFloat(form.areaPastagem) || 0,
        silagem: parseFloat(form.areaSilagem) || 0,
      },
      rebanho: {
        vacasLactacao: parseInt(form.vacasLactacao) || 0,
        vacasSecas: parseInt(form.vacasSecas) || 0,
        novilhas: parseInt(form.novilhas) || 0,
        bezerros: parseInt(form.bezerros) || 0,
        garrotes: parseInt(form.garrotes) || 0,
        bulls: parseInt(form.bulls) || 0,
      },
      producaoLeiteira: {
        litrosDiaPropriedade: parseFloat(form.litrosDiaPropriedade) || 0,
        litrosVacaDia: parseFloat(form.litrosVacaDia) || 0,
      },
      composicaoLeite: {
        percentualGordura: parseFloat(form.percentualGordura) || 0,
        percentualProteina: parseFloat(form.percentualProteina) || 0,
      },
      consumoDiario: {
        volumoso: parseFloat(form.volumoso) || 0,
        concentrado: parseFloat(form.concentrado) || 0,
        unidadeInformada: form.unidadeInformada,
      },
      energiaEletrica: {
        consumoMensal: parseFloat(form.consumoEnergia) || 0,
        temEnergiaFotovoltaica: form.temEnergiaFotovoltaica,
      },
      legislacaoAmbiental: {
        temLicencaAmbiental: form.temLicencaAmbiental,
        temOutorgaAgua: form.temOutorgaAgua,
      },
    };
  }, [
    form.pais,
    form.estado,
    form.cidade,
    form.sistemaProducao,
    form.outroSistemaProducao,
    form.areaPropriedade,
    form.areaPastagem,
    form.areaSilagem,
    form.vacasLactacao,
    form.vacasSecas,
    form.novilhas,
    form.bezerros,
    form.garrotes,
    form.bulls,
    form.litrosDiaPropriedade,
    form.litrosVacaDia,
    form.percentualGordura,
    form.percentualProteina,
    form.volumoso,
    form.concentrado,
    form.unidadeInformada,
    form.consumoEnergia,
    form.temEnergiaFotovoltaica,
    form.temLicencaAmbiental,
    form.temOutorgaAgua,
  ]);
};
