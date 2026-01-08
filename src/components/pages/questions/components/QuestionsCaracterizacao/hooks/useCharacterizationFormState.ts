import { useState, useEffect } from "react";
import { FormData } from "../types";

interface UseCharacterizationFormStateProps {
  initialData?: FormData | null;
}

export interface CharacterizationFormState {
  // Localização
  pais: string;
  estado: string | null;
  cidade: string | null;

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
  temLicencaAmbiental: string | null;
  temOutorgaAgua: string;
}

export function makeInitialForm(
  initialData?: FormData | null,
): CharacterizationFormState {
  const toStringOrEmpty = (value: number | undefined | null): string => {
    if (value === undefined || value === null || value === 0) {
      return "";
    }
    return value.toString();
  };

  return {
    // Localização
    pais: initialData?.localizacao?.pais || "",
    estado: initialData?.localizacao?.estado || null,
    cidade: initialData?.localizacao?.cidade || null,

    // Sistema de Produção
    sistemaProducao: initialData?.sistemaProducao?.tipo || "",
    outroSistemaProducao:
      initialData?.sistemaProducao?.outroEspecificacao || "",

    // Área
    areaPropriedade: toStringOrEmpty(initialData?.area?.propriedade),
    areaPastagem: toStringOrEmpty(initialData?.area?.pastagem),
    areaSilagem: toStringOrEmpty(initialData?.area?.silagem),

    // Rebanho
    vacasLactacao: toStringOrEmpty(initialData?.rebanho?.vacasLactacao),
    vacasSecas: toStringOrEmpty(initialData?.rebanho?.vacasSecas),
    novilhas: toStringOrEmpty(initialData?.rebanho?.novilhas),
    bezerros: toStringOrEmpty(initialData?.rebanho?.bezerros),
    garrotes: toStringOrEmpty(initialData?.rebanho?.garrotes),
    bulls: toStringOrEmpty(initialData?.rebanho?.bulls),

    // Produção Leiteira
    litrosDiaPropriedade: toStringOrEmpty(
      initialData?.producaoLeiteira?.litrosDiaPropriedade,
    ),
    litrosVacaDia: toStringOrEmpty(
      initialData?.producaoLeiteira?.litrosVacaDia,
    ),

    // Composição do Leite
    percentualGordura: toStringOrEmpty(
      initialData?.composicaoLeite?.percentualGordura,
    ),
    percentualProteina: toStringOrEmpty(
      initialData?.composicaoLeite?.percentualProteina,
    ),

    // Consumo Diário
    volumoso: toStringOrEmpty(initialData?.consumoDiario?.volumoso),
    concentrado: toStringOrEmpty(initialData?.consumoDiario?.concentrado),
    unidadeInformada: initialData?.consumoDiario?.unidadeInformada || "",

    // Energia Elétrica
    consumoEnergia: toStringOrEmpty(
      initialData?.energiaEletrica?.consumoMensal,
    ),
    temEnergiaFotovoltaica:
      initialData?.energiaEletrica?.temEnergiaFotovoltaica || false,

    // Legislação Ambiental
    temLicencaAmbiental:
      initialData?.legislacaoAmbiental?.temLicencaAmbiental || null,
    temOutorgaAgua: initialData?.legislacaoAmbiental?.temOutorgaAgua || "",
  };
}

export const useCharacterizationFormState = ({
  initialData,
}: UseCharacterizationFormStateProps) => {
  const [form, setForm] = useState<CharacterizationFormState>(() =>
    makeInitialForm(initialData),
  );

  function handleFormChange(changes: Partial<CharacterizationFormState>) {
    setForm((prevForm) => ({ ...prevForm, ...changes }));
  }

  useEffect(() => {
    if (initialData) {
      setForm(makeInitialForm(initialData));
    }
  }, [initialData]);

  return {
    form,
    handleFormChange,
  };
};
