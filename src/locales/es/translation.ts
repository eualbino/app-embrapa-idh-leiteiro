export default {
  translation: {
    // Common
    common: {
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre",
      phone: "Teléfono",
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
      logout: "Salir",
      logoutTitle: "Cerrar Sesión",
      logoutMessage: "¿Está seguro que desea cerrar sesión?",
      logoutConfirm: "Salir",
      logoutCancel: "Cancelar",
      later: "Después",
      login: "Iniciar Sesión",
      offline: "Sin conexión",
    },

    // Profile
    profile: {
      title: "Mi Perfil",
      edit: "Editar Perfil",
      cpfReadOnly: "El CPF no se puede cambiar.",
      changePasswordButton: "Cambiar contraseña",
      changePassword: {
        title: "Cambiar Contraseña",
        currentPassword: "Contraseña Actual",
        currentPasswordPlaceholder: "Ingrese su contraseña actual",
        newPassword: "Nueva Contraseña",
        newPasswordPlaceholder: "Ingrese su nueva contraseña",
        confirmPassword: "Confirmar Nueva Contraseña",
        confirmPasswordPlaceholder: "Ingrese su contraseña nuevamente",
        submit: "Cambiar Contraseña",
        submitting: "Cambiando...",
        success: "¡Contraseña cambiada con éxito!",
        errors: {
          emptyCurrentPassword: "Por favor, ingrese su contraseña actual.",
          invalidPassword: "La contraseña no cumple con los requisitos mínimos.",
          passwordMismatch: "Las contraseñas no coinciden.",
          samePassword: "La nueva contraseña debe ser diferente de la actual.",
          wrongCurrentPassword: "Contraseña actual incorrecta.",
          offline: "Conéctese a internet para cambiar su contraseña.",
          generic: "No fue posible cambiar la contraseña. Inténtalo de nuevo.",
        },
      },
    },

    // Login & Register
    auth: {
      login: "Iniciar sesión",
      register: "Registrarse",
      forgotPassword: "Olvidé mi contraseña",
      loginButton: "Entrar",
      registerButton: "Registrarse",
      backToLogin: "Volver al inicio de sesión",
      errors: {
        invalidCredentials: "Datos de inicio de sesión inválidos.",
        loginFailed: "No se pudo iniciar sesión. Inténtelo de nuevo.",
        invalidData: "Datos inválidos.",
        registerFailed: "No se pudo registrar. Inténtelo de nuevo.",
        emailOrCpfExists: "El correo electrónico o CPF ya está registrado.",
        invalidPassword: "La contraseña no cumple con los requisitos mínimos.",
        passwordMismatch: "Las contraseñas no coinciden.",
      },
      success: {
        loginSuccess: "¡Inicio de sesión exitoso!",
        loginWelcome: "¡Bienvenido de nuevo!",
        registerSuccess: "¡Registro exitoso!",
        registerMessage: "Inicie sesión para continuar.",
      },
      confirmPassword: "Confirmar Contraseña",
      passwordRequirements: {
        minLength: "Mínimo de 8 caracteres",
        hasUpperCase: "Al menos una letra mayúscula",
        hasLowerCase: "Al menos una letra minúscula",
        hasNumber: "Al menos un número",
        hasSpecialChar: "Al menos un carácter especial",
      },
    },

    // Auth Landing
    authLanding: {
      welcome: "¡Bienvenido!",
      description:
        "Acceda a su cuenta o regístrese gratis y comience a usar la aplicación",
      accessAccount: "ACCEDER A MI CUENTA",
      register: "REGÍSTRESE",
      continueOffline: "Continuar sin internet",
      forgotPassword: "Olvidé mi contraseña",
    },

    // Forgot Password
    forgotPassword: {
      title: "¿Olvidó la contraseña?",
      sendEmailTitle: "¿Olvidó la contraseña?",
      sendEmailDescription:
        "Ingrese su correo electrónico registrado y le enviaremos una nueva contraseña para continuar el acceso.",
      emailBody:
        "La contraseña aparece a continuación.",
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
      sendPassword: "Enviar Nueva Contraseña",
      sending: "Enviando...",
      sendingPassword: "Enviando nueva contraseña...",
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
        passwordSent: "Nueva Contraseña Enviada",
        passwordSentMessage: "Se envió una nueva contraseña a su correo electrónico.",
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
      titleCaracterization: "Caracterización",
      subtitleCaracterization:
        "Primero, caractericemos su sistema de producción.",
      subtitleCaracterizationUpdate:
        "Actualicemos la información de su sistema.",
      propertyCreatedSuccess: "¡Propiedad registrada con éxito!",
      propertyUpdatedSuccess: "¡Datos actualizados con éxito!",
      titleQuantity: "Dimensión – Cantidad de Agua",
      titleQuality: "Dimensión – Calidad del Agua",
      titleWaste: "Dimensión – Manejo de Residuos",
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
          state: "Estado",
          statePlaceholder: "Ingrese el estado",
          city: "Ciudad",
          cityPlaceholder: "Ingrese la ciudad",
        },
        productionSystem: {
          sectionTitle: "SISTEMA DE PRODUCCIÓN:",
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
          sectionTitle: "ÁREA:",
          totalArea:
            "¿Cuál es el área de la propiedad utilizada en la actividad lechera, en hectáreas?",
          totalAreaPlaceholder: "Área de la Finca",
          pastureArea: "¿Cuál es el área de pastoreo, en hectáreas?",
          pastureAreaPlaceholder: "Área de Pastoreo",
          silageArea: "¿Cuál es el área de ensilaje, en hectáreas?",
          silageAreaPlaceholder: "Área de Ensilaje",
        },
        herd: {
          sectionTitle: "REBAÑO: (en número de cabezas)",
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
          sectionTitle: "PRODUCCIÓN LECHERA:",
          dailyProduction:
            "¿Cuál es la producción diaria de leche de la finca (litros/día)?",
          dailyProductionPlaceholder: "Litros/día de la finca",
          productionPerCow:
            "¿Cuál es la producción de leche por vaca/día (litros/vaca/día)?",
          productionPerCowPlaceholder: "Litros/vaca/día",
        },
        milkComposition: {
          sectionTitle: "COMPOSICIÓN DE LA LECHE:",
          fatPercentage: "¿Cuál es el porcentaje de grasa de la leche?",
          fatPercentagePlaceholder: "Porcentaje de Grasa (%)",
          proteinPercentage: "¿Cuál es el porcentaje de proteína de la leche?",
          proteinPercentagePlaceholder: "Porcentaje de Proteína (%)",
        },
        dailyConsumption: {
          sectionTitle: "CONSUMO DIARIO DE VACAS EN LACTACIÓN:",
          roughageConsumption:
            "¿Cuál es el consumo diario de forraje por vaca (kg)?",
          roughageConsumptionPlaceholder: "Consumo de Forraje",
          concentrateConsumption:
            "¿Cuál es el consumo diario de concentrado por vaca (kg)?",
          concentrateConsumptionPlaceholder: "Consumo de Concentrado",
          unitInformed: "Unidad informada:",
          naturalMatter: "Materia Fresca",
          dryMatter: "Materia Seca",
        },
        electricEnergy: {
          sectionTitle: "ENERGÍA ELÉCTRICA:",
          monthlyConsumption:
            "¿Cuál es el consumo mensual de energía eléctrica (kWh/mes)?",
          monthlyConsumptionPlaceholder: "Consumo Mensual (kWh/mes)",
          hasSolarEnergy: "¿La finca posee energía fotovoltaica?",
        },
        environmentalLegislation: {
          sectionTitle: "LEGISLACIÓN AMBIENTAL:",
          hasEnvironmentalLicense:
            "¿La propiedad posee licencia ambiental de la actividad lechera?",
          hasWaterGrant: "¿La propiedad posee autorización de uso del agua?",
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
        farmArea: "Superficie de la finca utilizada para la actividad lechera",
        pastureArea: "Superficie con pastoreo",
        silageArea: "Superficie utilizada para la producción de ensilaje",
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
        category: "Bloque {{current}}/{{total}}",
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
          questionIds: "(Preguntas: {{ids}})",
          stepError: "Error al procesar el paso. Inténtelo de nuevo.",
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
          text: "¿La propiedad posee programa de uso de agua de RIEGO?",
          observation:
            "El Programa de riego debe contener el cálculo de la lámina de agua a ser aplicada de acuerdo con los parámetros técnicos (aspectos climáticos, humedad del suelo, etc.). No se aplica cuando las propiedades no hacen riego.",
        },
        q11: {
          text: "¿El encendido del sistema de ENFRIAMIENTO de los animales se realiza con base en parámetros técnicos?",
          observation:
            "Sistema de enfriamiento que acciona de acuerdo con parámetros técnicos (temperatura y humedad ambiente).",
        },
        q12: {
          text: "¿La finca posee CAPTACIÓN DE AGUA DE LLUVIA?",
        },
        q13: {
          text: "¿La propiedad realiza REUTILIZACIÓN DEL AGUA O DE EFLUENTES? (ej. uso del agua del lavado de bebederos para lavado del piso, reuso del efluente para lavado del piso, reuso del efluente en la irrigación, etc.)",
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
          text: "¿Toda el AGUA DE CONSUMO DE LOS ANIMALES es OFRECIDA en bebederos?",
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
          text: "¿El AGUA DE LLUVIA que cae en el piso de la sala de ordeñe y área de espera es DESVIADA del Sistema o tratamiento de desechos?",
        },
        q25: {
          text: "¿Hay ocurrencia de FUGAS EN LOS SISTEMAS de tratamiento de desechos?",
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
          doesNotIrrigation: "No hace riego",
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
          moreThanOncePerWeek: "Más de 1 vez por semana",
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
            "Realiza análisis cada 3 años o más o es esporádico",
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
        estadoRequired: "Estado",
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
      title: "Puntuación General del IDH_Leche",
      downloadReport: "Descargar informe",
      offlineMode: "Modo sin conexión",
      offlineModeMessage: "Está visualizando datos guardados localmente.",
      improvementSuggestions: "Sugerencias de Buenas Prácticas",
      categoryWaterQuantity: "Cantidad de Agua",
      categoryWaterQuality: "Calidad del Agua",
      categoryWasteManagement: "Manejo de Residuos",
      approved: "Aprobado",
      needsImprovement: "Cómo Mejorar",
      minimumScore: "Mínimo",
      congratulations: "¡Felicitaciones!",
      congratulationsMessage:
        "Su propiedad alcanzó todas las notas mínimas para cada Dimensión del IDH_Leche. ¡Continúe manteniendo las buenas prácticas de uso del agua y manejo de residuos!",
      loadingResults: "Cargando resultados...",
      errorLoadingTitle: "Error al cargar resultados",
      errorLoadingMessage: "No fue posible cargar los datos de la performance",
      detailedScores: "Puntuaciones Detalladas",
      idhMilk: "IDH_Leche",
      didNotReachMinimum: "Su desempeño puede mejorar",
      improvements: {
        waterManagement: {
          waterConsumption: {
            title: "Mesoindicador Consumo de Agua",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Tener el mapa hidráulico de la propiedad",
              "Medir el consumo de agua de al menos el 25% de los puntos de consumo con periodicidad mensual",
            ],
          },
          waterLosses: {
            title: "Mesoindicador Pérdidas de Agua",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Tener control de flujo en las mangueras de lavado",
              "Boyas de nivel instaladas en los bebederos y en las estructuras de almacenamiento de agua",
              "Verificar con periodicidad semanal la ocurrencia de fugas",
            ],
          },
          waterSecurity: {
            title: "Mesoindicador Seguridad Hídrica",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Tener alguna forma de reutilización del agua y/o efluente",
            ],
          },
        },
        waterQuality: {
          waterAnalysis: {
            title: "Mesoindicador Análisis de Agua",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Realizar el análisis de agua una vez al año",
              "Analizar la calidad del agua en al menos el 25% de los puntos de consumo",
              "Realizar el análisis de Escherichia coli",
            ],
          },
          waterConservation: {
            title: "Mesoindicador Conservación del Agua",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Los animales no pueden tener acceso a cursos de agua naturales (ríos, nacientes, lagunas, etc.)",
              "Toda el agua es servida a los animales por bebederos",
              "Bebederos limpios al menos dos veces por semana",
            ],
          },
        },
        wasteManagement: {
          wasteStructure: {
            title: "Mesoindicador Estructura para los desechos",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Estructura de tratamiento de residuos impermeabilizada y sin fugas",
            ],
          },
          wasteHandling: {
            title: "Mesoindicador Manejo de desechos",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "No lavar el piso de la sala de ordeño después de cada ordeño",
              "Antes del lavado se hace el raspado del estiércol",
              "El lavado se realiza con agua a presión",
            ],
          },
          fertilization: {
            title: "Mesoindicador Fertilización",
            subtitle: "Para obtener la puntuación mínima es necesario:",
            items: [
              "Documentar todo el uso de fertilizantes químicos y orgánicos",
              "Realizar el análisis de suelo de las áreas al menos cada dos años",
              "Hacer la aplicación del estiércol cada cuatro meses o más y de forma superficial",
            ],
          },
        },
      },
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
      title: "Historial de Resultados",
      description: "Vea los resultados anteriores.",
      noRecords: "No se encontraron resultados.",
      userData: "Datos del Usuario",
      userName: "Nombre",
      userEmail: "Correo Electrónico",
      userCpf: "CPF",
      propertiesHistory: "Historial de Propiedades",
      pullToRefresh: "Deslice hacia abajo para intentar nuevamente",
      emptyMessage: "Complete el cuestionario para ver su historial",
      tapToViewDetails: "Toque para ver los detalles",
      viewingResults: "Visualizando resultados",
      refreshingData: "Cargando datos...",
    },

    notifications: {
      syncReminder: {
        title: "📱 ¡Datos listos para sincronizar!",
        body: "Completó el formulario sin conexión. Abra la aplicación e inicie sesión para sincronizar sus datos.",
      },
      permissionDenied: "Permiso de notificación no concedido",
    },

    offlineMode: {
      title: "Modo Sin Conexión",
      dataSavedLocally:
        "Datos guardados localmente. Se sincronizarán cuando haya conexión.",
      formCompleteOffline:
        "Formulario completo. Inicie sesión cuando tenga internet para sincronizar.",
      enteringOfflineMode: "Entrando en modo sin conexión...",
      syncWhenOnline:
        "Los datos se sincronizarán cuando inicie sesión con acceso a internet.",
      connectionRestored: "Conexión Restaurada",
      loginToSync:
        "¡Volvió el internet! Inicie sesión para sincronizar sus datos offline.",
      syncing: "Sincronizando datos...",
      offlineBanner:
        "Está sin conexión. Los datos se guardarán localmente.",
      formCompleteTitle: "Formulario Completo",
      savedLoginToSync:
        "Datos guardados. Inicie sesión para sincronizar con el servidor.",
      savedWillSync:
        "Datos guardados sin conexión. Se sincronizarán cuando haya conexión.",
      savedLoginAgain:
        "Datos guardados localmente. Inicie sesión de nuevo para sincronizar.",
      syncComplete: "Sincronización Completa",
      syncCompleteMessage: "¡Todos los datos han sido sincronizados!",
      syncError: "Error de Sincronización",
      syncErrorMessage:
        "No se pudieron sincronizar los datos. Lo intentaremos de nuevo.",
      loginRequiredTitle: "Inicio de sesión requerido",
      loginRequiredMessage: "Inicie sesión para sincronizar sus datos.",
      noConnectionTitle: "Sin conexión",
      connectToSync: "Conéctese a internet para sincronizar",
      syncingPending: "Sincronizando datos pendientes...",
      sessionExpired: "Sesión expirada",
    },
  },
};
