import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
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
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.herd.sectionTitle')} </Text>
          <Text>{t('questionnaire.characterization.herd.lactatingCows')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.herd.lactatingCowsPlaceholder')}
          value={vacasLactacao}
          onChangeText={setVacasLactacao}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.herd.dryCows')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.herd.dryCowsPlaceholder')}
          value={vacasSecas}
          onChangeText={setVacasSecas}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.herd.heifers')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.herd.heifersPlaceholder')}
          value={novilhas}
          onChangeText={setNovilhas}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.herd.calves')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.herd.calvesPlaceholder')}
          value={bezerros}
          onChangeText={setBezerros}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.herd.steers')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.herd.steersPlaceholder')}
          value={garrotes}
          onChangeText={setGarrotes}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default RebanhoInput;
