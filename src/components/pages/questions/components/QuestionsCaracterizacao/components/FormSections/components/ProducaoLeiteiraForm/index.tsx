import React from "react";
import { View, Text, TextInput } from "react-native";
import { stylesQuestions } from "../../../../styles";

interface ProducaoLeiteiraInputProps {
  litrosDiaPropriedade: string;
  setLitrosDiaPropriedade: (value: string) => void;
  litrosVacaDia: string;
  setLitrosVacaDia: (value: string) => void;
}

const ProducaoLeiteiraInput: React.FC<ProducaoLeiteiraInputProps> = ({
  litrosDiaPropriedade,
  setLitrosDiaPropriedade,
  litrosVacaDia,
  setLitrosVacaDia,
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>D. PRODUÇÃO LEITEIRA: </Text>
        <Text>
          Qual a produção de leite diária da propriedade (litros/dia)?
        </Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Litros/dia da propriedade"
        value={litrosDiaPropriedade}
        onChangeText={setLitrosDiaPropriedade}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Qual a produção de leite por vaca/dia (litros/vaca/dia)?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Litros/vaca/dia"
        value={litrosVacaDia}
        onChangeText={setLitrosVacaDia}
        keyboardType="numeric"
      />
    </View>
  </View>
);

export default ProducaoLeiteiraInput;
