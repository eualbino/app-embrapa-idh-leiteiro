import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface LocalizacaoInputProps {
  pais: string;
  setPais: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
}

const LocalizacaoInput: React.FC<LocalizacaoInputProps> = ({
  pais,
  setPais,
  cidade,
  setCidade,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t("questionnaire.characterization.location.sectionTitle")}{" "}
          </Text>
          <Text>{t("questionnaire.characterization.location.country")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.countryPlaceholder",
          )}
          value={pais}
          onChangeText={setPais}
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.location.city")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.cityPlaceholder",
          )}
          value={cidade}
          onChangeText={setCidade}
        />
      </View>
    </View>
  );
};

export default LocalizacaoInput;
