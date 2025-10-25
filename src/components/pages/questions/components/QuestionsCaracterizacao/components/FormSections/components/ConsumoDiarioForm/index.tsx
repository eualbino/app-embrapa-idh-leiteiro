import React, { JSX } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { stylesQuestions } from "../../../../styles";

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
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>F. CONSUMO DIÁRIO: </Text>
        <Text>Qual o consumo diário de volumoso por vaca (kg/dia ou %PV)?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Consumo de Volumoso"
        value={volumoso}
        onChangeText={setVolumoso}
        keyboardType="numeric"
      />
    </View>

    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>
          Qual o consumo diário de concentrado por vaca (kg/dia ou %PV)?
        </Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Consumo de Concentrado"
        value={concentrado}
        onChangeText={setConcentrado}
        keyboardType="numeric"
      />
    </View>

    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>Unidade informada:</Text>
      </Text>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setUnidadeInformada("kg/dia")}
        >
          {renderRadioButton(unidadeInformada === "kg/dia")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>kg/dia</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setUnidadeInformada("%PV")}
        >
          {renderRadioButton(unidadeInformada === "%PV")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>%PV</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default ConsumoDiarioInput;
