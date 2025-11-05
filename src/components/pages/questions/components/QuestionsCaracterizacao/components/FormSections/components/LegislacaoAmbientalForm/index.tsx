import React, { JSX } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface LegislacaoAmbientalInputProps {
  temLicencaAmbiental: string;
  setTemLicencaAmbiental: (value: string) => void;
  temOutorgaAgua: string;
  setTemOutorgaAgua: (value: string) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const LegislacaoAmbientalInput: React.FC<LegislacaoAmbientalInputProps> = ({
  temLicencaAmbiental,
  setTemLicencaAmbiental,
  temOutorgaAgua,
  setTemOutorgaAgua,
  renderRadioButton,
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.environmentalLegislation.sectionTitle')} </Text>
          <Text>{t('questionnaire.characterization.environmentalLegislation.hasEnvironmentalLicense')}</Text>
        </Text>
        <View >
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemLicencaAmbiental("sim")}
          >
            {renderRadioButton(temLicencaAmbiental === "sim")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>{t('common.yes')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemLicencaAmbiental("nao")}
          >
            {renderRadioButton(temLicencaAmbiental === "nao")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>{t('common.no')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemLicencaAmbiental("nao_se_aplica")}
          >
            {renderRadioButton(temLicencaAmbiental === "nao_se_aplica")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t('common.notApplicable')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.environmentalLegislation.hasWaterGrant')}</Text>
        </Text>
        <View >
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemOutorgaAgua("sim")}
          >
            {renderRadioButton(temOutorgaAgua === "sim")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>{t('common.yes')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemOutorgaAgua("nao")}
          >
            {renderRadioButton(temOutorgaAgua === "nao")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>{t('common.no')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View >
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemOutorgaAgua("nao_se_aplica")}
          >
            {renderRadioButton(temOutorgaAgua === "nao_se_aplica")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t('common.notApplicable')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LegislacaoAmbientalInput;
