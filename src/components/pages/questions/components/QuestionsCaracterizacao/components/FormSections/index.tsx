import React from "react";
import { View } from "react-native";

import AreaInput from "./components/AreaInputForm";
import RebanhoInput from "./components/RebanhoForm";
import ProducaoLeiteiraInput from "./components/ProducaoLeiteiraForm";
import ComposicaoLeiteInput from "./components/ComposicaoLeiteForm";
import ConsumoDiarioInput from "./components/ConsumoDiarioForm";
import EnergiaEletricaInput from "./components/EnergiaEletricaForm";
import LegislacaoAmbientalInput from "./components/LegislacaoAmbientalForm";
import SistemaProducaoInput from "./components/SistemaProducaoForm";
import { FormSectionsProps } from "./types";
import LocalizacaoInput from "./components/LocalizacaoForm";

export const FormSections: React.FC<FormSectionsProps> = ({
  cidade,
  setCidade,
  estado,
  setEstado,

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

  renderRadioButton,
}) => {
  return (
    <View>
      <LocalizacaoInput
        cidade={cidade}
        setCidade={setCidade}
        estado={estado}
        setEstado={setEstado}
      />

      <SistemaProducaoInput
        sistemaProducao={sistemaProducao}
        setSistemaProducao={setSistemaProducao}
        outroSistemaProducao={outroSistemaProducao}
        setOutroSistemaProducao={setOutroSistemaProducao}
        renderRadioButton={renderRadioButton}
      />

      <AreaInput
        areaPropriedade={areaPropriedade}
        setAreaPropriedade={setAreaPropriedade}
        areaPastagem={areaPastagem}
        setAreaPastagem={setAreaPastagem}
        areaSilagem={areaSilagem}
        setAreaSilagem={setAreaSilagem}
      />

      <RebanhoInput
        vacasLactacao={vacasLactacao}
        setVacasLactacao={setVacasLactacao}
        vacasSecas={vacasSecas}
        setVacasSecas={setVacasSecas}
        novilhas={novilhas}
        setNovilhas={setNovilhas}
        bezerros={bezerros}
        setBezerros={setBezerros}
        garrotes={garrotes}
        setGarrotes={setGarrotes}
        bulls={bulls}
        setBulls={setBulls}
      />

      <ProducaoLeiteiraInput
        litrosDiaPropriedade={litrosDiaPropriedade}
        setLitrosDiaPropriedade={setLitrosDiaPropriedade}
        litrosVacaDia={litrosVacaDia}
        setLitrosVacaDia={setLitrosVacaDia}
      />

      <ComposicaoLeiteInput
        percentualGordura={percentualGordura}
        setPercentualGordura={setPercentualGordura}
        percentualProteina={percentualProteina}
        setPercentualProteina={setPercentualProteina}
      />

      <ConsumoDiarioInput
        volumoso={volumoso}
        setVolumoso={setVolumoso}
        concentrado={concentrado}
        setConcentrado={setConcentrado}
        unidadeInformada={unidadeInformada}
        setUnidadeInformada={setUnidadeInformada}
        renderRadioButton={renderRadioButton}
      />

      <EnergiaEletricaInput
        consumoEnergia={consumoEnergia}
        setConsumoEnergia={setConsumoEnergia}
        temEnergiaFotovoltaica={temEnergiaFotovoltaica}
        setTemEnergiaFotovoltaica={setTemEnergiaFotovoltaica}
        renderRadioButton={renderRadioButton}
      />

      <LegislacaoAmbientalInput
        temLicencaAmbiental={temLicencaAmbiental}
        setTemLicencaAmbiental={setTemLicencaAmbiental}
        temOutorgaAgua={temOutorgaAgua}
        setTemOutorgaAgua={setTemOutorgaAgua}
        renderRadioButton={renderRadioButton}
      />
    </View>
  );
};
