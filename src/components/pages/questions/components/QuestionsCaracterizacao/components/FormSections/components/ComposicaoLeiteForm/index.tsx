// External Libraries
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

// Style
import { stylesCharacterization } from "../../../../styles";

interface ComposicaoLeiteInputProps {
  percentualGordura: string;
  setPercentualGordura: (value: string) => void;
  percentualProteina: string;
  setPercentualProteina: (value: string) => void;
}

const ComposicaoLeiteInput: React.FC<ComposicaoLeiteInputProps> = ({
  percentualGordura,
  setPercentualGordura,
  percentualProteina,
  setPercentualProteina,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t(
              "questionnaire.characterization.milkComposition.sectionTitle",
            )}{" "}
          </Text>
          <Text>
            {t("questionnaire.characterization.milkComposition.fatPercentage")}
          </Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.milkComposition.fatPercentagePlaceholder",
          )}
          value={percentualGordura}
          onChangeText={setPercentualGordura}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t(
              "questionnaire.characterization.milkComposition.proteinPercentage",
            )}
          </Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.milkComposition.proteinPercentagePlaceholder",
          )}
          value={percentualProteina}
          onChangeText={setPercentualProteina}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default ComposicaoLeiteInput;
