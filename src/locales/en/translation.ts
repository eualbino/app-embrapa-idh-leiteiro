export default {
  translation: {
    // Common
    common: {
      email: "Email",
      password: "Password",
      name: "Name",
      phone: "Phone",
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
      logout: "Logout",
      logoutTitle: "Logout",
      logoutMessage: "Are you sure you want to logout?",
      logoutConfirm: "Logout",
      logoutCancel: "Cancel",
      later: "Later",
      login: "Login",
      offline: "No connection",
    },

    // Profile
    profile: {
      title: "My Profile",
      edit: "Edit Profile",
      updateSuccess: "Profile updated successfully!",
      updateError: "Error updating profile. Please try again.",
      cpfReadOnly: "CPF cannot be changed.",
      changePasswordButton: "Change password",
      changePassword: {
        title: "Change Password",
        currentPassword: "Current Password",
        currentPasswordPlaceholder: "Enter your current password",
        newPassword: "New Password",
        newPasswordPlaceholder: "Enter your new password",
        confirmPassword: "Confirm New Password",
        confirmPasswordPlaceholder: "Enter your new password again",
        submit: "Change Password",
        submitting: "Changing...",
        success: "Password changed successfully!",
        errors: {
          emptyCurrentPassword: "Please enter your current password.",
          invalidPassword: "The password does not meet the minimum requirements.",
          passwordMismatch: "Passwords do not match.",
          samePassword: "The new password must be different from the current password.",
          wrongCurrentPassword: "Current password is incorrect.",
          offline: "Connect to the internet to change your password.",
          generic: "Could not change the password. Please try again.",
        },
      },
    },

    // Login & Register
    auth: {
      login: "Login",
      register: "Register",
      forgotPassword: "Forgot my password",
      loginButton: "Login",
      registerButton: "Register",
      backToLogin: "Back to Login",
      errors: {
        invalidCredentials: "Invalid login credentials.",
        loginFailed: "Unable to login. Please try again.",
        invalidData: "Invalid data.",
        registerFailed: "Unable to register. Please try again.",
        emailOrCpfExists: "Email or CPF already registered.",
        invalidPassword: "Password does not meet the minimum requirements.",
        passwordMismatch: "Passwords do not match.",
      },
      success: {
        loginSuccess: "Login successful!",
        loginWelcome: "Welcome back!",
        registerSuccess: "Registration successful!",
        registerMessage: "Please login to continue.",
      },
      confirmPassword: "Confirm Password",
      passwordRequirements: {
        minLength: "Minimum of 8 characters",
        hasUpperCase: "At least one uppercase letter",
        hasLowerCase: "At least one lowercase letter",
        hasNumber: "At least one number",
        hasSpecialChar: "At least one special character",
      },
    },

    // Auth Landing
    authLanding: {
      welcome: "Welcome!",
      description:
        "Access your account or sign up for free and start using the app",
      accessAccount: "ACCESS MY ACCOUNT",
      register: "SIGN UP",
      continueOffline: "Continue without internet",
      forgotPassword: "Forgot my password",
    },

    // Forgot Password
    forgotPassword: {
      title: "Forgot Password?",
      sendEmailTitle: "Forgot Password?",
      sendEmailDescription:
        "Enter your registered email and we will send a new password to continue access.",
      emailBody:
        "The password is provided below.",
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
      sendPassword: "Send New Password",
      sending: "Sending...",
      sendingPassword: "Sending new password...",
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
        passwordSent: "New Password Sent",
        passwordSentMessage: "A new password was sent to your email.",
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
      titleCaracterization: "Characterization",
      subtitleCaracterization:
        "First, let's characterize your production system.",
      subtitleCaracterizationUpdate: "Let's update your system information.",
      propertyCreatedSuccess: "Property registered successfully!",
      propertyUpdatedSuccess: "Data updated successfully!",
      titleQuantity: "Dimension – Water Quantity",
      titleQuality: "Dimension – Water Quality",
      titleWaste: "Dimension – Waste Management",
      subtitle:
        "Answer the questionnaire to obtain an individual score indicating the water performance level of the dairy production system.",
      date: "Date",
      identification: "Identification",
      // Characterization (used across form sections)
      characterization: {
        location: {
          sectionTitle: "LOCATION:",
          country: "Country",
          countryPlaceholder: "Enter country",
          state: "State",
          statePlaceholder: "Enter state",
          city: "City",
          cityPlaceholder: "Enter city",
        },
        productionSystem: {
          sectionTitle: "PRODUCTION SYSTEM:",
          question: "What Production System is employed in the farm?",
          options: {
            exclusivelyPasture: "Exclusively pasture",
            pastureWithSupplementation:
              "Pasture with protein and/or energy supplementation at the trough",
            confinedNoPasture:
              "Confined (roughage and concentrate at the trough) without pasture access",
            confinedLactatingCows:
              "Confined for lactating cows and pasture (with or without supplementation) for other categories",
            other: "Other. Which?",
          },
          otherPlaceholder: "Specify other system",
        },
        area: {
          sectionTitle: "AREA:",
          totalArea:
            "What is the property area used in dairy activity, in hectares?",
          totalAreaPlaceholder: "Farm Area",
          pastureArea: "What is the pasture area, in hectares?",
          pastureAreaPlaceholder: "Pasture Area",
          silageArea: "What is the silage area, in hectares?",
          silageAreaPlaceholder: "Silage Area",
        },
        herd: {
          sectionTitle: "HERD: (in number of heads)",
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
          bulls: "Bulls",
          bullsPlaceholder: "Bulls",
        },
        milkProduction: {
          sectionTitle: "MILK PRODUCTION:",
          dailyProduction:
            "What is the farm's daily milk production (liters/day)?",
          dailyProductionPlaceholder: "Farm liters/day",
          productionPerCow:
            "What is the milk production per cow/day (liters/cow/day)?",
          productionPerCowPlaceholder: "Liters/cow/day",
        },
        milkComposition: {
          sectionTitle: "MILK COMPOSITION:",
          fatPercentage: "What is the milk fat percentage?",
          fatPercentagePlaceholder: "Fat Percentage (%)",
          proteinPercentage: "What is the milk protein percentage?",
          proteinPercentagePlaceholder: "Protein Percentage (%)",
        },
        dailyConsumption: {
          sectionTitle: "DAILY CONSUMPTION OF LACTATING COWS:",
          roughageConsumption:
            "What is the daily roughage consumption per cow (kg)?",
          roughageConsumptionPlaceholder: "Roughage Consumption",
          concentrateConsumption:
            "What is the daily concentrate consumption per cow (kg)?",
          concentrateConsumptionPlaceholder: "Concentrate Consumption",
          unitInformed: "Unit provided:",
          naturalMatter: "Fresh Matter",
          dryMatter: "Dry Matter",
        },
        electricEnergy: {
          sectionTitle: "ELECTRIC ENERGY:",
          monthlyConsumption:
            "What is the monthly electricity consumption (kWh/month)?",
          monthlyConsumptionPlaceholder: "Monthly Consumption (kWh/month)",
          hasSolarEnergy: "Does the farm have photovoltaic energy?",
        },
        environmentalLegislation: {
          sectionTitle: "ENVIRONMENTAL LEGISLATION:",
          hasEnvironmentalLicense:
            "Does the property have an environmental license for dairy activity?",
          hasWaterGrant: "Does the property have a water use grant?",
        },
      },
      name: "Name",
      city: "City",
      country: "Country",

      // Production System
      productionSystem: {
        title: "Production System",
        question: "What Production System is employed in the farm?",
        pasture: "Pasture",
        pastureWithSupplement: "Pasture with feed supplementation",
        confined: "Confined",
        confinedLactating:
          "Confined for lactating cows and pasture (with or without supplementation) for other animals",
        other: "Other",
      },

      // Area
      area: {
        title: "Area",
        farmArea: "Farm area used in dairy system",
        pastureArea: "Pasture area",
        silageArea: "Area used for silage production",
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
        averageConsumption:
          "Average daily consumption (kg) of roughage and concentrate for lactating cows?",
        roughage: "Roughage (kg/lactating cow/day)",
        concentrate: "Concentrate (kg/lactating cow/day)",
        unit: "Which unit was informed?",
        freshMatter: "Fresh Matter",
        dryMatter: "Dry Matter",
      },

      // Energy
      energy: {
        title: "Electricity",
        monthlyConsumption:
          "What is the monthly average energy consumption? (KWh)",
        hasPhotovoltaic: "Do you have Photovoltaic Energy?",
      },

      // Environmental Legislation
      environmental: {
        title: "Environmental Legislation",
        environmentalLicense:
          "Do you have an Environmental License for Dairy Activity?",
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
        category: "Block {{current}}/{{total}}",
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
          questionIds: "(Questions: {{ids}})",
          stepError: "Error processing the step. Please try again.",
          completedTitle: "Success",
          completedMessage: "You have completed all the questions!",
          scoreTitle: "Your score in {{groupName}} was:",
        },
        groups: {
          "quantidade-agua": "Water Quantity",
          "qualidade-agua": "Water Quality",
          "manejo-residuos-uso-fertilizantes":
            "Waste Management and Fertilizer Use",
        },
        // Individual questions
        q1: {
          text: "Is there a HYDRAULIC MAP of the farm?",
          observation:
            "The Hydraulic Map is the mapping of the entire hydraulic network of the production system with the identification of water sources, consumption points, pump locations and flows of rainwater and effluents",
        },
        q2: {
          text: "Is there WATER CONSUMPTION MEASUREMENT of the production system?",
        },
        q3: {
          text: "What is the READING FREQUENCY of the measurement during the month?",
        },
        q4: {
          text: "What is the % of water consumption points that are monitored?",
          observation:
            "Identify the total consumption points that exist on the farm. Determine how many of them have monitoring with a water meter. Divide the number of points monitored by the total number and multiply by 100.",
        },
        q5: {
          text: "Does the activity have goals for reducing water consumption or loss?",
          observation:
            "A plan with goals for reducing water consumption or losses should contain a stage that describes how this will be achieved within the expected timeframe.",
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
          text: "Does the property have an IRRIGATION water use program?",
          observation:
            "The irrigation program should contain the calculation of the water depth to be applied according to technical parameters (climatic aspects, soil moisture, etc.). Does not apply when properties do not irrigate.",
        },
        q11: {
          text: "Is the activation of the animal COOLING system based on technical parameters?",
          observation:
            "Cooling system that activates according to technical parameters (temperature and ambient humidity).",
        },
        q12: {
          text: "Does the farm have RAINWATER COLLECTION?",
        },
        q13: {
          text: "Does the property REUSE WATER OR EFFLUENTS? (e.g., use of water from washing troughs for floor washing, reuse of effluent for floor washing, reuse of effluent in irrigation, etc.)",
        },
        q14: {
          text: "Does the farm MONITOR WATER QUALITY?",
        },
        q15: {
          text: "What is the % OF WATER POINTS MONITORED for water quality in relation to the total consumption points?",
          observation:
            "Identify the total consumption points that exist on the farm. Determine how many points have water analysis. Divide the number of sample points by the total number of water points and multiply by 100.",
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
          text: "Is all ANIMAL CONSUMPTION WATER OFFERED in water troughs?",
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
          text: "Does the property have a WATERPROOFED waste treatment SYSTEM?",
        },
        q24: {
          text: "Is RAINWATER that falls on the milking parlor floor and waiting area DIVERTED from the waste treatment system?",
        },
        q25: {
          text: "Are there LEAKS IN THE WASTE TREATMENT SYSTEMS?",
        },
        q26: {
          text: "Are there GUTTERS ON THE ROOF of the milking parlor?",
        },
        q27: {
          text: "What is the % of FLOOR WASHING of the holding pen and milking parlor in the total number of milkings?",
          observation:
            "Determine how many washes are done per day. Divide the number of washes by the total number of milkings and multiply by 100.",
        },
        q28: {
          text: "Does the farm SCRAPE MANURE from the floor before washing?",
        },
        q29: {
          text: "Do you use PRESSURIZED WATER (pressure washer) FOR WASHING facilities and equipment?",
        },
        q30: {
          text: "Does the farm have an EMERGENCY PLAN for extreme events?",
          observation:
            "Extreme events are understood as: overflow of the manure pit/lagoon, rupture of canal/channel that transports waste, surface runoff of residue through the soil, etc.",
        },
        q31: {
          text: "Does the farm DOCUMENT AND MONITOR the use of chemical and organic fertilizers?",
          observation:
            "All use of chemical or organic fertilizer is documented by application area size, crop type, amount of NPK applied, application date and considering the soil fertility analysis of the area.",
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
          doesNotIrrigation: "Does not irrigate",
          noMeasurementSystem: "Does not have a measurement system",
          noQualityMonitoringSystem:
            "Does not have water quality monitoring system",
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
          moreThanOncePerWeek: "More than 1 time per week",
          lessThan25: "Less than 25%",
          between26And50: "Between 26% to 50%",
          between51And79: "Between 51% to 79%",
          above80: "Above 80%",
          lessThan25AllPoints:
            "Less than 25% of all consumption points are monitored",
          between26And50Points:
            "Between 26% and 50% of consumption points are monitored",
          between51And79Points:
            "Between 51% and 79% of consumption points are monitored",
          analysisOncePerYear: "Analysis 1 time per year",
          analysisTwicePerYear: "Analysis 2 times per year",
          analysisEvery3YearsOrMore:
            "Performs analysis every 3 years or more or is sporadic",
          analysisEvery2Years: "Analysis every 2 years",
          annualAnalysis: "Annual analysis",
          in100PercentMilkings: "In 100% of milkings",
          inLessThan100PercentMilkings:
            "In less than 100% of milkings (there is less floor washing in some milkings)",
          noBasedOnProducerDecision:
            "NO, activation is based on the producer's decision",
          yesBasedOnTechnicalParameters:
            "YES, activation is based on technical parameters considering temperature and ambient humidity",
          weeklyApplication: "Weekly Application",
          biweeklyApplication: "Biweekly Application",
          monthlyApplication: "Monthly Application",
          quarterlyApplication: "Quarterly Application",
          every4MonthsOrMore: "Application every 4 months or more",
          surfaceApplication: "Applies superficially",
          incorporatedIntoSoil:
            "Applies the residue by incorporating it into the soil",
        },
      },

      validation: {
        // Location
        cidadeRequired: "City",
        estadoRequired: "State",
        paisRequired: "Country",

        productionSystemRequired: "Production System",
        specifyOtherProductionSystem:
          "Specify the production system when 'Other' is selected",

        // Area
        farmAreaRequired: "Farm area",
        pastureAreaRequired: "Pasture area",
        silageAreaRequired: "Silage area",
        areaExceedsTotalArea:
          "The sum of pasture and silage area cannot exceed the total property area",

        // Herd
        lactatingCowsRequired: "Number of lactating cows",
        dryCowsRequired: "Number of dry cows",
        heifersRequired: "Number of heifers",
        calvesRequired: "Number of calves",
        steersRequired: "Number of steers",

        // Milk Production
        dailyProductionRequired: "Daily liters production",
        productionPerCowRequired: "Liters per cow/day production",
        dailyProductionMinimum: "Daily liters production must be at least 0.1",
        productionPerCowMinimum:
          "Liters per cow/day production must be at least 0.1",

        // Milk Composition
        fatPercentageRequired: "Milk fat percentage",
        fatPercentageMinimum: "Fat percentage must be at least 0.1",
        proteinPercentageRequired: "Milk protein percentage",
        proteinPercentageMinimum: "Protein percentage must be at least 0.1",

        // Daily Consumption
        roughageConsumptionRequired: "Roughage consumption",
        concentrateConsumptionRequired: "Concentrate consumption",
        consumptionUnitRequired: "Consumption unit of measurement",

        // Electric Energy
        electricityConsumptionRequired: "Monthly electricity consumption",
        electricityConsumptionMinimum:
          "Electricity consumption must be at least 0.1 kWh",
        photovoltaicEnergyRequired: "Photovoltaic energy information",

        // Environmental Legislation
        environmentalLicenseRequired: "Environmental license",
        waterGrantRequired: "Water use grant",
      },
    },

    // Result Page
    result: {
      title: "Overall IDH_Milk Score",
      downloadReport: "Download report",
      offlineMode: "Offline mode",
      offlineModeMessage: "You are viewing locally saved data.",
      improvementSuggestions: "Good Practices Suggestions",
      categoryWaterQuantity: "Water Quantity",
      categoryWaterQuality: "Water Quality",
      categoryWasteManagement: "Waste Management",
      approved: "Approved",
      needsImprovement: "How to Improve",
      minimumScore: "Minimum",
      congratulations: "Congratulations!",
      congratulationsMessage:
        "Your property has reached all minimum scores for each Dimension of IDH_Milk. Continue maintaining good water use and waste management practices!",
      loadingResults: "Loading results...",
      errorLoadingTitle: "Error loading results",
      errorLoadingMessage: "Unable to load performance data",
      detailedScores: "Detailed Scores",
      idhMilk: "IDH_Milk",
      didNotReachMinimum: "Your performance can improve",
      improvements: {
        waterManagement: {
          waterConsumption: {
            title: "Water Consumption Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Have the property's hydraulic map",
              "Measure water consumption at a minimum of 25% of consumption points on a monthly basis",
            ],
          },
          waterLosses: {
            title: "Water Losses Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Have flow control on washing hoses",
              "Level floats installed in drinkers and water storage structures",
              "Check for leaks on a weekly basis",
            ],
          },
          waterSecurity: {
            title: "Water Security Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: ["Have some form of water and/or effluent reuse"],
          },
        },
        waterQuality: {
          waterAnalysis: {
            title: "Water Analysis Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Perform water analysis once a year",
              "Analyze water quality at a minimum of 25% of consumption points",
              "Perform Escherichia coli analysis",
            ],
          },
          waterConservation: {
            title: "Water Conservation Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Animals cannot have access to natural water courses (rivers, springs, ponds, etc.)",
              "All water is served to animals through drinkers",
              "Drinkers cleaned at least twice a week",
            ],
          },
        },
        wasteManagement: {
          wasteStructure: {
            title: "Waste Structure Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: ["Waterproofed waste treatment structure without leaks"],
          },
          wasteHandling: {
            title: "Waste Handling Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Do not wash the milking parlor floor after every milking",
              "Scrape manure before washing",
              "Washing is done with pressurized water",
            ],
          },
          fertilization: {
            title: "Fertilization Meso-indicator",
            subtitle: "To obtain the minimum score, it is necessary to:",
            items: [
              "Document all use of chemical and organic fertilizers",
              "Perform soil analysis of areas at least every two years",
              "Apply manure every four months or more and superficially",
            ],
          },
        },
      },
      suggestions: {
        water_monitoring:
          "Implement a continuous water consumption monitoring system with water meters at all critical points of the property.",
        hydraulic_mapping:
          "Develop a complete hydraulic map of the property to identify potential loss points and optimize water distribution.",
        efficient_irrigation:
          "Adopt more efficient irrigation systems, such as drip or low-pressure sprinklers, reducing waste.",
        water_reuse:
          "Implement water reuse systems, using treated effluents for pasture irrigation and facility cleaning.",
        rainwater_harvesting:
          "Install rainwater harvesting systems for use in activities that do not require potable water.",
        staff_training:
          "Promote regular training with staff on conscious and efficient water use practices in dairy production.",
      },
    },

    // History Page
    history: {
      title: "Results History",
      description: "View your previous results.",
      noRecords: "No results found.",
      userData: "User Data",
      userName: "Name",
      userEmail: "Email",
      userCpf: "CPF",
      propertiesHistory: "Properties History",
      pullToRefresh: "Pull down to try again",
      emptyMessage: "Fill out the questionnaire to view your history",
      tapToViewDetails: "Tap to view details",
      viewingResults: "Viewing results",
      refreshingData: "Loading data...",
    },

    notifications: {
      syncReminder: {
        title: "📱 Data ready to sync!",
        body: "You completed the form offline. Open the app and log in to sync your data.",
      },
      permissionDenied: "Notification permission not granted",
    },

    offlineMode: {
      title: "Offline Mode",
      dataSavedLocally:
        "Data saved locally. It will be synced when you have a connection.",
      formCompleteOffline:
        "Form complete. Log in when you have internet to sync.",
      enteringOfflineMode: "Entering offline mode...",
      syncWhenOnline:
        "Data will be synced when you log in with internet access.",
      connectionRestored: "Connection Restored",
      loginToSync: "Internet is back! Log in to sync your offline data.",
      syncing: "Syncing data...",
      offlineBanner: "You are offline. Data will be saved locally.",
      formCompleteTitle: "Form Complete",
      savedLoginToSync: "Data saved. Log in to sync with the server.",
      savedWillSync:
        "Data saved offline. It will be synced when you have a connection.",
      savedLoginAgain: "Data saved locally. Log in again to sync.",
      syncComplete: "Sync Complete",
      syncCompleteMessage: "All data has been synced!",
      syncError: "Sync Error",
      syncErrorMessage:
        "Could not sync data. We will try again.",
      loginRequiredTitle: "Login required",
      loginRequiredMessage: "Log in to sync your data.",
      noConnectionTitle: "No connection",
      connectToSync: "Connect to the internet to sync",
      syncingPending: "Syncing pending data...",
      sessionExpired: "Session expired",
    },
  },
};
