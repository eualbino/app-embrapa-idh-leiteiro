import React, { JSX } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface EnergiaEletricaInputProps {
  consumoEnergia: string;
  setConsumoEnergia: (value: string) => void;
  temEnergiaFotovoltaica: boolean;
  setTemEnergiaFotovoltaica: (value: boolean) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const EnergiaEletricaInput: React.FC<EnergiaEletricaInputProps> = ({
  consumoEnergia,
  setConsumoEnergia,
  temEnergiaFotovoltaica,
  setTemEnergiaFotovoltaica,
  renderRadioButton,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.electricEnergy.sectionTitle")}{" "}
        </Text>
        <Text style={stylesCharacterization.questionText}>
          {t(
            "questionnaire.characterization.electricEnergy.monthlyConsumption",
          )}
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.electricEnergy.monthlyConsumptionPlaceholder",
          )}
          placeholderTextColor="#999"
          value={consumoEnergia}
          onChangeText={setConsumoEnergia}
          keyboardType="decimal-pad"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t("questionnaire.characterization.electricEnergy.hasSolarEnergy")}
          </Text>
        </Text>
        <View>
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemEnergiaFotovoltaica(true)}
          >
            {renderRadioButton(temEnergiaFotovoltaica === true)}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t("common.yes")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setTemEnergiaFotovoltaica(false)}
          >
            {renderRadioButton(temEnergiaFotovoltaica === false)}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t("common.no")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EnergiaEletricaInput;
