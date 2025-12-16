export interface FormSectionsProps {
  pais: string;
  setPais: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;

  // Sistema de Produção
  sistemaProducao: string;
  setSistemaProducao: (value: string) => void;
  outroSistemaProducao: string;
  setOutroSistemaProducao: (value: string) => void;

  // Área
  areaPropriedade: string;
  setAreaPropriedade: (value: string) => void;
  areaPastagem: string;
  setAreaPastagem: (value: string) => void;
  areaSilagem: string;
  setAreaSilagem: (value: string) => void;

  // Rebanho
  vacasLactacao: string;
  setVacasLactacao: (value: string) => void;
  vacasSecas: string;
  setVacasSecas: (value: string) => void;
  novilhas: string;
  setNovilhas: (value: string) => void;
  bezerros: string;
  setBezerros: (value: string) => void;
  garrotes: string;
  setGarrotes: (value: string) => void;
  bulls: string;
  setBulls: (value: string) => void;

  // Produção Leiteira
  litrosDiaPropriedade: string;
  setLitrosDiaPropriedade: (value: string) => void;
  litrosVacaDia: string;
  setLitrosVacaDia: (value: string) => void;

  // Composição do Leite
  percentualGordura: string;
  setPercentualGordura: (value: string) => void;
  percentualProteina: string;
  setPercentualProteina: (value: string) => void;

  // Consumo Diário
  volumoso: string;
  setVolumoso: (value: string) => void;
  concentrado: string;
  setConcentrado: (value: string) => void;
  unidadeInformada: string;
  setUnidadeInformada: (value: string) => void;

  // Energia Elétrica
  consumoEnergia: string;
  setConsumoEnergia: (value: string) => void;
  temEnergiaFotovoltaica: boolean;
  setTemEnergiaFotovoltaica: (value: boolean) => void;

  // Legislação Ambiental
  temLicencaAmbiental: string;
  setTemLicencaAmbiental: (value: string) => void;
  temOutorgaAgua: string;
  setTemOutorgaAgua: (value: string) => void;

  // Função para renderizar radio button
  renderRadioButton: (isSelected: boolean) => React.ReactElement;
}
