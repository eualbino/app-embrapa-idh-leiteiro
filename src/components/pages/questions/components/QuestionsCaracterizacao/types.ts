export interface SistemaProducao {
  tipo: string;
  outroEspecificacao: string | null;
}

export interface Localizacao {
  pais: string;
  estado: string;
  cidade: string;
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
  bulls: number;
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
  localizacao: Localizacao;
  sistemaProducao: SistemaProducao;
  area: Area;
  rebanho: Rebanho;
  producaoLeiteira: ProducaoLeiteira;
  composicaoLeite: ComposicaoLeite;
  consumoDiario: ConsumoDiario;
  energiaEletrica: EnergiaEletrica;
  legislacaoAmbiental: LegislacaoAmbiental;
}
