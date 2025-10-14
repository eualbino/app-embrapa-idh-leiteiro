import React, { JSX } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { stylesQuestions } from '../style-questions-caracterizacao';

interface EnergiaEletricaInputProps {
  consumoEnergia: string;
  setConsumoEnergia: (value: string) => void;
  temEnergiaFotovoltaica: boolean;
  setTemEnergiaFotovoltaica: (value: boolean) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const EnergiaEletricaInput: React.FC<EnergiaEletricaInputProps> = ({
  consumoEnergia,
  setConsumoEnergia,
  temEnergiaFotovoltaica,
  setTemEnergiaFotovoltaica,
  renderRadioButton,
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>G. ENERGIA ELÉTRICA:</Text>
        <Text>
          Qual o consumo mensal de energia elétrica (kWh/mês)?
        </Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Consumo Mensal (kWh/mês)"
        value={consumoEnergia}
        onChangeText={setConsumoEnergia}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>A propriedade possui energia fotovoltaica?</Text>
      </Text>
      <View style={stylesQuestions.optionMainContainer}>
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemEnergiaFotovoltaica(true)}
        >
          {renderRadioButton(temEnergiaFotovoltaica === true)}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>
              Sim
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={stylesQuestions.optionMainContainer}>
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemEnergiaFotovoltaica(false)}
        >
          {renderRadioButton(temEnergiaFotovoltaica === false)}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>
              Não
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default EnergiaEletricaInput;

