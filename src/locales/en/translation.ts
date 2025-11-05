export default {
  translation: {
    // Common
    common: {
      email: "Email",
      password: "Password",
      name: "Name",
      confirm: "Confirm",
      cancel: "Cancel",
      save: "Save",
      continue: "Continue",
      back: "Back",
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      yes: "Yes",
      no: "No",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Information",
      notApplicable: "Not applicable",
    },

    // Login & Register
    auth: {
      login: "Login",
      register: "Register",
      forgotPassword: "Forgot my password",
      loginButton: "Login",
      registerButton: "Register",
      backToLogin: "Back to Login",
      systemTitle: "Dairy Water Assessment System",
    },

    // Forgot Password
    forgotPassword: {
      title: "Forgot Password?",
      sendEmailTitle: "Forgot Password?",
      sendEmailDescription: "Enter your registered email and we will send you a verification code to reset your password.",
      confirmCodeTitle: "Confirm Code",
      confirmCodeDescription: "A code was sent to your email:",
      resetPasswordTitle: "Reset Password",
      resetPasswordDescription: "Create a new password for your account.",
      
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      code: "Verification Code",
      codePlaceholder: "Enter the code",
      newPassword: "New Password",
      newPasswordPlaceholder: "Enter your new password",
      confirmPassword: "Confirm New Password",
      confirmPasswordPlaceholder: "Enter your password again",
      
      sendCode: "Send Code",
      sending: "Sending...",
      confirmCode: "Confirm Code",
      verifying: "Verifying...",
      resetPassword: "Reset Password",
      resetting: "Resetting...",
      
      didntReceiveCode: "Didn't receive the code?",
      resendCode: "Resend code",
      resending: "Resending...",
      
      // Password requirements
      passwordRequirements: {
        minLength: "Minimum of 8 characters",
        hasUpperCase: "At least one uppercase letter",
        hasLowerCase: "At least one lowercase letter",
        hasNumber: "At least one number",
        hasSpecialChar: "At least one special character",
      },
      
      // Toast messages
      errors: {
        emptyEmail: "Please enter your email.",
        invalidEmail: "Please enter a valid email.",
        sendEmailFailed: "Could not send email. Please try again.",
        emptyCode: "Please enter the verification code.",
        invalidCode: "The code must be at least 4 digits.",
        verifyCodeFailed: "Invalid or expired code. Please try again.",
        resendFailed: "Could not resend the code.",
        emptyPassword: "Please enter your new password.",
        invalidPassword: "Password does not meet minimum requirements.",
        passwordMismatch: "Passwords do not match.",
        resetFailed: "Could not reset password.",
      },
      
      success: {
        emailSent: "Email Sent",
        emailSentMessage: "A verification code was sent to your email.",
        codeVerified: "Code Verified",
        codeVerifiedMessage: "Code confirmed successfully!",
        codeResent: "Code Resent",
        codeResentMessage: "A new code was sent to your email.",
        passwordReset: "Password Reset",
        passwordResetMessage: "Your password has been reset successfully!",
      },
    },

    // Questionnaire
    questionnaire: {
      title: "Questionnaire",
      subtitle: "Answer the questionnaire to obtain an individual score indicating the water performance level of the dairy production system.",
      date: "Date",
      identification: "Identification",
      // Characterization (used across form sections)
      characterization: {
        productionSystem: {
          sectionTitle: "A. PRODUCTION SYSTEM:",
          question: "What Production System is employed in the farm?",
          options: {
            exclusivelyPasture: "Exclusively pasture",
            pastureWithSupplementation: "Pasture with protein and/or energy supplementation at the trough",
            confinedNoPasture: "Confined (roughage and concentrate at the trough) without pasture access",
            confinedLactatingCows: "Confined for lactating cows and pasture (with or without supplementation) for other categories",
            other: "Other. Which?",
          },
          otherPlaceholder: "Specify other system",
        },
        area: {
          sectionTitle: "B. AREA:",
          totalArea: "What is the total farm area, in hectares (ha)?",
          totalAreaPlaceholder: "Farm Area (ha)",
          pastureArea: "What is the pasture area, in hectares (ha)?",
          pastureAreaPlaceholder: "Pasture Area (ha)",
          silageArea: "What is the silage area, in hectares (ha)?",
          silageAreaPlaceholder: "Silage Area (ha)",
        },
        herd: {
          sectionTitle: "C. HERD:",
          lactatingCows: "Lactating cows",
          lactatingCowsPlaceholder: "Lactating cows",
          dryCows: "Dry cows",
          dryCowsPlaceholder: "Dry cows",
          heifers: "Heifers",
          heifersPlaceholder: "Heifers",
          calves: "Calves",
          calvesPlaceholder: "Calves",
          steers: "Steers",
          steersPlaceholder: "Steers",
        },
        milkProduction: {
          sectionTitle: "D. MILK PRODUCTION:",
          dailyProduction: "What is the farm's daily milk production (liters/day)?",
          dailyProductionPlaceholder: "Farm liters/day",
          productionPerCow: "What is the milk production per cow/day (liters/cow/day)?",
          productionPerCowPlaceholder: "Liters/cow/day",
        },
        milkComposition: {
          sectionTitle: "E. MILK COMPOSITION:",
          fatPercentage: "What is the milk fat percentage?",
          fatPercentagePlaceholder: "Fat Percentage (%)",
          proteinPercentage: "What is the milk protein percentage?",
          proteinPercentagePlaceholder: "Protein Percentage (%)",
        },
        dailyConsumption: {
          sectionTitle: "F. DAILY CONSUMPTION:",
          roughageConsumption: "What is the daily roughage consumption per cow (kg/day or %BW)?",
          roughageConsumptionPlaceholder: "Roughage Consumption",
          concentrateConsumption: "What is the daily concentrate consumption per cow (kg/day or %BW)?",
          concentrateConsumptionPlaceholder: "Concentrate Consumption",
          unitInformed: "Unit provided:",
        },
        electricEnergy: {
          sectionTitle: "G. ELECTRIC ENERGY:",
          monthlyConsumption: "What is the monthly electricity consumption (kWh/month)?",
          monthlyConsumptionPlaceholder: "Monthly Consumption (kWh/month)",
          hasSolarEnergy: "Does the farm have photovoltaic energy?",
        },
        environmentalLegislation: {
          sectionTitle: "H. ENVIRONMENTAL LEGISLATION:",
          hasEnvironmentalLicense: "Does the farm have an environmental license?",
          hasWaterGrant: "Does the farm have a water use grant?",
        },
      },
      name: "Name",
      city: "City",
      state: "State",
      
      // Production System
      productionSystem: {
        title: "Production System",
        question: "What Production System is employed in the farm?",
        pasture: "Pasture",
        pastureWithSupplement: "Pasture with feed supplementation",
        confined: "Confined",
        confinedLactating: "Confined for lactating cows and pasture (with or without supplementation) for other animals",
        other: "Other",
      },
      
      // Area
      area: {
        title: "Area",
        farmArea: "Farm area used in dairy system (ha)",
        pastureArea: "Pasture area (ha)",
        silageArea: "Area used for silage production (ha)",
      },
      
      // Cattle Herd
      herd: {
        title: "Cattle Herd (average of the last 12 months)",
        lactatingCows: "Lactating cows",
        dryCows: "Dry cows",
        heifers: "Heifers (more than 12 months)",
        calves: "Calves - females + males (less than 12 months)",
        steers: "Steers",
        bulls: "Bulls",
      },
      
      // Milk Production
      milkProduction: {
        title: "Milk Production (average of the last 12 months)",
        litersPerDay: "Liters/Day",
        litersPerCowPerDay: "Liters/Cow/Day",
        fatPercentage: "% fat in milk",
        proteinPercentage: "% protein in milk",
      },
      
      // Consumption
      consumption: {
        title: "Daily Consumption",
        averageConsumption: "Average daily consumption (kg) of roughage and concentrate of lactating cows?",
        roughage: "Roughage (kg/lactating cow/day)",
        concentrate: "Concentrate (kg/lactating cow/day)",
        unit: "What unit is reported?",
        freshMatter: "kg of fresh matter",
        dryMatter: "kg of dry matter",
      },
      
      // Energy
      energy: {
        title: "Electricity",
        monthlyConsumption: "What is the monthly average energy consumption? (KWh)",
        hasPhotovoltaic: "Do you have Photovoltaic Energy?",
      },
      
      // Environmental Legislation
      environmental: {
        title: "Environmental Legislation",
        environmentalLicense: "Do you have an Environmental License for Dairy Activity?",
        waterGrant: "Do you have a Water Use Grant?",
        no: "No",
        yes: "Yes",
        exempt: "Exempt",
      },
      
      water: {
        quantity: "Water Quantity",
        consumption: "Water Consumption",
        losses: "Water Losses",
        security: "Water Security",
        quality: "Water Quality",
        conservation: "Water Conservation",
      },
      
      questions: {
        progress: "Progress",
        category: "Category {{current}} of {{total}}",
        characterizationTitle: "Property / Herd / System Characterization",
        waterQuantityTitle: "Water Quantity",
        waterQualityTitle: "Water Quality",
        wasteManagementTitle: "Waste Management and Fertilizer Use",
        dateLabel: "Date (mm/dd/yyyy)",
        previous: "Back",
        next: "Next",
        finish: "Finish",
        // Toasts
        toasts: {
          requiredFieldsTitle: "Required Fields",
          fillFieldsPrefix: "Please fill in the following fields:",
          missingFormDataTitle: "Error",
          missingFormDataMessage: "Characterization form data not available.",
          answerAllTitle: "Attention",
          answerAllMessage: "Please answer all questions before continuing.",
          completedTitle: "Success",
          completedMessage: "You have completed all the questions!",
        },
        // Individual questions
        q1: {
          text: "Is there a HYDRAULIC MAP of the farm?",
          observation: "The Hydraulic Map is the mapping of the entire hydraulic network of the production system with the identification of water sources, consumption points, pump locations and flows of rainwater and effluents",
        },
        q2: {
          text: "Is there WATER CONSUMPTION MEASUREMENT of the production system?",
        },
        q3: {
          text: "What is the READING FREQUENCY of the measurement during the month?",
        },
        q4: {
          text: "What is the % of water consumption points that are monitored?",
          observation: "Identify the total consumption points that exist on the farm. Determine how many of them have monitoring with a water meter. Divide the number of points monitored by the total number and multiply by 100.",
        },
        q5: {
          text: "Does the activity have goals for reducing water consumption or loss?",
          observation: "A plan with goals for reducing water consumption or losses should contain a stage that describes how this will be achieved within the expected timeframe.",
        },
        q6: {
          text: "Does the farm have a WATER FLOW CONTROL SYSTEM in the washing hoses of the MILKING parlor?",
        },
        q7: {
          text: "Are there level floats in the water troughs?",
        },
        q8: {
          text: "Are there level floats in the water storage structures (e.g. water tanks)?",
        },
        q9: {
          text: "What is the LEAK IDENTIFICATION ROUTINE?",
        },
        q10: {
          text: "Does the farm have an IRRIGATION water use program?",
          observation: "The irrigation program should include a calculation of the water to be applied based on technical parameters (climatic aspects, soil type, etc.). Does not apply when farms do not irrigate.",
        },
        q11: {
          text: "Is the activation of the animal COOLING system based on technical parameters?",
          observation: "The cooling system should be activated based on technical parameters (temperature and ambient humidity).",
        },
        q12: {
          text: "Does the farm have RAINWATER COLLECTION?",
        },
        q13: {
          text: "Does the farm REUSE WATER OR EFFLUENTS? (e.g., water from washing troughs and equipment can be used for floor washing, effluent reuse in irrigation, etc.)",
        },
        q14: {
          text: "Does the farm MONITOR WATER QUALITY?",
        },
        q15: {
          text: "What is the % OF WATER POINTS MONITORED for water quality in relation to the total consumption points?",
          observation: "Identify the total consumption points that exist on the farm. Determine how many points have water analysis. Divide the number of sample points by the total number of water points and multiply by 100.",
        },
        q16: {
          text: "Does the farm perform NITRATE ANALYSIS in water?",
        },
        q17: {
          text: "Does the farm perform Escherichia coli ANALYSIS in water?",
        },
        q18: {
          text: "Do animals have ACCESS TO WATER BODIES (rivers, lakes, dams, springs)?",
        },
        q19: {
          text: "Is all ANIMAL DRINKING WATER OFFERED through water troughs?",
        },
        q20: {
          text: "Do areas around water troughs show accumulation of WATER or MUD?",
        },
        q21: {
          text: "The FREQUENCY of WATER TROUGH CLEANING is:",
        },
        q22: {
          text: "Does the farm have a TREATMENT SYSTEM for milking effluent? (E.g. manure pit, lagoon, biodigester, etc.)?",
        },
        q23: {
          text: "Does the farm have a WATERPROOFED treatment SYSTEM?",
        },
        q24: {
          text: "Is RAINWATER that falls on the milking parlor floor and waiting area DIVERTED from the waste storage or treatment system?",
        },
        q25: {
          text: "Are there leaks in the treatment systems?",
        },
        q26: {
          text: "Are there GUTTERS ON THE ROOF of the milking parlor?",
        },
        q27: {
          text: "What is the % of FLOOR WASHING of the holding pen and milking parlor in the total number of milkings?",
          observation: "Determine how many washes are done per day. Divide the number of washes by the total number of milkings and multiply by 100.",
        },
        q28: {
          text: "Does the farm SCRAPE MANURE from the floor before washing?",
        },
        q29: {
          text: "Do you use PRESSURIZED WATER (pressure washer) FOR WASHING facilities and equipment?",
        },
        q30: {
          text: "Does the farm have an EMERGENCY PLAN for extreme events?",
          observation: "Extreme events are understood as: overflow of the manure pit/lagoon, rupture of canal/channel that transports waste, surface runoff of residue through the soil, etc.",
        },
        q31: {
          text: "Does the farm DOCUMENT AND MONITOR the use of chemical and organic fertilizers?",
          observation: "All use of chemical or organic fertilizer is documented by application area size, crop type, amount of NPK applied, application date and considering the soil fertility analysis of the area.",
        },
        q32: {
          text: "Do you perform LABORATORY ANALYSIS of the nutrient concentration (nitrogen, phosphorus and potassium) of ORGANIC RESIDUE?",
        },
        q33: {
          text: "Does the farm perform SOIL ANALYSIS of all areas that receive fertilizer?",
        },
        q34: {
          text: "What is the APPLICATION FREQUENCY of residues as fertilizer?",
        },
        q35: {
          text: "What is the APPLICATION METHOD of residues in the soil?",
        },
        // Options (answer choices)
        options: {
          no: "No",
          yes: "Yes",
          notApplicable: "Not applicable",
          doesNotHave: "Does not do",
          doesNotMonitor: "Does not monitor",
          doesNotPerform: "Does not perform",
          doesNotClean: "Does not clean water troughs",
          doesNotApply: "Does not apply",
          noMeasurementSystem: "Does not have a measurement system",
          noQualityMonitoringSystem: "Does not have water quality monitoring system",
          noStorageTreatmentSystem: "Does not have a treatment system",
          noStorageTreatmentSystemWaste: "Does not have a treatment system",
          noCooling: "Does not cool (Not applicable)",
          monthlyOrMore: "Monthly or higher",
          biweekly: "Biweekly",
          weekly: "Weekly",
          daily: "Daily",
          monthly: "Monthly",
          oncePerWeek: "1 time per week",
          twicePerWeek: "2 times per week",
          moreThanOncePerWeek: "More than 1 time per month",
          lessThan25: "Less than 25%",
          between26And50: "Between 26% to 50%",
          between51And79: "Between 51% to 79%",
          above80: "Above 80%",
          lessThan25AllPoints: "Less than 25% of all consumption points are monitored",
          between26And50Points: "Between 26% and 50% of consumption points are monitored",
          between51And79Points: "Between 51% and 79% of consumption points are monitored",
          analysisOncePerYear: "Analysis 1 time per year",
          analysisTwicePerYear: "Analysis 2 times per year",
          analysisEvery3YearsOrMore: "Analysis every 3 years or more and sporadic",
          analysisEvery2Years: "Analysis every 2 years",
          annualAnalysis: "Annual analysis",
          in100PercentMilkings: "In 100% of milkings",
          inLessThan100PercentMilkings: "In less than 100% of milkings (there is less floor washing in some milkings)",
          noBasedOnProducerDecision: "NO, activation is based on the producer's decision",
          yesBasedOnTechnicalParameters: "YES, activation is based on technical parameters considering temperature and ambient humidity",
          weeklyApplication: "Weekly Application",
          biweeklyApplication: "Biweekly Application",
          monthlyApplication: "Monthly Application",
          quarterlyApplication: "Quarterly Application",
          every4MonthsOrMore: "Application every 4 months or more",
          surfaceApplication: "Applies superficially",
          incorporatedIntoSoil: "Applies the residue by incorporating it into the soil",
        },
      },
      // Validation messages for Step 0 form
      validation: {
        productionSystemRequired: "Production System is required",
        specifyOtherProductionSystem: "Specify the production system when 'Other' is selected",
        farmAreaRequired: "Farm area is required",
        lactatingCowsRequired: "Number of lactating cows is required",
        dailyProductionRequired: "Daily liters production is required",
      },
    },
  },
};
