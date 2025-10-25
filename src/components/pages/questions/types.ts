export interface SistemaProducao {
  tipo: string;
  outroEspecificacao: string | null;
}

export interface Area {
  propriedade: number;
  pastagem: number;
  silagem: number;
}

export interface Rebanho {
  vacasLactacao: number;
  vacasSecas: number;
  novilhas: number;
  bezerros: number;
  garrotes: number;
}

export interface ProducaoLeiteira {
  litrosDiaPropriedade: number;
  litrosVacaDia: number;
}

export interface ComposicaoLeite {
  percentualGordura: number;
  percentualProteina: number;
}

export interface ConsumoDiario {
  volumoso: number;
  concentrado: number;
  unidadeInformada: string;
}

export interface EnergiaEletrica {
  consumoMensal: number;
  temEnergiaFotovoltaica: boolean;
}

export interface LegislacaoAmbiental {
  temLicencaAmbiental: string;
  temOutorgaAgua: string;
}

export interface FormData {
  sistemaProducao: SistemaProducao;
  area: Area;
  rebanho: Rebanho;
  producaoLeiteira: ProducaoLeiteira;
  composicaoLeite: ComposicaoLeite;
  consumoDiario: ConsumoDiario;
  energiaEletrica: EnergiaEletrica;
  legislacaoAmbiental: LegislacaoAmbiental;
  dataPreenchimento: string;
}

export interface QuestionOption {
  label: string;
  value: number | null;
}

export interface Question {
  id: number;
  text: string;
  observation?: string;
  option: QuestionOption[];
  groupMain: string;
  group: string;
}

export interface QuestionnaireStep {
  id: number;
  title: string;
  description: string;
  questions?: Question[];
}