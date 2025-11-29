// External Libraries
import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

// Context
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";

// Components
import { ButtonCommon } from "@/src/components/commons/Button";

// Style
import { styles } from "./styles";

export const NavigationButtons: React.FC = () => {
  const { t } = useTranslation();
  const {
    step,
    handleNext,
    handlePrevious,
    isCreatingProperty,
    isCreatingWaterIndicator,
    isCreatingWaterQuality,
    isCreatingWasteManagement,
  } = useQuestionnaireContext();

  const isFirstStep = step === 0;
  const isLastStep = step === 3;
  const isLoading =
    isCreatingProperty ||
    isCreatingWaterIndicator ||
    isCreatingWaterQuality ||
    isCreatingWasteManagement;

  return (
    <View style={styles.container}>
      <View>
        <ButtonCommon
          onPress={() => handlePrevious()}
          disabled={isFirstStep || isLoading}
          variant="secondary"
        >
          {"<  "} {t("questionnaire.questions.previous")}
        </ButtonCommon>
      </View>
      <View>
        <ButtonCommon
          onPress={() => handleNext()}
          variant="primary"
          disabled={isLoading}
        >
          {isLoading
            ? t("common.loading")
            : isLastStep
              ? t("questionnaire.questions.finish")
              : t("questionnaire.questions.next")}{" "}
          {"  >"}
        </ButtonCommon>
      </View>
    </View>
  );
};
