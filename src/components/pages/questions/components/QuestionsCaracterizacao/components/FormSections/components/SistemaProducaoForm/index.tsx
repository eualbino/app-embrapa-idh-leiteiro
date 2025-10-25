import React, { JSX } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { stylesQuestions } from "../../../../styles";

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
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>A. SISTEMA DE PRODUCAO: </Text>
        <Text>Qual é o Sistema de Produção empregado pela propriedade?</Text>
      </Text>
    </View>

    <View style={stylesQuestions.containerQuestionRadioArea}>
      <TouchableOpacity
        style={stylesQuestions.optionContainer}
        onPress={() => setSistemaProducao("exclusivamente_pasto")}
      >
        {renderRadioButton(sistemaProducao === "exclusivamente_pasto")}
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text style={[stylesQuestions.questionsResponseText]}>
            Exclusivamente a pasto
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={stylesQuestions.containerQuestionRadioArea}>
      <TouchableOpacity
        style={stylesQuestions.optionContainer}
        onPress={() => setSistemaProducao("pastagem_suplementacao")}
      >
        {renderRadioButton(sistemaProducao === "pastagem_suplementacao")}
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text style={[stylesQuestions.questionsResponseText]}>
            Pastagem com suplementação proteica e/ou energética no cocho
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={stylesQuestions.containerQuestionRadioArea}>
      <TouchableOpacity
        style={stylesQuestions.optionContainer}
        onPress={() => setSistemaProducao("confinado_sem_pastagem")}
      >
        {renderRadioButton(sistemaProducao === "confinado_sem_pastagem")}
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text style={[stylesQuestions.questionsResponseText]}>
            Confinado (volumoso e concentrado no cocho) sem acesso a pastagem
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={stylesQuestions.containerQuestionRadioArea}>
      <TouchableOpacity
        style={stylesQuestions.optionContainer}
        onPress={() => setSistemaProducao("confinado_vacas_lactacao")}
      >
        {renderRadioButton(sistemaProducao === "confinado_vacas_lactacao")}
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text style={[stylesQuestions.questionsResponseText]}>
            Confinado para vacas em lactação e pasto (com ou sem suplementação)
            para demais categorias
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View>
      <TouchableOpacity
        style={stylesQuestions.optionContainer}
        onPress={() => setSistemaProducao("outro")}
      >
        {renderRadioButton(sistemaProducao === "outro")}
        <View style={{ flex: 1, marginRight: 1 }}>
          <Text style={[stylesQuestions.questionsResponseText]}>
            Outro. Qual?
          </Text>
        </View>
      </TouchableOpacity>
      <TextInput
        style={[
          stylesQuestions.textInput,
          { opacity: sistemaProducao === "outro" ? 1 : 0.5 },
        ]}
        placeholder="Especifique outro sistema"
        value={outroSistemaProducao}
        onChangeText={setOutroSistemaProducao}
        editable={sistemaProducao === "outro"}
        keyboardType="default"
      />
    </View>
  </View>
);

export default SistemaProducaoInput;
