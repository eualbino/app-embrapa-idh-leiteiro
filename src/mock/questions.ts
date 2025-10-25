type Option = {
  label: string;
  value: number | null;
};

type Question = {
  id: number;
  text: string;
  observation?: string;
  option: Option[];
  groupMain: string;
  group: string;
};

export const questions: Question[] = [
  {
    id: 1,
    text: "Existe um MAPA HIDRÁULICO da propriedade?",
    observation:
      "O Mapa Hidráulico é o mapeamento de toda a rede hidráulica do sistema de produção com a identificação das fontes de água, pontos de consumo, localização de bombas e fluxos de águas pluviais e de efluentes",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 2,
    text: "Há MEDIÇÃO DO CONSUMO DE ÁGUA da propriedade?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 3,
    text: "Qual é a FREQUÊNCIA DE LEITURA da medição durante o mês?",
    option: [
      { label: "N1 - Não possui sistema de medição", value: 0 },
      { label: "N2 - Mensal ou superior", value: 0.25 },
      { label: "N3 - Quinzenal", value: 0.5 },
      { label: "N4 - Semanal", value: 0.75 },
      { label: "N5 - Diária", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 4,
    text: "Qual é o % de pontos de consumo de água que é monitorado?",
    observation:
      "Identifique o total de pontos de consumo que existe na propriedade. Determine quantos deles possuem monitoramento com hidrômetro. Divida o número de pontos com monitoramento pelo número total e multiplique por 100.",
    option: [
      { label: "N1 - Não possui sistema de medição", value: 0 },
      { label: "N2 - Menos de 25%", value: 0.25 },
      { label: "N3 - Entre 26% a 50%", value: 0.5 },
      { label: "N4 - Entre 51% a 79%", value: 0.75 },
      { label: "N5 - Acima de 80%", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 5,
    text: "A atividade possui metas de redução do consumo ou perda da água?",
    observation:
      "Um plano com metas para a redução do consumo de água ou das perdas deve conter uma etapas que descrevam como isso será alcançado dentro do prazo previsto.",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 6,
    text: "A propriedade possui um SISTEMA DE CONTROLE DE VAZÃO DE ÁGUA nas mangueiras de lavagem da sala de ORDENHA?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 7,
    text: "Há BOIAS DE NÍVEL nos BEBEDOUROS?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 8,
    text: "Há BOIAS DE NÍVEL nas ESTRUTURAS DE ARMAZENAMENTO de água da ordenha (ex. caixas de água)?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 9,
    text: "Qual é a ROTINA de IDENTIFICAÇÃO DE VAZAMENTOS?",
    option: [
      { label: "N1 - Não faz", value: 0 },
      { label: "N2 - Mensal", value: 0.25 },
      { label: "N3 - 1 vez por semana", value: 0.5 },
      { label: "N4 - 2 vez por semana", value: 0.75 },
      { label: "N5 - Diária", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 10,
    text: "Propriedade possui programa de uso de água de IRRIGAÇÃO?",
    observation:
      "O Programa de irrigação deve conter uma o cálculo da lâmina de água a ser aplicada de acordo com os parâmetros técnicos (aspectos climáticos, unidade do solo, etc.). Não se aplica quando as propriedades não fazem irrigação.",
    option: [
      { label: "N0 - Não faz", value: null },
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 11,
    text: "O acionamento do sistema de RESFRIAMENTO dos animais é feito com base em parâmetros técnicos?",
    observation:
      "Sistema de resfriamento que aciona com base em controle com parâmetros técnicos (temperatura e umidade ambiente).",
    option: [
      { label: "N0 - Não faz resfriamento (Não se aplica)", value: null },
      {
        label:
          "N1 - NÃO, o acionamento é feito com base na decisão do produtor(a)",
        value: 0.5,
      },
      {
        label:
          "N2 - SIM, o acionamento é feito com base em parâmetros técnicos considerando a temperatura e umidade do ambiente",
        value: 1,
      },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 12,
    text: "A propriedade possui CAPTAÇÃO DE ÁGUA DA CHUVA e armazenamento em CISTERNA?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "seguranca-agua",
  },
  {
    id: 13,
    text: "A propriedade faz REUSO DA ÁGUA OU DE EFLUENTES? (ex: água de lavagem de bebedouros e equipamentos pode ser utilizada na lavagem de piso, reuso de efluente na irrigação, etc.)",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "seguranca-agua",
  },
  {
    id: 14,
    text: "A propriedade MONITORA A QUALIDADE da água?",
    option: [
      { label: "N1 - Não monitora", value: 0 },
      { label: "N2 - Realiza análise 1 vez por ano", value: 0.5 },
      { label: "N3 - Realiza análise 2 vezes por ano", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 15,
    text: "Qual a % DE PONTOS DE ÁGUA MONITORADOS para qualidade da água em relação ao total de pontos de consumo?",
    observation:
      "Identifique o total de pontos de consumo que existe na propriedade. Determine quantos pontos possuem coleta e análise de água. Divida o número de pontos de coleta pelo número total de pontos de consumo e multiplique por 100.",
    option: [
      {
        label: "N0 - Não possui sistema de monitoramento de qualidade da água",
        value: null,
      },
      {
        label:
          "N1 - Menos de 25% de todos os pontos de consumo são monitorados",
        value: 0,
      },
      {
        label: "N2 - Entre 26% e 50% dos pontos de consumo são monitorados",
        value: 0.333,
      },
      {
        label: "N3 - Entre 51% e 79% dos pontos de consumo são monitorados",
        value: 0.666,
      },
      {
        label: "N4 - Acima de 80%",
        value: 1,
      },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 16,
    text: "A propriedade faz ANÁLISE DE NITRATO na água?",
    option: [
      {
        label: "N0 - Não possui sistema de monitoramento de qualidade da água",
        value: null,
      },
      {
        label: "N1 - Não",
        value: 0,
      },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 17,
    text: "A propriedade faz ANÁLISE DE Escherichia Coli na água?",
    option: [
      {
        label: "N0 - Não possui sistema de monitoramento de qualidade da água",
        value: null,
      },
      {
        label: "N1 - Não",
        value: 0,
      },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 18,
    text: "Os animais tem ACESSO A CORPOS D'ÁGUA (rios, lagos, açudes, nascentes)?",
    option: [
      { label: "N1 - Sim", value: 0 },
      { label: "N2 - Não", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 19,
    text: "Toda ÁGUA DE CONSUMO DOS ANIMAIS é OFERECIDA por bebedouros?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 20,
    text: "Áreas ao redor dos bebedouros apresentam acúmulo de ÁGUA ou LAMA?",
    option: [
      { label: "N1 - Sim", value: 0 },
      { label: "N2 - Não", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 21,
    text: "A FREQUÊNCIA de LIMPEZA DOS BEBEDOUROS é:",
    option: [
      { label: "N1 - Não faz limpeza dos bebedouros", value: 0 },
      { label: "N2 - Maior que 1 vez por semana", value: 0.25 },
      { label: "N3 - 1 vez por semana", value: 0.5 },
      { label: "N4 - 2 vez por semana", value: 0.75 },
      { label: "N5 - Diária", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 22,
    text: "A propriedade possui SISTEMA DE ARMAZENAMENTO OU TRATAMENTO do DEJETO da ordenha? (EX. estereueira, laoca, biodigestor. etc.)?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 23,
    text: "A propriedade possui SISTEMA de armazenamento ou tratamento de dejetos IMPERMEABILIZADO? (ex. geomembrana, alvenaria)?",
    observation:
      "Não se alica se a lei estadual de licenciamento ambiental da bovinocultura de leite não exige que o sistema seja impermeabilizado.",
    option: [
      {
        label:
          "N0 - Não possui sistema de armazenamento ou tratamento de dejetos",
        value: null,
      },
      { label: "N1 - Não se aplica", value: 0 },
      { label: "N2 - Não", value: 0.5 },
      { label: "N3 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 24,
    text: "As ÁGUAS DE CHUVA que caem no piso da ordenha e área de espera são DESVIADAS do Sistema de armazenamento ou tratamento dos dejetos?",
    option: [
      {
        label:
          "N0 - Não possui sistema de armazenamento ou tratamento dos dejetos",
        value: null,
      },
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 25,
    text: "Há ocorrência de VAZAMENTOS NOS SISTEMAS de armazenamento/tratamento dos dejetos?",
    option: [
      {
        label:
          "N0 - Não possui sistema de armazenamento ou tratamento dos dejetos",
        value: null,
      },
      { label: "N1 - Sim", value: 0 },
      { label: "N2 - Não", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 26,
    text: "Há CALHAS NO TELHADO da ordenha?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 27,
    text: "Qual é o % de LAVAGENS DO PISO do curral de espera e da sala de ordenha no total de número de ordenhas?",
    observation:
      "Determine quantas lavagens se faz por dia. Divida o número de lavagens pelo número total de ordenhas e multiplique por 100.",
    option: [
      { label: "N1 - Em 100% das ordenhas", value: 0 },
      {
        label:
          "N2 - Em menos de 100% das ordenhas (há menos de piso em algumas das ordenhas)",
        value: 1,
      },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 28,
    text: "A propriedade faz RASPAGEM DO ESTERCO do piso antes da lavagem?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 29,
    text: "Usa ÁGUA COM PRESSÃO (lava-jato) NA LAVAGEM de instalações e equipamentos?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 30,
    text: "A propriedade possui um PLANO DE EMERGÊNCIA para eventos extremos?",
    observation:
      "Como eventos extremos entende-se: transbordamento da esterqueira/lagoa de dejetos, rompimento de canal/canaleta que transporta dejeto, escoamento superficial de resíduo pelo solo, etc.",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 31,
    text: "A propriedade DOCUMENTA E MONITORA o uso de fertilizantes químicos e orgânicos?",
    observation:
      "Todo o uso de fertilizante químico ou orgânico é documentado por tamanho da área de aplicação, tipo de cultura, quantidade de NPK aplicada, data de aplicação e considerando a análise de fertilidade do solo da área.",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 32,
    text: "Faz ANÁLISE EM LABORATÓRIO da concentração de nutrientes (nitrogênio, fósforo e potássio) do RESÍDUO ORGÂNICO?",
    option: [
      { label: "N1 - Não", value: 0 },
      { label: "N2 - Sim", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 33,
    text: "A propriedade faz ANÁLISE DO SOLO de todas as áreas que recebem fertilizante?",
    option: [
      { label: "N1 - Não realiza", value: 0 },
      {
        label: "N2 - Realiza análise a cada 3 anos ou mais e esporádico",
        value: 0.333,
      },
      { label: "N3 - Realiza análise a cada 2 anos", value: 0.666 },
      { label: "N4 - Realiza análise anual", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 34,
    text: "Qual a PERIODICIDADE DE APLICAÇÃO dos resíduos como adubo?",
    option: [
      { label: "N1 - Não faz aplicação", value: 0 },
      {
        label: "N2 - Aplicação Semanal",
        value: 0.2,
      },
      { label: "N3 - Aplicação Quinzenal", value: 0.4 },
      { label: "N4 - Aplicação Mensal", value: 0.6 },
      { label: "N5 - Aplicação Trimestral", value: 0.8 },
      { label: "N6 - Aplicação a cada 4 meses ou mais", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 35,
    text: "Qual a FORMA DE APLICAÇÃO dos resíduos no solo?",
    option: [
      { label: "N1 - Não faz aplicação", value: 0 },
      {
        label: "N2 - Aplica de forma superficial",
        value: 0.5,
      },
      { label: "N3 - Aplica o resíduo incorporando ele no solo", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
];
