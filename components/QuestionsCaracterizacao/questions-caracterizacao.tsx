import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { stylesQuestions } from './style-questions-caracterizacao';

import SistemaProducaoInput from './components/sistema-producao-input';
import AreaInput from './components/area-input';
import RebanhoInput from './components/rebanho-input';
import ProducaoLeiteiraInput from './components/producao-leiteira-input';
import ComposicaoLeiteInput from './components/composicao-leite-input';
import ConsumoDiarioInput from './components/consumo-diario-input';
import EnergiaEletricaInput from './components/energia-eletrica-input';
import LegislacaoAmbientalInput from './components/legislacao-ambiental-input';

import { FormData } from './types';

interface FormularioQuestionarioProps {
  onDataChange: (data: FormData) => void;
}

export const FormularioQuestionario: React.FC<FormularioQuestionarioProps> = ({
  onDataChange,
}) => {
  // Estados para controlar as seleções
  const [sistemaProducao, setSistemaProducao] = useState<string>('');
  const [temLicencaAmbiental, setTemLicencaAmbiental] = useState<string>('');
  const [temOutorgaAgua, setTemOutorgaAgua] = useState<string>('');
  const [temEnergiaFotovoltaica, setTemEnergiaFotovoltaica] = useState<boolean>(false);
  const [unidadeInformada, setUnidadeInformada] = useState<string>('');

  // Estados para os campos de texto
  const [outroSistemaProducao, setOutroSistemaProducao] = useState<string>('');
  const [areaPropriedade, setAreaPropriedade] = useState<string>('');
  const [areaPastagem, setAreaPastagem] = useState<string>('');
  const [areaSilagem, setAreaSilagem] = useState<string>('');
  const [vacasLactacao, setVacasLactacao] = useState<string>('');
  const [vacasSecas, setVacasSecas] = useState<string>('');
  const [novilhas, setNovilhas] = useState<string>('');
  const [bezerros, setBezerros] = useState<string>('');
  const [garrotes, setGarrotes] = useState<string>('');
  const [litrosDiaPropriedade, setLitrosDiaPropriedade] = useState<string>('');
  const [litrosVacaDia, setLitrosVacaDia] = useState<string>('');
  const [percentualGordura, setPercentualGordura] = useState<string>('');
  const [percentualProteina, setPercentualProteina] = useState<string>('');
  const [volumoso, setVolumoso] = useState<string>('');
  const [concentrado, setConcentrado] = useState<string>('');
  const [consumoEnergia, setConsumoEnergia] = useState<string>('');

  useEffect(() => {
    const formData: FormData = {
      sistemaProducao: {
        tipo: sistemaProducao,
        outroEspecificacao: sistemaProducao === 'outro' ? outroSistemaProducao : null,
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
      dataPreenchimento: new Date().toISOString(),
    };
    onDataChange(formData);
  }, [
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
  ]);


  const renderRadioButton = (isSelected: boolean) => (
    <View style={[stylesQuestions.radio]}>
      {isSelected && <View style={stylesQuestions.radioSelected} />}
    </View>
  );

  return (
    <View>
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
