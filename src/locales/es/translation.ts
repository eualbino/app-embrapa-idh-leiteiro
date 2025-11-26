export default {
  translation: {
    // Common
    common: {
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre",
      confirm: "Confirmar",
      cancel: "Cancelar",
      save: "Guardar",
      continue: "Continuar",
      back: "Volver",
      next: "Siguiente",
      previous: "Anterior",
      finish: "Finalizar",
      yes: "Sí",
      no: "No",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      warning: "Atención",
      info: "Información",
      notApplicable: "No aplica",
    },

    // Login & Register
    auth: {
      login: "Iniciar sesión",
      register: "Registrarse",
      forgotPassword: "Olvidé mi contraseña",
      loginButton: "Entrar",
      registerButton: "Registrarse",
      backToLogin: "Volver al inicio de sesión",
      systemTitle: "Sistema de Evaluación Hídrica Lechera",
    },

    // Forgot Password
    forgotPassword: {
      title: "¿Olvidó la contraseña?",
      sendEmailTitle: "¿Olvidó la contraseña?",
      sendEmailDescription:
        "Ingrese su correo electrónico registrado y le enviaremos un código de verificación para restablecer su contraseña.",
      confirmCodeTitle: "Confirmar Código",
      confirmCodeDescription: "Se envió un código a su correo electrónico:",
      resetPasswordTitle: "Restablecer Contraseña",
      resetPasswordDescription: "Cree una nueva contraseña para su cuenta.",

      email: "Correo electrónico",
      emailPlaceholder: "su.correo@ejemplo.com",
      code: "Código de Verificación",
      codePlaceholder: "Ingrese el código",
      newPassword: "Nueva Contraseña",
      newPasswordPlaceholder: "Ingrese su nueva contraseña",
      confirmPassword: "Confirmar Nueva Contraseña",
      confirmPasswordPlaceholder: "Ingrese su contraseña nuevamente",

      sendCode: "Enviar Código",
      sending: "Enviando...",
      confirmCode: "Confirmar Código",
      verifying: "Verificando...",
      resetPassword: "Restablecer Contraseña",
      resetting: "Restableciendo...",

      didntReceiveCode: "¿No recibió el código?",
      resendCode: "Reenviar código",
      resending: "Reenviando...",

      // Password requirements
      passwordRequirements: {
        minLength: "Mínimo de 8 caracteres",
        hasUpperCase: "Al menos una letra mayúscula",
        hasLowerCase: "Al menos una letra minúscula",
        hasNumber: "Al menos un número",
        hasSpecialChar: "Al menos un carácter especial",
      },

      // Toast messages
      errors: {
        emptyEmail: "Por favor, ingrese su correo electrónico.",
        invalidEmail: "Por favor, ingrese un correo electrónico válido.",
        sendEmailFailed:
          "No se pudo enviar el correo electrónico. Intente nuevamente.",
        emptyCode: "Por favor, ingrese el código de verificación.",
        invalidCode: "El código debe tener al menos 4 dígitos.",
        verifyCodeFailed: "Código inválido o expirado. Intente nuevamente.",
        resendFailed: "No se pudo reenviar el código.",
        emptyPassword: "Por favor, ingrese su nueva contraseña.",
        invalidPassword: "La contraseña no cumple con los requisitos mínimos.",
        passwordMismatch: "Las contraseñas no coinciden.",
        resetFailed: "No se pudo restablecer la contraseña.",
      },

      success: {
        emailSent: "Correo Enviado",
        emailSentMessage:
          "Se envió un código de verificación a su correo electrónico.",
        codeVerified: "Código Verificado",
        codeVerifiedMessage: "¡Código confirmado exitosamente!",
        codeResent: "Código Reenviado",
        codeResentMessage: "Se envió un nuevo código a su correo electrónico.",
        passwordReset: "Contraseña Restablecida",
        passwordResetMessage:
          "¡Su contraseña ha sido restablecida exitosamente!",
      },
    },

    // Questionnaire
    questionnaire: {
      title: "Cuestionario",
      subtitle:
        "Responda el cuestionario y obtenga una puntuación individual que indique el nivel de desempeño hídrico del sistema de producción lechera.",
      date: "Fecha",
      identification: "Identificación",
      // Caracterización (usado en secciones del formulario)
      characterization: {
        location: {
          sectionTitle: "UBICACIÓN:",
          country: "País",
          countryPlaceholder: "Ingrese el país",
          city: "Ciudad",
          cityPlaceholder: "Ingrese la ciudad",
        },
        productionSystem: {
          sectionTitle: "A. SISTEMA DE PRODUCCIÓN:",
          question: "¿Cuál es el sistema de producción empleado por la finca?",
          options: {
            exclusivelyPasture: "Exclusivamente a pasto",
            pastureWithSupplementation:
              "Pastoreo con suplementación proteica y/o energética en comedero",
            confinedNoPasture:
              "Confinado (forraje y concentrado en comedero) sin acceso a pastoreo",
            confinedLactatingCows:
              "Confinado para vacas en lactación y pasto (con o sin suplementación) para las demás categorías",
            other: "Otro. ¿Cuál?",
          },
          otherPlaceholder: "Especifique otro sistema",
        },
        area: {
          sectionTitle: "B. ÁREA:",
          totalArea: "¿Cuál es el área total de la finca, en hectáreas (ha)?",
          totalAreaPlaceholder: "Área de la Finca (ha)",
          pastureArea: "¿Cuál es el área de pastoreo, en hectáreas (ha)?",
          pastureAreaPlaceholder: "Área de Pastoreo (ha)",
          silageArea: "¿Cuál es el área de ensilaje, en hectáreas (ha)?",
          silageAreaPlaceholder: "Área de Ensilaje (ha)",
        },
        herd: {
          sectionTitle: "C. REBAÑO:",
          lactatingCows: "Vacas en lactación",
          lactatingCowsPlaceholder: "Vacas en lactación",
          dryCows: "Vacas secas",
          dryCowsPlaceholder: "Vacas secas",
          heifers: "Novillas",
          heifersPlaceholder: "Novillas",
          calves: "Terneros",
          calvesPlaceholder: "Terneros",
          steers: "Novillos",
          steersPlaceholder: "Novillos",
          bulls: "Toros",
          bullsPlaceholder: "Toros",
        },
        milkProduction: {
          sectionTitle: "D. PRODUCCIÓN LECHERA:",
          dailyProduction:
            "¿Cuál es la producción diaria de leche de la finca (litros/día)?",
          dailyProductionPlaceholder: "Litros/día de la finca",
          productionPerCow:
            "¿Cuál es la producción de leche por vaca/día (litros/vaca/día)?",
          productionPerCowPlaceholder: "Litros/vaca/día",
        },
        milkComposition: {
          sectionTitle: "E. COMPOSICIÓN DE LA LECHE:",
          fatPercentage: "¿Cuál es el porcentaje de grasa de la leche?",
          fatPercentagePlaceholder: "Porcentaje de Grasa (%)",
          proteinPercentage: "¿Cuál es el porcentaje de proteína de la leche?",
          proteinPercentagePlaceholder: "Porcentaje de Proteína (%)",
        },
        dailyConsumption: {
          sectionTitle: "F. CONSUMO DIARIO:",
          roughageConsumption:
            "¿Cuál es el consumo diario de forraje por vaca (Materia Fresca o Materia Seca)?",
          roughageConsumptionPlaceholder: "Consumo de Forraje",
          concentrateConsumption:
            "¿Cuál es el consumo diario de concentrado por vaca (Materia Fresca o Materia Seca)?",
          concentrateConsumptionPlaceholder: "Consumo de Concentrado",
          unitInformed: "Unidad informada:",
          naturalMatter: "Materia Fresca",
          dryMatter: "Materia Seca",
        },
        electricEnergy: {
          sectionTitle: "G. ENERGÍA ELÉCTRICA:",
          monthlyConsumption:
            "¿Cuál es el consumo mensual de energía eléctrica (kWh/mes)?",
          monthlyConsumptionPlaceholder: "Consumo Mensual (kWh/mes)",
          hasSolarEnergy: "¿La finca posee energía fotovoltaica?",
        },
        environmentalLegislation: {
          sectionTitle: "H. LEGISLACIÓN AMBIENTAL:",
          hasEnvironmentalLicense: "¿La finca posee licencia ambiental?",
          hasWaterGrant: "¿La finca posee autorización de uso de agua?",
        },
      },
      name: "Nombre",
      country: "País",
      city: "Ciudad",

      // Production System
      productionSystem: {
        title: "Sistema de Producción",
        question: "¿Qué sistema de producción emplea la finca?",
        pasture: "Exclusivamente a pasto",
        pastureWithSupplement:
          "Pastoreo con suplementación proteica y/o energética en comedero",
        confined: "Confinado sin acceso a pastoreo",
        confinedLactating:
          "Confinado para vacas lecheras y pastoreo (con o sin suplementación) para otras categorías",
        other: "Otro",
      },

      // Area
      area: {
        title: "Área",
        farmArea:
          "Superficie de la finca utilizada para la actividad lechera (ha)",
        pastureArea: "Superficie con pastoreo (ha)",
        silageArea: "Superficie utilizada para la producción de ensilaje (ha)",
      },

      // Cattle Herd
      herd: {
        title: "Rebaño Bovino (promedio de los últimos 12 meses)",
        lactatingCows: "Vacas en lactación (ordeñe)",
        dryCows: "Vacas secas",
        heifers: "Novillas/Vaquillonas (más de 12 meses)",
        calves: "Terneros/as (menos de 12 meses)",
        steers: "Novillos",
        bulls: "Toros",
      },

      // Milk Production
      milkProduction: {
        title: "Producción Lechera (promedio de los últimos 12 meses)",
        litersPerDay: "Litros/Día",
        litersPerCowPerDay: "Litros/Vaca/Día",
        fatPercentage: "% de grasa en la leche",
        proteinPercentage: "% de proteína en la leche",
      },

      // Consumption
      consumption: {
        title: "Consumo Diario",
        averageConsumption:
          "Consumo diario promedio (kg) de forraje y concentrado por vacas lecheras?",
        roughage: "Forraje (kg/vaca lechera/día)",
        concentrate: "Concentrado (kg/vaca en lactación/día)",
        unit: "Unidad informada",
        freshMatter: "Materia Fresca",
        dryMatter: "Materia Seca",
      },

      // Energy
      energy: {
        title: "Energía Eléctrica",
        monthlyConsumption:
          "¿Cuál es el promedio mensual de consumo de energía eléctrica? (KWh)",
        hasPhotovoltaic: "¿Posee energía fotovoltaica?",
      },

      // Environmental Legislation
      environmental: {
        title: "Legislación Ambiental",
        environmentalLicense:
          "¿Tiene Licencia Ambiental de la Actividad Lechera?",
        waterGrant: "¿Tiene Autorización de uso del agua?",
        no: "No",
        yes: "Sí",
        exempt: "Exento",
      },

      water: {
        quantity: "Cantidad de Agua",
        consumption: "Consumo de Agua",
        losses: "Pérdidas de Agua",
        security: "Seguridad Hídrica",
        quality: "Calidad del Agua",
        conservation: "Conservación del Agua",
      },

      questions: {
        progress: "Progreso",
        category: "Categoría {{current}} de {{total}}",
        characterizationTitle:
          "Caracterización de la Propiedad / Rebaño / Sistema",
        waterQuantityTitle: "Cantidad de Agua",
        waterQualityTitle: "Calidad del Agua",
        wasteManagementTitle: "Gestión de Residuos y Uso de Fertilizantes",
        dateLabel: "Fecha (dd/mm/aaaa)",
        previous: "Volver",
        next: "Siguiente",
        finish: "Finalizar",
        // Toasts
        toasts: {
          requiredFieldsTitle: "Campos Obligatorios",
          fillFieldsPrefix: "Por favor, complete los siguientes campos:",
          missingFormDataTitle: "Error",
          missingFormDataMessage:
            "Datos del formulario de caracterización no disponibles.",
          answerAllTitle: "Atención",
          answerAllMessage: "Responda todas las preguntas antes de continuar.",
          completedTitle: "Éxito",
          completedMessage: "¡Ha completado todas las preguntas!",
          scoreTitle: "Su puntuación en {{groupName}} fue de:",
        },
        groups: {
          "quantidade-agua": "Cantidad de Agua",
          "qualidade-agua": "Calidad del Agua",
          "manejo-residuos-uso-fertilizantes":
            "Manejo de Residuos y Uso de Fertilizantes",
        },
        // Individual questions
        q1: {
          text: "¿Existe un MAPA HIDRÁULICO de la finca?",
          observation:
            "El Mapa Hidráulico es el mapeo de toda la red hidráulica del sistema productivo, identificación de fuentes de agua, puntos de consumo, ubicación de bombas y flujos de aguas pluviales y efluentes",
        },
        q2: {
          text: "¿Hay MEDICIÓN DEL CONSUMO DE AGUA de la finca?",
        },
        q3: {
          text: "¿Cuál es la FRECUENCIA DE LECTURA de la medición durante el mes?",
        },
        q4: {
          text: "¿Cuál es el % de puntos de consumo de agua con monitoreo?",
          observation:
            "Identifique el total de puntos de consumo existentes en la finca. Determine cuántos de ellos poseen monitoreo con hidrómetro. Divida el número de puntos con monitoreo por el número total y multiplique por 100.",
        },
        q5: {
          text: "¿La finca posee metas de reducción del consumo o pérdida del agua?",
          observation:
            "Un plan con metas para la reducción del consumo de agua o de las pérdidas debe describir como se alcanzarán los objetivos dentro del plazo previsto.",
        },
        q6: {
          text: "¿La finca posee un SISTEMA DE CONTROL DE FLUJO DE AGUA en las mangueras de lavado de la sala de ORDEÑE?",
        },
        q7: {
          text: "¿Hay BOYAS DE NIVEL en los BEBEDEROS?",
        },
        q8: {
          text: "¿Hay BOYAS DE NIVEL en las ESTRUCTURAS DE ALMACENAMIENTO de agua del ordeñe (ej. tanques de agua)?",
        },
        q9: {
          text: "¿Cuál es la RUTINA de IDENTIFICACIÓN DE FUGAS?",
        },
        q10: {
          text: "¿La finca posee programa de uso de agua para RIEGO?",
          observation:
            "El Programa de riego debe incluir el cálculo de la lámina de agua a ser aplicada de acuerdo con los parámetros técnicos (clima, tipo de suelo, etc.). No se aplica cuando la finca no realiza riego.",
        },
        q11: {
          text: "¿El encendido del sistema de ENFRIAMIENTO de los animales se realiza con base en parámetros técnicos?",
          observation:
            "Sistema de enfriamiento que acciona con base en control con parámetros técnicos (temperatura y humedad ambiente).",
        },
        q12: {
          text: "¿La finca posee CAPTACIÓN DE AGUA DE LLUVIA?",
        },
        q13: {
          text: "¿La finca realiza REUTILIZACIÓN DEL AGUA O EFLUENTES? (ej: agua de lavado de bebederos y equipos utilizada para limpieza de pisos, reuso de efluente para riego, etc.)",
        },
        q14: {
          text: "¿La finca MONITOREA LA CALIDAD del agua?",
        },
        q15: {
          text: "¿Cuál es el % DE PUNTOS DE CONSUMO DEL AGUA MONITOREADOS para calidad del agua en relación al total de puntos de consumo?",
          observation:
            "Identifique el total de puntos de consumo existentes en la finca. Determine cuántos puntos poseen muestreo y análisis de agua. Divida el número de puntos de con análisis por el total de puntos de consumo y multiplique por 100.",
        },
        q16: {
          text: "¿La finca realiza ANÁLISIS DE NITRATO en el agua?",
        },
        q17: {
          text: "¿La finca realiza ANÁLISIS DE Escherichia coli en el agua?",
        },
        q18: {
          text: "¿Los animales tienen ACCESO DIRECTO A CUERPOS DE AGUA (ríos, lagos, represas, manantiales)?",
        },
        q19: {
          text: "¿Toda el AGUA DE CONSUMO ANIMAL se OFRECE mediante bebederos?",
        },
        q20: {
          text: "¿Las áreas alrededor de los bebederos presentan acumulación de AGUA o LODO?",
        },
        q21: {
          text: "La FRECUENCIA de LIMPIEZA DE LOS BEBEDEROS es:",
        },
        q22: {
          text: "¿La finca posee SISTEMA DE TRATAMIENTO del DESECHO del ordeñe? (EJ. estercolero, laguna, biodigestor, etc.)?",
        },
        q23: {
          text: "¿La finca posee SISTEMA de tratamiento de desechos IMPERMEABILIZADO?",
        },
        q24: {
          text: "¿El AGUA DE LLUVIA que cae en el piso de la sala de ordeñe y área de espera es DESVIADA del sistema de almacenamiento o tratamiento de desechos?",
        },
        q25: {
          text: "¿Existen FUGAS EN LOS SISTEMAS de almacenamiento/tratamiento de desechos?",
        },
        q26: {
          text: "¿Hay CANALETAS EN EL TECHO de la sala de ordeñe?",
        },
        q27: {
          text: "¿Cuál es el % de LAVADOS DEL PISO del corral de espera y de la sala de ordeñe en el total de número de ordeñes?",
          observation:
            "Determine cuántos lavados se realizan por día. Divida el número de lavados por el total de ordeñes y multiplique por 100.",
        },
        q28: {
          text: "¿La finca realiza RASPADO DEL ESTIÉRCOL del piso antes del lavado?",
        },
        q29: {
          text: "¿Usa AGUA A PRESIÓN (hidrolavadora) PARA EL LAVADO de instalaciones y equipos?",
        },
        q30: {
          text: "¿La finca posee un PLAN DE EMERGENCIA para eventos extremos?",
          observation:
            "Como eventos extremos se entiende: desbordamiento del estercolero/laguna de desechos, ruptura de canal/canaleta que transporta desecho, escurrimiento superficial de residuo por el suelo, etc.",
        },
        q31: {
          text: "¿La finca DOCUMENTA Y MONITOREA el uso de fertilizantes químicos y orgánicos?",
          observation:
            "Todo el uso de fertilizante químico u orgánico se documenta por tamaño del área de aplicación, tipo de cultivo, cantidad de NPK aplicada, fecha de aplicación y considerando el análisis de fertilidad del suelo del área.",
        },
        q32: {
          text: "¿Realiza ANÁLISIS DE LABORATORIO de la concentración de nutrientes (nitrógeno, fósforo y potasio) del RESIDUO ORGÁNICO?",
        },
        q33: {
          text: "¿La finca realiza ANÁLISIS DEL SUELO de todas las áreas que reciben fertilizante?",
        },
        q34: {
          text: "¿Cuál es la PERIODICIDAD DE APLICACIÓN de los residuos como abono?",
        },
        q35: {
          text: "¿Cuál es la FORMA DE APLICACIÓN de los residuos en el suelo?",
        },
        // Options (answer choices)
        options: {
          no: "No",
          yes: "Sí",
          notApplicable: "No aplica",
          doesNotHave: "No realiza",
          doesNotMonitor: "No monitorea",
          doesNotPerform: "No realiza",
          doesNotClean: "No realiza limpieza de los bebederos",
          doesNotApply: "No realiza aplicación",
          noMeasurementSystem: "No posee sistema de medición",
          noQualityMonitoringSystem:
            "No posee sistema de monitoreo de calidad del agua",
          noStorageTreatmentSystem: "No posee sistema tratamiento",
          noStorageTreatmentSystemWaste: "No posee sistema tratamiento",
          noCooling: "No realiza enfriamiento (No aplica)",
          monthlyOrMore: "Mensual o superior",
          biweekly: "Quincenal",
          weekly: "Semanal",
          daily: "Diaria",
          monthly: "Mensual",
          oncePerWeek: "1 vez por semana",
          twicePerWeek: "2 veces por semana",
          moreThanOncePerWeek: "Menos de una vez al mes",
          lessThan25: "Menos del 25%",
          between26And50: "Entre 26% y 50%",
          between51And79: "Entre 51% y 79%",
          above80: "Más del 80%",
          lessThan25AllPoints: "Menos del 25% de los puntos son monitoreados",
          between26And50Points:
            "Entre 26% y 50% de los puntos son monitoreados",
          between51And79Points:
            "Entre 51% y 79% de los puntos son monitoreados",
          analysisOncePerYear: "Realiza análisis 1 vez por año",
          analysisTwicePerYear: "Realiza análisis 2 veces por año",
          analysisEvery3YearsOrMore:
            "Realiza análisis cada 3 años o más y esporádico",
          analysisEvery2Years: "Realiza análisis cada 2 años",
          annualAnalysis: "Realiza análisis anual",
          in100PercentMilkings: "En 100% de los ordeñes",
          inLessThan100PercentMilkings:
            "En menos del 100% de los ordeñes (hay menos lavado de piso en algunos ordeñes)",
          noBasedOnProducerDecision:
            "NO, se enciende según decisión del productor(a)",
          yesBasedOnTechnicalParameters:
            "SÍ, se acciona con base en parámetros técnicos de temperatura y humedad ambiente",
          weeklyApplication: "Aplicación Semanal",
          biweeklyApplication: "Aplicación Quincenal",
          monthlyApplication: "Aplicación Mensual",
          quarterlyApplication: "Aplicación Trimestral",
          every4MonthsOrMore: "Aplicación cada 4 meses o más",
          surfaceApplication: "Aplica de forma superficial",
          incorporatedIntoSoil: "Aplica el residuo incorporándolo al suelo",
        },
      },
      validation: {
        // Localización
        cidadeRequired: "Ciudad",
        paisRequired: "País",

        productionSystemRequired: "Sistema de Producción",
        specifyOtherProductionSystem:
          "Especifique el sistema de producción cuando se seleccione 'Otro'",

        // Área
        farmAreaRequired: "La superficie de la finca",
        pastureAreaRequired: "La superficie de pastoreo",
        silageAreaRequired: "La superficie de ensilaje",
        areaExceedsTotalArea:
          "La suma del área de pastoreo y ensilaje no puede ser mayor que el área total de la finca",

        // Rebaño
        lactatingCowsRequired: "El número de vacas en lactación",
        dryCowsRequired: "El número de vacas secas",
        heifersRequired: "El número de novillas",
        calvesRequired: "El número de terneros",
        steersRequired: "El número de novillos",

        // Producción Lechera
        dailyProductionRequired: "La producción diaria en litros",
        productionPerCowRequired: "La producción de litros por vaca/día",
        dailyProductionMinimum:
          "La producción diaria en litros debe ser como mínimo 0,1",
        productionPerCowMinimum:
          "La producción de litros por vaca/día debe ser como mínimo 0,1",

        // Composición de la Leche
        fatPercentageRequired: "El porcentaje de grasa de la leche",
        fatPercentageMinimum: "El porcentaje de grasa debe ser como mínimo 0,1",
        proteinPercentageRequired: "El porcentaje de proteína de la leche",
        proteinPercentageMinimum:
          "El porcentaje de proteína debe ser como mínimo 0,1",

        // Consumo Diario
        roughageConsumptionRequired: "El consumo de forraje",
        concentrateConsumptionRequired: "El consumo de concentrado",
        consumptionUnitRequired: "La unidad de medida del consumo",

        // Energía Eléctrica
        electricityConsumptionRequired:
          "El consumo mensual de energía eléctrica",
        electricityConsumptionMinimum:
          "El consumo de energía debe ser como mínimo 0,1 kWh",
        photovoltaicEnergyRequired: "La información sobre energía fotovoltaica",

        // Legislación Ambiental
        environmentalLicenseRequired: "La licencia ambiental",
        waterGrantRequired: "La autorización de uso de agua",
      },
    },

    // Result Page
    result: {
      title: "Su puntuación total fue:",
      improvementSuggestions: "Sugerencias de Mejora",
      suggestions: {
        water_monitoring:
          "Implemente un sistema de monitoreo continuo del consumo de agua con medidores en todos los puntos críticos de la propiedad.",
        hydraulic_mapping:
          "Desarrolle un mapa hidráulico completo de la propiedad para identificar posibles puntos de pérdida y optimizar la distribución de agua.",
        efficient_irrigation:
          "Adopte sistemas de riego más eficientes, como goteo o aspersión de baja presión, reduciendo desperdicios.",
        water_reuse:
          "Implemente sistemas de reutilización de agua, aprovechando efluentes tratados para riego de pasturas y limpieza de instalaciones.",
        rainwater_harvesting:
          "Instale sistemas de captación de agua de lluvia para uso en actividades que no requieren agua potable.",
        staff_training:
          "Promueva capacitaciones regulares con el equipo sobre prácticas de uso consciente y eficiente del agua en la producción lechera.",
      },
    },

    // History Page
    history: {
      title: "Historial del resultado",
      description: "Revise seus resultados anteriores.",
      noRecords: "Não foi encontrado registros de resultados anteriores.",
    },
  },
};
