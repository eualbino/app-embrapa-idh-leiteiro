// External Libraries
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

// Style
import { stylesCharacterization } from "../../../../styles";

interface RebanhoInputProps {
  vacasLactacao: string;
  setVacasLactacao: (value: string) => void;
  vacasSecas: string;
  setVacasSecas: (value: string) => void;
  novilhas: string;
  setNovilhas: (value: string) => void;
  bezerros: string;
  setBezerros: (value: string) => void;
  garrotes: string;
  setGarrotes: (value: string) => void;
  bulls: string;
  setBulls: (value: string) => void;
}

const RebanhoInput: React.FC<RebanhoInputProps> = ({
  vacasLactacao,
  setVacasLactacao,
  vacasSecas,
  setVacasSecas,
  novilhas,
  setNovilhas,
  bezerros,
  setBezerros,
  garrotes,
  setGarrotes,
  bulls,
  setBulls,
}) => {
  const { t } = useTranslation();

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.sectionTitle")} </Text>
          <Text>{t("questionnaire.characterization.herd.lactatingCows")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.lactatingCowsPlaceholder",
          )}
          placeholderTextColor="#999"
          value={vacasLactacao}
          onChangeText={setVacasLactacao}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.dryCows")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.dryCowsPlaceholder",
          )}
          placeholderTextColor="#999"
          value={vacasSecas}
          onChangeText={setVacasSecas}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.heifers")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.heifersPlaceholder",
          )}
          placeholderTextColor="#999"
          value={novilhas}
          onChangeText={setNovilhas}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.calves")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.calvesPlaceholder",
          )}
          placeholderTextColor="#999"
          value={bezerros}
          onChangeText={setBezerros}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.steers")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.steersPlaceholder",
          )}
          placeholderTextColor="#999"
          value={garrotes}
          onChangeText={setGarrotes}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t("questionnaire.characterization.herd.bulls")}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.herd.bullsPlaceholder",
          )}
          placeholderTextColor="#999"
          value={bulls}
          onChangeText={setBulls}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default RebanhoInput;
