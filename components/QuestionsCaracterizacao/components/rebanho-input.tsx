import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { stylesQuestions } from '../style-questions-caracterizacao';

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
}) => (
  <View style={stylesQuestions.containerResponses}>
    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>C. REBANHO:</Text>
        <Text>
          Quantas vacas em lactação existem na propriedade?
        </Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Vacas em Lactação"
        value={vacasLactacao}
        onChangeText={setVacasLactacao}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Quantas vacas secas existem na propriedade?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Vacas Secas"
        value={vacasSecas}
        onChangeText={setVacasSecas}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Quantas novilhas existem na propriedade?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Novilhas"
        value={novilhas}
        onChangeText={setNovilhas}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Quantos bezerros existem na propriedade?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Bezerros"
        value={bezerros}
        onChangeText={setBezerros}
        keyboardType="numeric"
      />
    </View>

    <View>
      <Text style={stylesQuestions.questionText}>
        <Text>Quantos garrotes existem na propriedade?</Text>
      </Text>
      <TextInput
        style={stylesQuestions.textInput}
        placeholder="Garrotes"
        value={garrotes}
        onChangeText={setGarrotes}
        keyboardType="numeric"
      />
    </View>
  </View>
);

export default RebanhoInput;
