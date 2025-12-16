// External Libraries
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

// Style
import { stylesCharacterization } from "../../../../styles";

interface ProducaoLeiteiraInputProps {
  litrosDiaPropriedade: string;
  setLitrosDiaPropriedade: (value: string) => void;
  litrosVacaDia: string;
  setLitrosVacaDia: (value: string) => void;
}

const ProducaoLeiteiraInput: React.FC<ProducaoLeiteiraInputProps> = ({
  litrosDiaPropriedade,
  setLitrosDiaPropriedade,
  litrosVacaDia,
  setLitrosVacaDia,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.milkProduction.sectionTitle")}{" "}
        </Text>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.milkProduction.dailyProduction")}
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.milkProduction.dailyProductionPlaceholder",
          )}
          placeholderTextColor="#999"
          value={litrosDiaPropriedade}
          onChangeText={setLitrosDiaPropriedade}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t(
              "questionnaire.characterization.milkProduction.productionPerCow",
            )}
          </Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.milkProduction.productionPerCowPlaceholder",
          )}
          placeholderTextColor="#999"
          value={litrosVacaDia}
          onChangeText={setLitrosVacaDia}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default ProducaoLeiteiraInput;
