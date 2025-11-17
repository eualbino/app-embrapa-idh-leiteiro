import React, { JSX } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface ConsumoDiarioInputProps {
  volumoso: string;
  setVolumoso: (value: string) => void;
  concentrado: string;
  setConcentrado: (value: string) => void;
  unidadeInformada: string;
  setUnidadeInformada: (value: string) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const ConsumoDiarioInput: React.FC<ConsumoDiarioInputProps> = ({
  volumoso,
  setVolumoso,
  concentrado,
  setConcentrado,
  unidadeInformada,
  setUnidadeInformada,
  renderRadioButton,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t("questionnaire.characterization.dailyConsumption.sectionTitle")}{" "}
          </Text>
          <Text>
            {t(
              "questionnaire.characterization.dailyConsumption.roughageConsumption"
            )}
          </Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.dailyConsumption.roughageConsumptionPlaceholder"
          )}
          value={volumoso}
          onChangeText={setVolumoso}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t(
              "questionnaire.characterization.dailyConsumption.concentrateConsumption"
            )}
          </Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.dailyConsumption.concentrateConsumptionPlaceholder"
          )}
          value={concentrado}
          onChangeText={setConcentrado}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t("questionnaire.characterization.dailyConsumption.unitInformed")}
          </Text>
        </Text>
        <View>
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setUnidadeInformada("materia_natural")}
          >
            {renderRadioButton(unidadeInformada === "materia_natural")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t(
                  "questionnaire.characterization.dailyConsumption.naturalMatter"
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={stylesCharacterization.optionContainer}
            onPress={() => setUnidadeInformada("materia_seca")}
          >
            {renderRadioButton(unidadeInformada === "materia_seca")}
            <View style={{ flex: 1, marginRight: 1 }}>
              <Text style={[stylesCharacterization.questionsResponseText]}>
                {t("questionnaire.characterization.dailyConsumption.dryMatter")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConsumoDiarioInput;
