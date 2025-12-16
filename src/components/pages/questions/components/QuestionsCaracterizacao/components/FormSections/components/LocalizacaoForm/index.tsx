// External Libraries
import React, { useMemo, useCallback } from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

// Style
import { stylesCharacterization } from "../../../../styles";

interface LocalizacaoInputProps {
  pais: string;
  setPais: (value: string) => void;
  estado: string;
  setEstado: (value: string) => void;
  cidade: string;
  setCidade: (value: string) => void;
}

const LocalizacaoInput: React.FC<LocalizacaoInputProps> = ({
  pais,
  setPais,
  estado,
  setEstado,
  cidade,
  setCidade,
}) => {
  const { t } = useTranslation();

  const isBrazil = useMemo(() => {
    if (!pais || typeof pais !== "string") return false;
    const paisNormalized = pais.toLowerCase().trim();
    return paisNormalized === "brasil" || paisNormalized === "brazil";
  }, [pais]);

  const handlePaisChange = useCallback(
    (value: string) => {
      setPais(value);

      const newValue = value.toLowerCase().trim();
      const isNewValueBrazil = newValue === "brasil" || newValue === "brazil";

      if (!isNewValueBrazil) {
        setEstado("");
        setCidade("");
      }
    },
    [setPais, setEstado, setCidade],
  );

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.location.sectionTitle")}{" "}
        </Text>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.location.country")}
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.countryPlaceholder",
          )}
          placeholderTextColor="#999"
          value={pais}
          onChangeText={handlePaisChange}
        />
      </View>

      {isBrazil && (
        <View style={stylesCharacterization.containerQuestionInput}>
          <Text style={stylesCharacterization.questionText}>
            <Text>{t("questionnaire.characterization.location.state")}</Text>
          </Text>
          <TextInput
            style={stylesCharacterization.textInput}
            placeholder={t(
              "questionnaire.characterization.location.statePlaceholder",
            )}
            placeholderTextColor="#999"
            value={estado}
            onChangeText={setEstado}
          />
        </View>
      )}

      {isBrazil && (
        <View style={stylesCharacterization.containerQuestionInput}>
          <Text style={stylesCharacterization.questionText}>
            <Text>{t("questionnaire.characterization.location.city")}</Text>
          </Text>
          <TextInput
            style={stylesCharacterization.textInput}
            placeholder={t(
              "questionnaire.characterization.location.cityPlaceholder",
            )}
            placeholderTextColor="#999"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>
      )}
    </View>
  );
};

export default LocalizacaoInput;
