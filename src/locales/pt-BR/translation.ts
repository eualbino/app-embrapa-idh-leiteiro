export default {
  translation: {
    // Common
    common: {
      email: "E-mail",
      password: "Senha",
      name: "Nome",
      confirm: "Confirmar",
      cancel: "Cancelar",
      save: "Salvar",
      continue: "Continuar",
      back: "Voltar",
      next: "Próximo",
      previous: "Anterior",
      finish: "Finalizar",
      yes: "Sim",
      no: "Não",
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso",
      warning: "Atenção",
      info: "Informação",
      notApplicable: "Não se aplica",
      logout: "Sair",
      logoutTitle: "Sair da Conta",
      logoutMessage: "Tem certeza que deseja sair da sua conta?",
      logoutConfirm: "Sair",
      logoutCancel: "Cancelar",
    },

    // Login & Register
    auth: {
      login: "Login",
      register: "Cadastrar",
      forgotPassword: "Esqueci minha senha",
      loginButton: "Entrar",
      registerButton: "Registrar",
      backToLogin: "Voltar ao Login",
      errors: {
        invalidCredentials: "Dados de login inválidos.",
        loginFailed: "Não foi possível fazer login. Tente novamente.",
        invalidData: "Dados inválidos.",
        registerFailed: "Não foi possível cadastrar. Tente novamente.",
        emailOrCpfExists: "Email ou CPF já cadastrado.",
      },
      success: {
        loginSuccess: "Login realizado!",
        loginWelcome: "Bem-vindo de volta!",
        registerSuccess: "Cadastro realizado!",
        registerMessage: "Faça login para continuar.",
      },
    },

    // Forgot Password
    forgotPassword: {
      title: "Esqueceu a Senha?",
      sendEmailTitle: "Esqueceu a Senha?",
      sendEmailDescription:
        "Digite seu e-mail cadastrado e enviaremos um código de verificação para redefinir sua senha.",
      confirmCodeTitle: "Confirmar Código",
      confirmCodeDescription: "Foi enviado um código para seu e-mail:",
      resetPasswordTitle: "Redefinir Senha",
      resetPasswordDescription: "Crie uma nova senha para sua conta.",

      email: "E-mail",
      emailPlaceholder: "seu.email@exemplo.com",
      code: "Código de Verificação",
      codePlaceholder: "Digite o código",
      newPassword: "Nova Senha",
      newPasswordPlaceholder: "Digite sua nova senha",
      confirmPassword: "Confirmar Nova Senha",
      confirmPasswordPlaceholder: "Digite sua senha novamente",

      sendCode: "Enviar Código",
      sending: "Enviando...",
      confirmCode: "Confirmar Código",
      verifying: "Verificando...",
      resetPassword: "Redefinir Senha",
      resetting: "Redefinindo...",

      didntReceiveCode: "Não recebeu o código?",
      resendCode: "Reenviar código",
      resending: "Reenviando...",

      // Password requirements
      passwordRequirements: {
        minLength: "Mínimo de 8 caracteres",
        hasUpperCase: "Pelo menos uma letra maiúscula",
        hasLowerCase: "Pelo menos uma letra minúscula",
        hasNumber: "Pelo menos um número",
        hasSpecialChar: "Pelo menos um caractere especial",
      },

      // Toast messages
      errors: {
        emptyEmail: "Por favor, insira seu e-mail.",
        invalidEmail: "Por favor, insira um e-mail válido.",
        sendEmailFailed: "Não foi possível enviar o e-mail. Tente novamente.",
        emptyCode: "Por favor, insira o código de verificação.",
        invalidCode: "O código deve ter pelo menos 4 dígitos.",
        verifyCodeFailed: "Código inválido ou expirado. Tente novamente.",
        resendFailed: "Não foi possível reenviar o código.",
        emptyPassword: "Por favor, insira sua nova senha.",
        invalidPassword: "A senha não atende aos requisitos mínimos.",
        passwordMismatch: "As senhas não coincidem.",
        resetFailed: "Não foi possível redefinir a senha.",
      },

      success: {
        emailSent: "E-mail Enviado",
        emailSentMessage:
          "Um código de verificação foi enviado para seu e-mail.",
        codeVerified: "Código Verificado",
        codeVerifiedMessage: "Código confirmado com sucesso!",
        codeResent: "Código Reenviado",
        codeResentMessage: "Um novo código foi enviado para seu e-mail.",
        passwordReset: "Senha Redefinida",
        passwordResetMessage: "Sua senha foi redefinida com sucesso!",
      },
    },

    // Questionnaire
    questionnaire: {
      titleCaracterization: "Caracterização",
      subtitleCaracterization:
        "Primeiramente vamos caracterizar o seu sistema de produção.",
      titleQuantity: "Dimensão – Quantidade de Água",
      titleQuality: "Dimensão – Qualidade da Água",
      titleWaste: "Dimensão – Manejo de Resíduos",
      subtitle:
        "Responda o questionário e obtenha um escore individual, indicando o nível de desempenho hídrico do sistema de produção leiteira.",
      date: "Data",
      identification: "Identificação",
      // Characterization (used across form sections)
      characterization: {
        location: {
          sectionTitle: "LOCALIZAÇÃO:",
          country: "País",
          countryPlaceholder: "Digite o país",
          state: "Estado",
          statePlaceholder: "Digite o estado",
          city: "Cidade",
          cityPlaceholder: "Digite a cidade",
        },
        productionSystem: {
          sectionTitle: "SISTEMA DE PRODUÇÃO:",
          question: "Qual é o Sistema de Produção empregado pela propriedade?",
          options: {
            exclusivelyPasture: "Exclusivamente a pasto",
            pastureWithSupplementation:
              "Pastagem com suplementação proteica e/ou energética no cocho",
            confinedNoPasture:
              "Confinado (volumoso e concentrado no cocho) sem acesso a pastagem",
            confinedLactatingCows:
              "Confinado para vacas em lactação e pasto (com ou sem suplementação) para demais categorias",
            other: "Outro. Qual?",
          },
          otherPlaceholder: "Especifique outro sistema",
        },
        area: {
          sectionTitle: "ÁREA:",
          totalArea:
            "Qual a área da propriedade utilizada na atividade leiteira, em hectares?",
          totalAreaPlaceholder: "Área da Propriedade",
          pastureArea: "Qual a área de pastagem, em hectares?",
          pastureAreaPlaceholder: "Área de Pastagem",
          silageArea: "Qual a área de silagem, em hectares?",
          silageAreaPlaceholder: "Área de Silagem",
        },
        herd: {
          sectionTitle: "REBANHO: (em número de cabeças)",
          lactatingCows: "Vacas em lactação",
          lactatingCowsPlaceholder: "Vacas em Lactação",
          dryCows: "Vacas secas",
          dryCowsPlaceholder: "Vacas Secas",
          calves: "Bezerros (macho e fêmea)",
          calvesPlaceholder: "Bezerros",
          heifers: "Novilhas",
          heifersPlaceholder: "Novilhas",
          steers: "Garrotes",
          steersPlaceholder: "Garrotes",
          bulls: "Touros",
          bullsPlaceholder: "Touros",
        },
        milkProduction: {
          sectionTitle: "PRODUÇÃO LEITEIRA:",
          dailyProduction:
            "Qual a produção de leite diária da propriedade (litros/dia)?",
          dailyProductionPlaceholder: "Litros/dia da propriedade",
          productionPerCow:
            "Qual a produção de leite por vaca/dia (litros/vaca/dia)?",
          productionPerCowPlaceholder: "Litros/vaca/dia",
        },
        milkComposition: {
          sectionTitle: "COMPOSIÇÃO DO LEITE:",
          fatPercentage: "Qual o percentual de gordura do leite?",
          fatPercentagePlaceholder: "Percentual de Gordura (%)",
          proteinPercentage: "Qual o percentual de proteína do leite?",
          proteinPercentagePlaceholder: "Percentual de Proteína (%)",
        },
        dailyConsumption: {
          sectionTitle: "CONSUMO DIÁRIO DE VACAS EM LACTAÇÃO:",
          roughageConsumption:
            "Qual o consumo diário de volumoso por vaca (kg)?",
          roughageConsumptionPlaceholder: "Consumo de Volumoso",
          concentrateConsumption:
            "Qual o consumo diário de concentrado por vaca (kg)?",
          concentrateConsumptionPlaceholder: "Consumo de Concentrado",
          unitInformed: "Unidade informada:",
          naturalMatter: "Matéria Natural",
          dryMatter: "Matéria Seca",
        },
        electricEnergy: {
          sectionTitle: "ENERGIA ELÉTRICA:",
          monthlyConsumption:
            "Qual o consumo mensal de energia elétrica (kWh/mês)?",
          monthlyConsumptionPlaceholder: "Consumo Mensal (kWh/mês)",
          hasSolarEnergy: "A propriedade possui energia fotovoltaica?",
        },
        environmentalLegislation: {
          sectionTitle: "LEGISLAÇÃO AMBIENTAL:",
          hasEnvironmentalLicense:
            "A propriedade possui licença ambiental da atividade leiteira?",
          hasWaterGrant: "A propriedade possui outorga de uso da água?",
        },
      },
      name: "Nome",
      country: "País",
      city: "Município",

      // Production System
      productionSystem: {
        title: "Sistema de Produção",
        question: "Qual Sistema de Produção empregado pela propriedade?",
        pasture: "Exclusivamente a pasto",
        pastureWithSupplement:
          "Pastagem com suplementação proteica e/ou energética no cocho",
        confined:
          "Confinado (volumoso e concentrado no cocho) sem acesso a pastagem",
        confinedLactating:
          "Confinado para vacas em lactação e pasto (com ou sem suplementação) para demais categorias",
        other: "Outro",
      },

      // Area
      area: {
        title: "Área",
        farmArea: "Área da propriedade utilizada na atividade leiteira",
        pastureArea: "Área com pastagem",
        silageArea: "Área usada para produção de silagem",
      },

      // Cattle Herd
      herd: {
        title: "Rebanho Bovino (média dos últimos 12 meses)",
        lactatingCows: "Vacas em lactação",
        dryCows: "Vacas secas",
        heifers: "Novilhas (mais de 12 meses)",
        calves: "Bezerros - fêmeas + machos (menos de 12 meses)",
        steers: "Garrotes",
        bulls: "Touros",
      },

      // Milk Production
      milkProduction: {
        title: "Produção Leiteira (média dos últimos 12 meses)",
        litersPerDay: "Litros/Dia",
        litersPerCowPerDay: "Litros/Vaca/Dia",
        fatPercentage: "% de gordura no leite",
        proteinPercentage: "% de proteína no leite",
      },

      // Consumption
      consumption: {
        title: "Consumo Diário",
        averageConsumption:
          "Média do consumo diário (kg) de volumoso e concentrado das vacas em lactação?",
        roughage: "Volumoso (kg/vaca em lactação/dia)",
        concentrate: "Concentrado (kg/vaca em lactação/dia)",
        unit: "Qual unidade informada?",
        freshMatter: "Matéria Natural",
        dryMatter: "Matéria Seca",
      },

      // Energy
      energy: {
        title: "Energia Elétrica",
        monthlyConsumption:
          "Qual é a média mensal de consumo de energia elétrica? (KWh)",
        hasPhotovoltaic: "Tem Energia Fotovoltáica?",
      },

      // Environmental Legislation
      environmental: {
        title: "Legislação Ambiental",
        environmentalLicense: "Tem Licença Ambiental da Atividade Leiteira?",
        waterGrant: "Tem Outorga de uso da água?",
        no: "Não",
        yes: "Sim",
        exempt: "Dispensa",
      },

      // Water sections will be added separately due to size
      water: {
        quantity: "Quantidade de Água",
        consumption: "Consumo de Água",
        losses: "Perdas de Água",
        security: "Segurança Hídrica",
        quality: "Qualidade de Água",
        conservation: "Conservação da Água",
      },

      questions: {
        progress: "Progresso",
        category: "Categoria {{current}} de {{total}}",
        characterizationTitle:
          "Caracterização da Propriedade / Rebanho / Sistema",
        waterQuantityTitle: "Quantidade de Água",
        waterQualityTitle: "Qualidade da Água",
        wasteManagementTitle: "Manejo de Resíduos e Uso de Fertilizantes",
        dateLabel: "Data (dd/mm/aaaa)",
        previous: "Voltar",
        next: "Próximo",
        finish: "Finalizar",
        // Toasts
        toasts: {
          requiredFieldsTitle: "Campos Obrigatórios",
          fillFieldsPrefix: "Por favor, preencha os seguintes campos:",
          missingFormDataTitle: "Erro",
          missingFormDataMessage:
            "Dados do formulário de caracterização não disponíveis.",
          answerAllTitle: "Atenção",
          answerAllMessage: "Responda todas as perguntas antes de continuar.",
          completedTitle: "Sucesso",
          completedMessage: "Você finalizou todas as perguntas!",
          scoreTitle: "Seu escore em {{groupName}} foi de:",
        },
        groups: {
          "quantidade-agua": "Quantidade de Água",
          "qualidade-agua": "Qualidade de Água",
          "manejo-residuos-uso-fertilizantes":
            "Manejo de Resíduos e Uso de Fertilizantes",
        },
        // Individual questions
        q1: {
          text: "Existe um MAPA HIDRÁULICO da propriedade?",
          observation:
            "O Mapa Hidráulico é o mapeamento de toda a rede hidráulica do sistema de produção com a identificação das fontes de água, pontos de consumo, localização de bombas e fluxos de águas pluviais e de efluentes",
        },
        q2: {
          text: "Há MEDIÇÃO DO CONSUMO DE ÁGUA da propriedade?",
        },
        q3: {
          text: "Qual é a FREQUÊNCIA DE LEITURA da medição durante o mês?",
        },
        q4: {
          text: "Qual é o % de pontos de consumo de água que é monitorado?",
          observation:
            "Identifique o total de pontos de consumo que existem na propriedade. Determine quantos deles possuem monitoramento com hidrômetro. Divida o número de pontos com monitoramento pelo número total e multiplique por 100.",
        },
        q5: {
          text: "A atividade possui metas de redução do consumo ou perda de água?",
          observation:
            "Um plano com metas para a redução do consumo de água ou das perdas deve conter uma etapa que descreva como isso será alcançado dentro do prazo previsto.",
        },
        q6: {
          text: "A propriedade possui um SISTEMA DE CONTROLE DE VAZÃO DE ÁGUA nas mangueiras de lavagem da sala de ORDENHA?",
        },
        q7: {
          text: "Há BOIAS DE NÍVEL nos BEBEDOUROS?",
        },
        q8: {
          text: "Há BOIAS DE NÍVEL nas ESTRUTURAS DE ARMAZENAMENTO de água da ordenha (ex. caixas de água)?",
        },
        q9: {
          text: "Qual é a ROTINA de IDENTIFICAÇÃO DE VAZAMENTOS?",
        },
        q10: {
          text: "Propriedade possui programa de uso de água de IRRIGAÇÃO?",
          observation:
            "O Programa de irrigação deve conter o cálculo da lâmina de água a ser aplicada de acordo com os parâmetros técnicos (aspectos climáticos, umidade do solo, etc.). Não se aplica quando as propriedades não fazem irrigação.",
        },
        q11: {
          text: "O acionamento do sistema de RESFRIAMENTO dos animais é feito com base em parâmetros técnicos?",
          observation:
            "Sistema de resfriamento que aciona de acordo com parâmetros técnicos (temperatura e umidade ambiente).",
        },
        q12: {
          text: "A propriedade possui CAPTAÇÃO DE ÁGUA DA CHUVA e armazenamento em CISTERNA?",
        },
        q13: {
          text: "A propriedade faz REUSO DA ÁGUA OU DE EFLUENTES? (ex. uso da água da lavagem de bebedouros para lavagem do piso, reuso do efluente para lavagem do piso, reuso do efluente na irrigação, etc.)",
        },
        q14: {
          text: "A propriedade MONITORA A QUALIDADE da água?",
        },
        q15: {
          text: "Qual a % DE PONTOS DE ÁGUA MONITORADOS para qualidade da água em relação ao total de pontos de consumo?",
          observation:
            "Identifique o total de pontos de consumo que existem na propriedade. Determine quantos pontos possuem coleta e análise de água. Divida o número de pontos de coleta pelo número total de pontos de consumo e multiplique por 100.",
        },
        q16: {
          text: "A propriedade faz ANÁLISE DE NITRATO na água?",
        },
        q17: {
          text: "A propriedade faz ANÁLISE DE Escherichia coli na água?",
        },
        q18: {
          text: "Os animais tem ACESSO A CORPOS D'ÁGUA (rios, lagos, açudes, nascentes)?",
        },
        q19: {
          text: "Toda ÁGUA DE CONSUMO DOS ANIMAIS é OFERECIDA em bebedouros?",
        },
        q20: {
          text: "Áreas ao redor dos bebedouros apresentam acúmulo de ÁGUA ou LAMA?",
        },
        q21: {
          text: "A FREQUÊNCIA de LIMPEZA DOS BEBEDOUROS é:",
        },
        q22: {
          text: "A propriedade possui SISTEMA DE TRATAMENTO do DEJETO da ordenha? (EX. esterqueira, lagoa, biodigestor, etc.)?",
        },
        q23: {
          text: "A propriedade possui SISTEMA ou tratamento de dejetos IMPERMEABILIZADO?",
        },
        q24: {
          text: "As ÁGUAS DE CHUVA que caem no piso da ordenha e área de espera são DESVIADAS do Sistema ou tratamento dos dejetos?",
        },
        q25: {
          text: "Há ocorrência de VAZAMENTOS NOS SISTEMAS de tratamento dos dejetos?",
        },
        q26: {
          text: "Há CALHAS NO TELHADO da ordenha?",
        },
        q27: {
          text: "Qual é o % de LAVAGENS DO PISO do curral de espera e da sala de ordenha no total de número de ordenhas?",
          observation:
            "Determine quantas lavagens se faz por dia. Divida o número de lavagens pelo número total de ordenhas e multiplique por 100.",
        },
        q28: {
          text: "A propriedade faz RASPAGEM DO ESTERCO do piso antes da lavagem?",
        },
        q29: {
          text: "Usa ÁGUA COM PRESSÃO (lava-jato) NA LAVAGEM de instalações e equipamentos?",
        },
        q30: {
          text: "A propriedade possui um PLANO DE EMERGÊNCIA para eventos extremos?",
          observation:
            "Como eventos extremos entende-se: transbordamento da esterqueira/lagoa de dejetos, rompimento de canal/canaleta que transporta dejeto, escoamento superficial de resíduo pelo solo, etc.",
        },
        q31: {
          text: "A propriedade DOCUMENTA E MONITORA o uso de fertilizantes químicos e orgânicos?",
          observation:
            "Todo o uso de fertilizante químico ou orgânico é documentado por tamanho da área de aplicação, tipo de cultura, quantidade de NPK aplicada, data de aplicação e considerando a análise de fertilidade do solo da área.",
        },
        q32: {
          text: "Faz ANÁLISE EM LABORATÓRIO da concentração de nutrientes (nitrogênio, fósforo e potássio) do RESÍDUO ORGÂNICO?",
        },
        q33: {
          text: "A propriedade faz ANÁLISE DO SOLO de todas as áreas que recebem fertilizante?",
        },
        q34: {
          text: "Qual a PERIODICIDADE DE APLICAÇÃO dos resíduos como adubo?",
        },
        q35: {
          text: "Qual a FORMA DE APLICAÇÃO dos resíduos no solo?",
        },
        // Options (answer choices)
        options: {
          no: "Não",
          yes: "Sim",
          notApplicable: "Não se aplica",
          doesNotHave: "Não faz",
          doesNotMonitor: "Não monitora",
          doesNotPerform: "Não realiza",
          doesNotClean: "Não faz limpeza dos bebedouros",
          doesNotApply: "Não faz aplicação",
          doesNotIrrigation: "Não faz irrigação",
          noMeasurementSystem: "Não possui sistema de medição",
          noQualityMonitoringSystem:
            "Não possui sistema de monitoramento de qualidade da água",
          noStorageTreatmentSystem:
            "Não possui sistema de armazenamento ou tratamento de dejetos",
          noStorageTreatmentSystemWaste:
            "Não possui sistema de armazenamento ou tratamento dos dejetos",
          noCooling: "Não faz resfriamento (Não se aplica)",
          monthlyOrMore: "Mensal ou superior",
          biweekly: "Quinzenal",
          weekly: "Semanal",
          daily: "Diária",
          monthly: "Mensal",
          oncePerWeek: "1 vez por semana",
          twicePerWeek: "2 vez por semana",
          moreThanOncePerWeek: "Menor que 1 vez por semana",
          lessThan25: "Menos de 25%",
          between26And50: "Entre 26% a 50%",
          between51And79: "Entre 51% a 79%",
          above80: "Acima de 80%",
          lessThan25AllPoints:
            "Menos de 25% de todos os pontos de consumo são monitorados",
          between26And50Points:
            "Entre 26% e 50% dos pontos de consumo são monitorados",
          between51And79Points:
            "Entre 51% e 79% dos pontos de consumo são monitorados",
          analysisOncePerYear: "Realiza análise 1 vez por ano",
          analysisTwicePerYear: "Realiza análise 2 vezes por ano",
          analysisEvery3YearsOrMore:
            "Realiza análise a cada 3 anos ou mais ou é esporádico",
          analysisEvery2Years: "Realiza análise a cada 2 anos",
          annualAnalysis: "Realiza análise anual",
          in100PercentMilkings: "Em 100% das ordenhas",
          inLessThan100PercentMilkings:
            "Em menos de 100% das ordenhas (há menos de piso em algumas das ordenhas)",
          noBasedOnProducerDecision:
            "NÃO, o acionamento é feito com base na decisão do produtor(a)",
          yesBasedOnTechnicalParameters:
            "SIM, o acionamento é feito com base em parâmetros técnicos considerando a temperatura e umidade do ambiente",
          weeklyApplication: "Aplicação Semanal",
          biweeklyApplication: "Aplicação Quinzenal",
          monthlyApplication: "Aplicação Mensal",
          quarterlyApplication: "Aplicação Trimestral",
          every4MonthsOrMore: "Aplicação a cada 4 meses ou mais",
          surfaceApplication: "Aplica de forma superficial",
          incorporatedIntoSoil: "Aplica o resíduo incorporando ele no solo",
        },
      },
      validation: {
        // Localização
        cidadeRequired: "Cidade",
        estadoRequired: "Estado",
        paisRequired: "País",

        productionSystemRequired: "Sistema de Produção",
        specifyOtherProductionSystem:
          'Especifique o sistema de produção quando "Outro" for selecionado',

        // Área
        farmAreaRequired: "Área da propriedade",
        pastureAreaRequired: "Área de pastagem",
        silageAreaRequired: "Área de silagem",
        areaExceedsTotalArea:
          "A soma da área de pastagem e silagem não pode ser maior que a área total da propriedade",

        // Rebanho
        lactatingCowsRequired: "Número de vacas em lactação",
        dryCowsRequired: "Número de vacas secas",
        heifersRequired: "Número de novilhas",
        calvesRequired: "Número de bezerros",
        steersRequired: "Número de garrotes",

        // Produção Leiteira
        dailyProductionRequired: "Produção de litros por dia",
        productionPerCowRequired: "Produção de litros por vaca/dia",
        dailyProductionMinimum:
          "Produção de litros por dia deve ser no mínimo 0,1",
        productionPerCowMinimum:
          "Produção de litros por vaca/dia deve ser no mínimo 0,1",

        // Composição do Leite
        fatPercentageRequired: "Percentual de gordura do leite",
        fatPercentageMinimum: "Percentual de gordura deve ser no mínimo 0,1",
        proteinPercentageRequired: "Percentual de proteína do leite",
        proteinPercentageMinimum:
          "Percentual de proteína deve ser no mínimo 0,1",

        // Consumo Diário
        roughageConsumptionRequired: "Consumo de volumoso",
        concentrateConsumptionRequired: "Consumo de concentrado",
        consumptionUnitRequired: "Unidade de medida do consumo",

        // Energia Elétrica
        electricityConsumptionRequired: "Consumo mensal de energia elétrica",
        electricityConsumptionMinimum:
          "Consumo de energia deve ser no mínimo 0,1 kWh",
        photovoltaicEnergyRequired: "Informação sobre energia fotovoltaica",

        // Legislação Ambiental
        environmentalLicenseRequired: "Licença ambiental",
        waterGrantRequired: "Outorga de água",
      },
    },

    // Result Page
    result: {
      title: "Escore Geral do IDH Leite",
      improvementSuggestions: "Sugestões de Boas Práticas",
      categoryWaterQuantity: "Quantidade de Água",
      categoryWaterQuality: "Qualidade da Água",
      categoryWasteManagement: "Manejo de Resíduos",
      approved: "Aprovado",
      needsImprovement: "Como Melhorar",
      minimumScore: "Mínimo",
      congratulations: "Parabéns!",
      congratulationsMessage:
        "Sua propriedade atingiu todas as notas mínimas para cada Dimensão do IDH Leite. Continue mantendo as boas práticas de uso da água e manejo de resíduos!",
      loadingResults: "Carregando resultados...",
      errorLoadingTitle: "Erro ao carregar resultados",
      errorLoadingMessage: "Não foi possível carregar os dados da performance",
      detailedScores: "Pontuações Detalhadas",
      idhMilk: "IDH Leite",
      didNotReachMinimum: "Não atingiu a nota mínima",
      improvements: {
        waterManagement: {
          waterConsumption: {
            title: "Mesoindicador Consumo de Água",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Ter o mapa hidráulico da propriedade",
              "Medir o consumo de água de no mínimo 25% dos pontos de consumo com periodicidade mensal",
            ],
          },
          waterLosses: {
            title: "Mesoindicador Perdas de Água",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Ter controle de vazão nas mangueiras de lavagem",
              "Boias de nível instaladas nos bebedouros e nas estruturas de armazenamentos de água",
              "Verificar com periodicidade semanal a ocorrência de vazamentos",
            ],
          },
          waterSecurity: {
            title: "Mesoindicador Segurança Hídrica",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: ["Ter alguma forma de reuso da água e/ou efluente"],
          },
        },
        waterQuality: {
          waterAnalysis: {
            title: "Mesoindicador Análise de Água",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Realizar a análise de água uma vez ao ano",
              "Analisar a qualidade da água em no mínimo 25% dos pontos de consumo",
              "Realizar a análise de Escherichia coli",
            ],
          },
          waterConservation: {
            title: "Mesoindicador Conservação da Água",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Os animais não podem ter acesso a cursos de água naturais (rios, nascentes, lagoas, etc.)",
              "Toda água é servida aos animais por bebedouros",
              "Bebedouros limpos no mínimo duas vezes por semana",
            ],
          },
        },
        wasteManagement: {
          wasteStructure: {
            title: "Mesoindicador Estrutura para os dejetos",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Estrutura de tratamento de resíduos impermeabilizada e sem vazamentos",
            ],
          },
          wasteHandling: {
            title: "Mesoindicador Manejo de dejetos",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Não lavar o piso da ordenha após todas as ordenhas",
              "Antes da lavagem se faz a raspagem do esterco",
              "Lavagem é feita com água com pressão",
            ],
          },
          fertilization: {
            title: "Mesoindicador Adubação",
            subtitle: "Para se obter a nota mínima é necessário:",
            items: [
              "Documenta todo o uso de fertilizantes químicos e orgânicos",
              "Realiza a análise de solo das áreas no mínimo a cada dois anos",
              "Fazer a aplicação do dejeto a cada quatro meses ou mais e de forma superficial",
            ],
          },
        },
      },
      suggestions: {
        water_monitoring:
          "Implemente um sistema de monitoramento contínuo do consumo de água com hidrômetros em todos os pontos críticos da propriedade.",
        hydraulic_mapping:
          "Desenvolva um mapa hidráulico completo da propriedade para identificar possíveis pontos de perda e otimizar a distribuição de água.",
        efficient_irrigation:
          "Adote sistemas de irrigação mais eficientes, como gotejamento ou aspersão de baixa pressão, reduzindo desperdícios.",
        water_reuse:
          "Implemente sistemas de reúso de água, aproveitando efluentes tratados para irrigação de pastagens e limpeza de instalações.",
        rainwater_harvesting:
          "Instale sistemas de captação de água da chuva para uso em atividades que não exigem água potável.",
        staff_training:
          "Promova treinamentos regulares com a equipe sobre práticas de uso consciente e eficiente da água na produção leiteira.",
      },
    },

    // History Page
    history: {
      title: "Histórico de Resultados",
      description: "Veja os resultados anteriores.",
      noRecords: "Nenhum resultado encontrado.",
      userData: "Dados do Usuário",
      userName: "Nome",
      userEmail: "Email",
      userCpf: "CPF",
      propertiesHistory: "Histórico de Propriedades",
      pullToRefresh: "Puxe para baixo para tentar novamente",
      emptyMessage: "Preencha o questionário para visualizar seu histórico",
      tapToViewDetails: "Toque para ver os detalhes",
      viewingResults: "Visualizando resultados",
    },
  },
};
