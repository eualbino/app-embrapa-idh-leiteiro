import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface LocalizacaoInputProps {
  cidade: string;
  setCidade: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
}

const LocalizacaoInput: React.FC<LocalizacaoInputProps> = ({
  cidade,
  setCidade,
  estado,
  setEstado,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>
            {t("questionnaire.characterization.location.sectionTitle")}{" "}
          </Text>
          <Text>{t("questionnaire.characterization.location.city")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.cityPlaceholder"
          )}
          value={cidade}
          onChangeText={setCidade}
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.location.state")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.statePlaceholder"
          )}
          value={estado}
          onChangeText={(text) => setEstado(text.toUpperCase())}
          maxLength={2}
          autoCapitalize="characters"
        />
      </View>
    </View>
  );
};

export default LocalizacaoInput;
