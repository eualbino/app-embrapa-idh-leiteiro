import React, { JSX } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { stylesCharacterization } from "../../../../styles";

interface SistemaProducaoInputProps {
  sistemaProducao: string;
  setSistemaProducao: (value: string) => void;
  outroSistemaProducao: string;
  setOutroSistemaProducao: (value: string) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const SistemaProducaoInput: React.FC<SistemaProducaoInputProps> = ({
  sistemaProducao,
  setSistemaProducao,
  outroSistemaProducao,
  setOutroSistemaProducao,
  renderRadioButton,
}) => {
  const { t } = useTranslation();
  
  return (
    <View style={stylesCharacterization.containerResponses}>
      <View>
        <Text style={stylesCharacterization.questionText}>
          <Text>{t('questionnaire.characterization.productionSystem.sectionTitle')} </Text>
          <Text>{t('questionnaire.characterization.productionSystem.question')}</Text>
        </Text>
      </View>

      <View style={stylesCharacterization.containerQuestionRadioArea}>
        <TouchableOpacity
          style={stylesCharacterization.optionContainer}
          onPress={() => setSistemaProducao("exclusivamente_pasto")}
        >
          {renderRadioButton(sistemaProducao === "exclusivamente_pasto")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesCharacterization.questionsResponseText]}>
              {t('questionnaire.characterization.productionSystem.options.exclusivelyPasture')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesCharacterization.containerQuestionRadioArea}>
        <TouchableOpacity
          style={stylesCharacterization.optionContainer}
          onPress={() => setSistemaProducao("pastagem_suplementacao")}
        >
          {renderRadioButton(sistemaProducao === "pastagem_suplementacao")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesCharacterization.questionsResponseText]}>
              {t('questionnaire.characterization.productionSystem.options.pastureWithSupplementation')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesCharacterization.containerQuestionRadioArea}>
        <TouchableOpacity
          style={stylesCharacterization.optionContainer}
          onPress={() => setSistemaProducao("confinado_sem_pastagem")}
        >
          {renderRadioButton(sistemaProducao === "confinado_sem_pastagem")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesCharacterization.questionsResponseText]}>
              {t('questionnaire.characterization.productionSystem.options.confinedNoPasture')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={stylesCharacterization.containerQuestionRadioArea}>
        <TouchableOpacity
          style={stylesCharacterization.optionContainer}
          onPress={() => setSistemaProducao("confinado_vacas_lactacao")}
        >
          {renderRadioButton(sistemaProducao === "confinado_vacas_lactacao")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesCharacterization.questionsResponseText]}>
              {t('questionnaire.characterization.productionSystem.options.confinedLactatingCows')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          style={stylesCharacterization.optionContainer}
          onPress={() => setSistemaProducao("outro")}
        >
          {renderRadioButton(sistemaProducao === "outro")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesCharacterization.questionsResponseText]}>
              {t('questionnaire.characterization.productionSystem.options.other')}
            </Text>
          </View>
        </TouchableOpacity>
        <TextInput
          style={[
            stylesCharacterization.textInput,
            { opacity: sistemaProducao === "outro" ? 1 : 0.5 },
          ]}
          placeholder={t('questionnaire.characterization.productionSystem.otherPlaceholder')}
          value={outroSistemaProducao}
          onChangeText={setOutroSistemaProducao}
          editable={sistemaProducao === "outro"}
          keyboardType="default"
        />
      </View>
    </View>
  );
};

export default SistemaProducaoInput;
