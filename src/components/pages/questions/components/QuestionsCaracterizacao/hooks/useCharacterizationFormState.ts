import { useState, useEffect } from "react";
import { FormData } from "../types";

const toStringOrEmpty = (value: number | undefined): string => {
  if (value === undefined || value === null || value === 0) {
    return "";
  }
  return value.toString();
};

interface UseCharacterizationFormStateProps {
  initialData?: FormData | null;
}

export const useCharacterizationFormState = ({
  initialData,
}: UseCharacterizationFormStateProps) => {
  // Localização
  const [pais, setPais] = useState<string>(
    initialData?.localizacao?.pais || "",
  );
  const [estado, setEstado] = useState<string>(
    initialData?.localizacao?.estado || "",
  );
  const [cidade, setCidade] = useState<string>(
    initialData?.localizacao?.cidade || "",
  );

  // Sistema de Produção
  const [sistemaProducao, setSistemaProducao] = useState<string>(
    initialData?.sistemaProducao.tipo || "",
  );
  const [outroSistemaProducao, setOutroSistemaProducao] = useState<string>(
    initialData?.sistemaProducao.outroEspecificacao || "",
  );

  // Área
  const [areaPropriedade, setAreaPropriedade] = useState<string>(
    toStringOrEmpty(initialData?.area.propriedade),
  );
  const [areaPastagem, setAreaPastagem] = useState<string>(
    toStringOrEmpty(initialData?.area.pastagem),
  );
  const [areaSilagem, setAreaSilagem] = useState<string>(
    toStringOrEmpty(initialData?.area.silagem),
  );

  // Rebanho
  const [vacasLactacao, setVacasLactacao] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.vacasLactacao),
  );
  const [vacasSecas, setVacasSecas] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.vacasSecas),
  );
  const [novilhas, setNovilhas] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.novilhas),
  );
  const [bezerros, setBezerros] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.bezerros),
  );
  const [garrotes, setGarrotes] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.garrotes),
  );
  const [bulls, setBulls] = useState<string>(
    toStringOrEmpty(initialData?.rebanho.bulls),
  );

  // Produção Leiteira
  const [litrosDiaPropriedade, setLitrosDiaPropriedade] = useState<string>(
    toStringOrEmpty(initialData?.producaoLeiteira.litrosDiaPropriedade),
  );
  const [litrosVacaDia, setLitrosVacaDia] = useState<string>(
    toStringOrEmpty(initialData?.producaoLeiteira.litrosVacaDia),
  );

  // Composição do Leite
  const [percentualGordura, setPercentualGordura] = useState<string>(
    toStringOrEmpty(initialData?.composicaoLeite.percentualGordura),
  );
  const [percentualProteina, setPercentualProteina] = useState<string>(
    toStringOrEmpty(initialData?.composicaoLeite.percentualProteina),
  );

  // Consumo Diário
  const [volumoso, setVolumoso] = useState<string>(
    toStringOrEmpty(initialData?.consumoDiario.volumoso),
  );
  const [concentrado, setConcentrado] = useState<string>(
    toStringOrEmpty(initialData?.consumoDiario.concentrado),
  );
  const [unidadeInformada, setUnidadeInformada] = useState<string>(
    initialData?.consumoDiario.unidadeInformada || "",
  );

  // Energia Elétrica
  const [consumoEnergia, setConsumoEnergia] = useState<string>(
    toStringOrEmpty(initialData?.energiaEletrica.consumoMensal),
  );
  const [temEnergiaFotovoltaica, setTemEnergiaFotovoltaica] = useState<boolean>(
    initialData?.energiaEletrica.temEnergiaFotovoltaica || false,
  );

  // Legislação Ambiental
  const [temLicencaAmbiental, setTemLicencaAmbiental] = useState<string>(
    initialData?.legislacaoAmbiental.temLicencaAmbiental || "",
  );
  const [temOutorgaAgua, setTemOutorgaAgua] = useState<string>(
    initialData?.legislacaoAmbiental.temOutorgaAgua || "",
  );

  useEffect(() => {
    if (initialData) {
      // Localização
      setPais(initialData.localizacao?.pais || "");
      setEstado(initialData.localizacao?.estado || "");
      setCidade(initialData.localizacao?.cidade || "");

      // Sistema de Produção
      setSistemaProducao(initialData.sistemaProducao?.tipo || "");
      setOutroSistemaProducao(
        initialData.sistemaProducao?.outroEspecificacao || "",
      );

      // Área
      setAreaPropriedade(toStringOrEmpty(initialData.area?.propriedade));
      setAreaPastagem(toStringOrEmpty(initialData.area?.pastagem));
      setAreaSilagem(toStringOrEmpty(initialData.area?.silagem));

      // Rebanho
      setVacasLactacao(toStringOrEmpty(initialData.rebanho?.vacasLactacao));
      setVacasSecas(toStringOrEmpty(initialData.rebanho?.vacasSecas));
      setNovilhas(toStringOrEmpty(initialData.rebanho?.novilhas));
      setBezerros(toStringOrEmpty(initialData.rebanho?.bezerros));
      setGarrotes(toStringOrEmpty(initialData.rebanho?.garrotes));
      setBulls(toStringOrEmpty(initialData.rebanho?.bulls));

      // Produção Leiteira
      setLitrosDiaPropriedade(
        toStringOrEmpty(initialData.producaoLeiteira?.litrosDiaPropriedade),
      );
      setLitrosVacaDia(
        toStringOrEmpty(initialData.producaoLeiteira?.litrosVacaDia),
      );

      // Composição do Leite
      setPercentualGordura(
        toStringOrEmpty(initialData.composicaoLeite?.percentualGordura),
      );
      setPercentualProteina(
        toStringOrEmpty(initialData.composicaoLeite?.percentualProteina),
      );

      // Consumo Diário
      setVolumoso(toStringOrEmpty(initialData.consumoDiario?.volumoso));
      setConcentrado(toStringOrEmpty(initialData.consumoDiario?.concentrado));
      setUnidadeInformada(initialData.consumoDiario?.unidadeInformada || "");

      // Energia Elétrica
      setConsumoEnergia(
        toStringOrEmpty(initialData.energiaEletrica?.consumoMensal),
      );
      setTemEnergiaFotovoltaica(
        initialData.energiaEletrica?.temEnergiaFotovoltaica || false,
      );

      // Legislação Ambiental
      setTemLicencaAmbiental(
        initialData.legislacaoAmbiental?.temLicencaAmbiental || "",
      );
      setTemOutorgaAgua(initialData.legislacaoAmbiental?.temOutorgaAgua || "");
    }
  }, [initialData]);

  return {
    // Localização
    pais,
    setPais,
    estado,
    setEstado,
    cidade,
    setCidade,

    // Sistema de Produção
    sistemaProducao,
    setSistemaProducao,
    outroSistemaProducao,
    setOutroSistemaProducao,

    // Área
    areaPropriedade,
    setAreaPropriedade,
    areaPastagem,
    setAreaPastagem,
    areaSilagem,
    setAreaSilagem,

    // Rebanho
    vacasLactacao,
    setVacasLactacao,
    vacasSecas,
    setVacasSecas,
    novilhas,
    setNovilhas,
    bezerros,
    setBezerros,
    garrotes,
    setGarrotes,
    bulls,
    setBulls,

    // Produção Leiteira
    litrosDiaPropriedade,
    setLitrosDiaPropriedade,
    litrosVacaDia,
    setLitrosVacaDia,

    // Composição do Leite
    percentualGordura,
    setPercentualGordura,
    percentualProteina,
    setPercentualProteina,

    // Consumo Diário
    volumoso,
    setVolumoso,
    concentrado,
    setConcentrado,
    unidadeInformada,
    setUnidadeInformada,

    // Energia Elétrica
    consumoEnergia,
    setConsumoEnergia,
    temEnergiaFotovoltaica,
    setTemEnergiaFotovoltaica,

    // Legislação Ambiental
    temLicencaAmbiental,
    setTemLicencaAmbiental,
    temOutorgaAgua,
    setTemOutorgaAgua,
  };
};
