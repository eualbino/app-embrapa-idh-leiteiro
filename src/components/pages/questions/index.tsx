// External Libraries
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";

// Context
import {
  QuestionnaireProvider,
  useQuestionnaireContext,
} from "@/src/contexts/QuestionnaireContext";
import { useAuthContext } from "@/src/contexts/AuthContext";

// Components
import { QuestionnaireHeader } from "./components/QuestionnaireHeader";
import { QuestionGroup } from "./components/QuestionGroup";
import { NavigationButtons } from "./components/NavigationButtons";
import { FormularioQuestionario } from "./components/QuestionsCaracterizacao";
import { LogoutButton } from "../../commons/LogoutButton";
import { NetworkStatusBanner } from "../../commons/NetworkStatusBanner";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { useOfflineSync } from "@/src/hooks/useOfflineSync";

// Hooks/Data
import { questionGroups } from "./hooks/useQuestionnaire/questionGroups";

// Types
import { FormData } from "./components/QuestionsCaracterizacao/types";

// Style
import { stylesQuestionsPage } from "./styles";


const QuestionnaireContent: React.FC = () => {
  const { step, formData, handleNext } = useQuestionnaireContext();
  const currentGroup = questionGroups[step];
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handleFormDataReady = (data: FormData) => {
    setCurrentFormData(data);
  };

  const handleNextClick = () => {
    if (step === 0 && currentFormData) {
      handleNext(currentFormData);
    } else {
      handleNext();
    }
  };

  return (
    <View>
      <QuestionnaireHeader />

      {step === 0 ? (
        <FormularioQuestionario
          initialData={formData}
          onFormDataReady={handleFormDataReady}
        />
      ) : (
        currentGroup && <QuestionGroup questions={currentGroup} />
      )}

      <NavigationButtons onNextClick={handleNextClick} />
    </View>
  );
};

export default function AllQuestionsScore() {
  return (
    <QuestionnaireProvider>
      <QuestionnaireContentWrapper />
    </QuestionnaireProvider>
  );
}

const QuestionnaireContentWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { scrollRef, step } = useQuestionnaireContext();
  const { isOffline } = useNetworkStatus();
  const { isSyncing } = useOfflineSync();
  const { properties } = useAuthContext();

  const hasExistingProperty = properties && properties.length > 0;

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    });
  }, [step, scrollRef]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <NetworkStatusBanner isOffline={isOffline} isSyncing={isSyncing} />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        style={{ backgroundColor: "#ffffff" }}
      >
        <View style={stylesQuestionsPage.containerInfo}>
          <Text style={stylesQuestionsPage.textHeader}>
            {step === 0
              ? t("questionnaire.titleCaracterization")
              : step === 1
                ? t("questionnaire.titleQuantity")
                : step === 2
                  ? t("questionnaire.titleQuality")
                  : t("questionnaire.titleWaste")}
          </Text>
          <Text style={stylesQuestionsPage.textSubHeader}>
            {step === 0
              ? hasExistingProperty
                ? t("questionnaire.subtitleCaracterizationUpdate")
                : t("questionnaire.subtitleCaracterization")
              : t("questionnaire.subtitle")}
          </Text>
          <LogoutButton />
        </View>

        <QuestionnaireContent />
      </ScrollView>
    </View>
  );
};
