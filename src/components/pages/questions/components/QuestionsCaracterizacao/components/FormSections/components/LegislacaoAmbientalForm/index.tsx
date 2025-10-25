import React, { JSX } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { stylesQuestions } from "../../../../styles";

interface LegislacaoAmbientalInputProps {
  temLicencaAmbiental: string;
  setTemLicencaAmbiental: (value: string) => void;
  temOutorgaAgua: string;
  setTemOutorgaAgua: (value: string) => void;
  renderRadioButton: (isSelected: boolean) => JSX.Element;
}

const LegislacaoAmbientalInput: React.FC<LegislacaoAmbientalInputProps> = ({
  temLicencaAmbiental,
  setTemLicencaAmbiental,
  temOutorgaAgua,
  setTemOutorgaAgua,
  renderRadioButton,
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View style={stylesQuestions.containerQuestionInput}>
      <Text style={stylesQuestions.questionText}>
        <Text>H. LEGISLAÇÃO AMBIENTAL: </Text>
        <Text>A propriedade possui licença ambiental?</Text>
      </Text>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemLicencaAmbiental("sim")}
        >
          {renderRadioButton(temLicencaAmbiental === "sim")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>Sim</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemLicencaAmbiental("nao")}
        >
          {renderRadioButton(temLicencaAmbiental === "nao")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>Não</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemLicencaAmbiental("nao_se_aplica")}
        >
          {renderRadioButton(temLicencaAmbiental === "nao_se_aplica")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>
              Não se aplica
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>A propriedade possui outorga de água?</Text>
      </Text>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemOutorgaAgua("sim")}
        >
          {renderRadioButton(temOutorgaAgua === "sim")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>Sim</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemOutorgaAgua("nao")}
        >
          {renderRadioButton(temOutorgaAgua === "nao")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>Não</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity
          style={stylesQuestions.optionContainer}
          onPress={() => setTemOutorgaAgua("nao_se_aplica")}
        >
          {renderRadioButton(temOutorgaAgua === "nao_se_aplica")}
          <View style={{ flex: 1, marginRight: 1 }}>
            <Text style={[stylesQuestions.questionsResponseText]}>
              Não se aplica
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default LegislacaoAmbientalInput;
