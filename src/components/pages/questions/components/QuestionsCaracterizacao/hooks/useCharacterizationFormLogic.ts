import { useEffect, useCallback } from "react";
import { FormData } from "@/src/components/pages/questions/components/QuestionsCaracterizacao/types";

interface UseCharacterizationFormLogicProps {
  // Localização
  cidade: string;
  estado: string;

  // Sistema de Produção
  sistemaProducao: string;
  outroSistemaProducao: string;

  // Área
  areaPropriedade: string;
  areaPastagem: string;
  areaSilagem: string;

  // Rebanho
  vacasLactacao: string;
  vacasSecas: string;
  novilhas: string;
  bezerros: string;
  garrotes: string;
  bulls: string;

  // Produção Leiteira
  litrosDiaPropriedade: string;
  litrosVacaDia: string;

  // Composição do Leite
  percentualGordura: string;
  percentualProteina: string;

  // Consumo Diário
  volumoso: string;
  concentrado: string;
  unidadeInformada: string;

  // Energia Elétrica
  consumoEnergia: string;
  temEnergiaFotovoltaica: boolean;

  // Legislação Ambiental
  temLicencaAmbiental: string;
  temOutorgaAgua: string;

  onDataChange: (data: FormData) => void;
}

export const useCharacterizationFormLogic = ({
  cidade,
  estado,
  sistemaProducao,
  outroSistemaProducao,
  areaPropriedade,
  areaPastagem,
  areaSilagem,
  vacasLactacao,
  vacasSecas,
  novilhas,
  bezerros,
  garrotes,
  bulls,
  litrosDiaPropriedade,
  litrosVacaDia,
  percentualGordura,
  percentualProteina,
  volumoso,
  concentrado,
  unidadeInformada,
  consumoEnergia,
  temEnergiaFotovoltaica,
  temLicencaAmbiental,
  temOutorgaAgua,
  onDataChange,
}: UseCharacterizationFormLogicProps) => {
  // Função para criar o objeto FormData
  const createFormData = useCallback((): FormData => {
    return {
      localizacao: {
        cidade: cidade,
        estado: estado,
      },
      sistemaProducao: {
        tipo: sistemaProducao,
        outroEspecificacao:
          sistemaProducao === "outro" ? outroSistemaProducao : null,
      },
      area: {
        propriedade: parseFloat(areaPropriedade) || 0,
        pastagem: parseFloat(areaPastagem) || 0,
        silagem: parseFloat(areaSilagem) || 0,
      },
      rebanho: {
        vacasLactacao: parseInt(vacasLactacao) || 0,
        vacasSecas: parseInt(vacasSecas) || 0,
        novilhas: parseInt(novilhas) || 0,
        bezerros: parseInt(bezerros) || 0,
        garrotes: parseInt(garrotes) || 0,
        bulls: parseInt(bulls) || 0,
      },
      producaoLeiteira: {
        litrosDiaPropriedade: parseFloat(litrosDiaPropriedade) || 0,
        litrosVacaDia: parseFloat(litrosVacaDia) || 0,
      },
      composicaoLeite: {
        percentualGordura: parseFloat(percentualGordura) || 0,
        percentualProteina: parseFloat(percentualProteina) || 0,
      },
      consumoDiario: {
        volumoso: parseFloat(volumoso) || 0,
        concentrado: parseFloat(concentrado) || 0,
        unidadeInformada: unidadeInformada,
      },
      energiaEletrica: {
        consumoMensal: parseFloat(consumoEnergia) || 0,
        temEnergiaFotovoltaica: temEnergiaFotovoltaica,
      },
      legislacaoAmbiental: {
        temLicencaAmbiental: temLicencaAmbiental,
        temOutorgaAgua: temOutorgaAgua,
      },
    };
  }, [
    cidade,
    estado,
    sistemaProducao,
    outroSistemaProducao,
    areaPropriedade,
    areaPastagem,
    areaSilagem,
    vacasLactacao,
    vacasSecas,
    novilhas,
    bezerros,
    garrotes,
    bulls,
    litrosDiaPropriedade,
    litrosVacaDia,
    percentualGordura,
    percentualProteina,
    volumoso,
    concentrado,
    unidadeInformada,
    consumoEnergia,
    temEnergiaFotovoltaica,
    temLicencaAmbiental,
    temOutorgaAgua,
  ]);

  // Atualizar dados quando qualquer campo mudar
  useEffect(() => {
    const formData = createFormData();
    onDataChange(formData);
  }, [createFormData, onDataChange]);
};
