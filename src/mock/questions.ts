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
    text: "questionnaire.questions.q1.text",
    observation: "questionnaire.questions.q1.observation",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 2,
    text: "questionnaire.questions.q2.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 3,
    text: "questionnaire.questions.q3.text",
    option: [
      {
        label: "questionnaire.questions.options.noMeasurementSystem",
        value: 0,
      },
      { label: "questionnaire.questions.options.monthlyOrMore", value: 0.25 },
      { label: "questionnaire.questions.options.biweekly", value: 0.5 },
      { label: "questionnaire.questions.options.weekly", value: 0.75 },
      { label: "questionnaire.questions.options.daily", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 4,
    text: "questionnaire.questions.q4.text",
    observation: "questionnaire.questions.q4.observation",
    option: [
      {
        label: "questionnaire.questions.options.noMeasurementSystem",
        value: 0,
      },
      { label: "questionnaire.questions.options.lessThan25", value: 0.25 },
      { label: "questionnaire.questions.options.between26And50", value: 0.5 },
      { label: "questionnaire.questions.options.between51And79", value: 0.75 },
      { label: "questionnaire.questions.options.above80", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 5,
    text: "questionnaire.questions.q5.text",
    observation: "questionnaire.questions.q5.observation",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "consumo-agua",
  },
  {
    id: 6,
    text: "questionnaire.questions.q6.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 7,
    text: "questionnaire.questions.q7.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 8,
    text: "questionnaire.questions.q8.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 9,
    text: "questionnaire.questions.q9.text",
    option: [
      { label: "questionnaire.questions.options.doesNotHave", value: 0 },
      { label: "questionnaire.questions.options.monthly", value: 0.25 },
      { label: "questionnaire.questions.options.oncePerWeek", value: 0.5 },
      { label: "questionnaire.questions.options.twicePerWeek", value: 0.75 },
      { label: "questionnaire.questions.options.daily", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 10,
    text: "questionnaire.questions.q10.text",
    observation: "questionnaire.questions.q10.observation",
    option: [
      {
        label: "questionnaire.questions.options.doesNotIrrigation",
        value: null,
      },
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 11,
    text: "questionnaire.questions.q11.text",
    observation: "questionnaire.questions.q11.observation",
    option: [
      { label: "questionnaire.questions.options.noCooling", value: null },
      {
        label: "questionnaire.questions.options.noBasedOnProducerDecision",
        value: 0.5,
      },
      {
        label: "questionnaire.questions.options.yesBasedOnTechnicalParameters",
        value: 1,
      },
    ],
    groupMain: "quantidade-agua",
    group: "perdas-agua",
  },
  {
    id: 12,
    text: "questionnaire.questions.q12.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "seguranca-agua",
  },
  {
    id: 13,
    text: "questionnaire.questions.q13.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "quantidade-agua",
    group: "seguranca-agua",
  },
  {
    id: 14,
    text: "questionnaire.questions.q14.text",
    option: [
      { label: "questionnaire.questions.options.doesNotMonitor", value: 0 },
      {
        label: "questionnaire.questions.options.analysisOncePerYear",
        value: 0.5,
      },
      {
        label: "questionnaire.questions.options.analysisTwicePerYear",
        value: 1,
      },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 15,
    text: "questionnaire.questions.q15.text",
    observation: "questionnaire.questions.q15.observation",
    option: [
      {
        label: "questionnaire.questions.options.noQualityMonitoringSystem",
        value: null,
      },
      {
        label: "questionnaire.questions.options.lessThan25AllPoints",
        value: 0,
      },
      {
        label: "questionnaire.questions.options.between26And50Points",
        value: 0.333,
      },
      {
        label: "questionnaire.questions.options.between51And79Points",
        value: 0.666,
      },
      {
        label: "questionnaire.questions.options.above80",
        value: 1,
      },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 16,
    text: "questionnaire.questions.q16.text",
    option: [
      {
        label: "questionnaire.questions.options.noQualityMonitoringSystem",
        value: null,
      },
      {
        label: "questionnaire.questions.options.no",
        value: 0,
      },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 17,
    text: "questionnaire.questions.q17.text",
    option: [
      {
        label: "questionnaire.questions.options.noQualityMonitoringSystem",
        value: null,
      },
      {
        label: "questionnaire.questions.options.no",
        value: 0,
      },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "analise-agua",
  },
  {
    id: 18,
    text: "questionnaire.questions.q18.text",
    option: [
      { label: "questionnaire.questions.options.yes", value: 0 },
      { label: "questionnaire.questions.options.no", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 19,
    text: "questionnaire.questions.q19.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 20,
    text: "questionnaire.questions.q20.text",
    option: [
      { label: "questionnaire.questions.options.yes", value: 0 },
      { label: "questionnaire.questions.options.no", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 21,
    text: "questionnaire.questions.q21.text",
    option: [
      { label: "questionnaire.questions.options.doesNotClean", value: 0 },
      {
        label: "questionnaire.questions.options.moreThanOncePerWeek",
        value: 0.25,
      },
      { label: "questionnaire.questions.options.oncePerWeek", value: 0.5 },
      { label: "questionnaire.questions.options.twicePerWeek", value: 0.75 },
      { label: "questionnaire.questions.options.daily", value: 1 },
    ],
    groupMain: "qualidade-agua",
    group: "conservacao-agua",
  },
  {
    id: 22,
    text: "questionnaire.questions.q22.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 23,
    text: "questionnaire.questions.q23.text",
    option: [
      {
        label: "questionnaire.questions.options.noStorageTreatmentSystem",
        value: null,
      },
      { label: "questionnaire.questions.options.notApplicable", value: 0 },
      { label: "questionnaire.questions.options.no", value: 0.5 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 24,
    text: "questionnaire.questions.q24.text",
    option: [
      {
        label: "questionnaire.questions.options.noStorageTreatmentSystemWaste",
        value: null,
      },
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 25,
    text: "questionnaire.questions.q25.text",
    option: [
      {
        label: "questionnaire.questions.options.noStorageTreatmentSystemWaste",
        value: null,
      },
      { label: "questionnaire.questions.options.yes", value: 0 },
      { label: "questionnaire.questions.options.no", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 26,
    text: "questionnaire.questions.q26.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "estrutura",
  },
  {
    id: 27,
    text: "questionnaire.questions.q27.text",
    observation: "questionnaire.questions.q27.observation",
    option: [
      {
        label: "questionnaire.questions.options.in100PercentMilkings",
        value: 0,
      },
      {
        label: "questionnaire.questions.options.inLessThan100PercentMilkings",
        value: 1,
      },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 28,
    text: "questionnaire.questions.q28.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 29,
    text: "questionnaire.questions.q29.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 30,
    text: "questionnaire.questions.q30.text",
    observation: "questionnaire.questions.q30.observation",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "manejo",
  },
  {
    id: 31,
    text: "questionnaire.questions.q31.text",
    observation: "questionnaire.questions.q31.observation",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 32,
    text: "questionnaire.questions.q32.text",
    option: [
      { label: "questionnaire.questions.options.no", value: 0 },
      { label: "questionnaire.questions.options.yes", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 33,
    text: "questionnaire.questions.q33.text",
    option: [
      { label: "questionnaire.questions.options.doesNotPerform", value: 0 },
      {
        label: "questionnaire.questions.options.analysisEvery3YearsOrMore",
        value: 0.333,
      },
      {
        label: "questionnaire.questions.options.analysisEvery2Years",
        value: 0.666,
      },
      { label: "questionnaire.questions.options.annualAnalysis", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 34,
    text: "questionnaire.questions.q34.text",
    option: [
      { label: "questionnaire.questions.options.doesNotApply", value: 0 },
      {
        label: "questionnaire.questions.options.weeklyApplication",
        value: 0.2,
      },
      {
        label: "questionnaire.questions.options.biweeklyApplication",
        value: 0.4,
      },
      {
        label: "questionnaire.questions.options.monthlyApplication",
        value: 0.6,
      },
      {
        label: "questionnaire.questions.options.quarterlyApplication",
        value: 0.8,
      },
      { label: "questionnaire.questions.options.every4MonthsOrMore", value: 1 },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
  {
    id: 35,
    text: "questionnaire.questions.q35.text",
    option: [
      { label: "questionnaire.questions.options.doesNotApply", value: 0 },
      {
        label: "questionnaire.questions.options.surfaceApplication",
        value: 0.5,
      },
      {
        label: "questionnaire.questions.options.incorporatedIntoSoil",
        value: 1,
      },
    ],
    groupMain: "manejo-residuos-uso-fertilizantes",
    group: "adubacao",
  },
];
