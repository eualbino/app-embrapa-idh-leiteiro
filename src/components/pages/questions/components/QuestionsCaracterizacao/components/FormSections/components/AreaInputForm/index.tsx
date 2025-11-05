import React from "react";
import { View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface AreaInputProps {
  areaPropriedade: string;
  setAreaPropriedade: (value: string) => void;
  areaPastagem: string;
  setAreaPastagem: (value: string) => void;
  areaSilagem: string;
  setAreaSilagem: (value: string) => void;
}

const AreaInput: React.FC<AreaInputProps> = ({
  areaPropriedade,
  setAreaPropriedade,
  areaPastagem,
  setAreaPastagem,
  areaSilagem,
  setAreaSilagem,
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.area.sectionTitle')} </Text>
          <Text>{t('questionnaire.characterization.area.totalArea')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.area.totalAreaPlaceholder')}
          value={areaPropriedade}
          onChangeText={setAreaPropriedade}
          keyboardType="numeric"
        />
      </View>

      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.area.pastureArea')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.area.pastureAreaPlaceholder')}
          value={areaPastagem}
          onChangeText={setAreaPastagem}
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.area.silageArea')}</Text>
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t('questionnaire.characterization.area.silageAreaPlaceholder')}
          value={areaSilagem}
          onChangeText={setAreaSilagem}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default AreaInput;
