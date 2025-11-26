import { useState } from "react";
import { FormData } from "../types";

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
    initialData?.area.propriedade.toString() || "",
  );
  const [areaPastagem, setAreaPastagem] = useState<string>(
    initialData?.area.pastagem.toString() || "",
  );
  const [areaSilagem, setAreaSilagem] = useState<string>(
    initialData?.area.silagem.toString() || "",
  );

  // Rebanho
  const [vacasLactacao, setVacasLactacao] = useState<string>(
    initialData?.rebanho.vacasLactacao.toString() || "",
  );
  const [vacasSecas, setVacasSecas] = useState<string>(
    initialData?.rebanho.vacasSecas.toString() || "",
  );
  const [novilhas, setNovilhas] = useState<string>(
    initialData?.rebanho.novilhas.toString() || "",
  );
  const [bezerros, setBezerros] = useState<string>(
    initialData?.rebanho.bezerros.toString() || "",
  );
  const [garrotes, setGarrotes] = useState<string>(
    initialData?.rebanho.garrotes.toString() || "",
  );
  const [bulls, setBulls] = useState<string>(
    initialData?.rebanho.bulls.toString() || "",
  );

  // Produção Leiteira
  const [litrosDiaPropriedade, setLitrosDiaPropriedade] = useState<string>(
    initialData?.producaoLeiteira.litrosDiaPropriedade.toString() || "",
  );
  const [litrosVacaDia, setLitrosVacaDia] = useState<string>(
    initialData?.producaoLeiteira.litrosVacaDia.toString() || "",
  );

  // Composição do Leite
  const [percentualGordura, setPercentualGordura] = useState<string>(
    initialData?.composicaoLeite.percentualGordura.toString() || "",
  );
  const [percentualProteina, setPercentualProteina] = useState<string>(
    initialData?.composicaoLeite.percentualProteina.toString() || "",
  );

  // Consumo Diário
  const [volumoso, setVolumoso] = useState<string>(
    initialData?.consumoDiario.volumoso.toString() || "",
  );
  const [concentrado, setConcentrado] = useState<string>(
    initialData?.consumoDiario.concentrado.toString() || "",
  );
  const [unidadeInformada, setUnidadeInformada] = useState<string>(
    initialData?.consumoDiario.unidadeInformada || "",
  );

  // Energia Elétrica
  const [consumoEnergia, setConsumoEnergia] = useState<string>(
    initialData?.energiaEletrica.consumoMensal.toString() || "",
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

  return {
    // Localização
    pais,
    setPais,
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
