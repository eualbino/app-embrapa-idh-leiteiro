import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { stylesQuestions } from '../style-questions-caracterizacao';

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
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>E. COMPOSIÇÃO DO LEITE:</Text>
        <Text>
          Qual o percentual de gordura do leite?
        </Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Percentual de Gordura (%)"
        value={percentualGordura}
        onChangeText={setPercentualGordura}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Qual o percentual de proteína do leite?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Percentual de Proteína (%)"
        value={percentualProteina}
        onChangeText={setPercentualProteina}
        keyboardType="numeric"
      />
    </View>
  </View>
);

export default ComposicaoLeiteInput;
