import React from "react";
import { View, Text, TextInput } from "react-native";
import { stylesQuestions } from "../../../../styles";

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
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>B. ÁREA: </Text>
        <Text>Qual a área total da propriedade, em hectares (ha)?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Área da Propriedade (ha)"
        value={areaPropriedade}
        onChangeText={setAreaPropriedade}
        keyboardType="numeric"
      />
    </View>

    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>Qual a área de pastagem, em hectares (ha)?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Área de Pastagem (ha)"
        value={areaPastagem}
        onChangeText={setAreaPastagem}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Qual a área de silagem, em hectares (ha)?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Área de Silagem (ha)"
        value={areaSilagem}
        onChangeText={setAreaSilagem}
        keyboardType="numeric"
      />
    </View>
  </View>
);

export default AreaInput;
