import { questions } from "@/data/questions";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const data_quantidade_agua = questions.filter(
  (question) => question.groupMain === "quantidade-agua"
);
const data_qualidade_agua = questions.filter(
  (question) => question.groupMain === "qualidade-agua"
);
const data_manejo_residuos = questions.filter(
  (question) => question.groupMain === "manejo-residuos-uso-fertilizantes"
);

export default function AllQuestions() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});

  const groups = [
    data_quantidade_agua,
    data_qualidade_agua,
    data_manejo_residuos,
  ];
  const currentGroup = groups[step];

  const handleSelect = (id: string | number, value: number | null) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    const allAnswered = currentGroup.every(
      (q) => answers[q.id] !== undefined
    );
    
    if (!allAnswered) {
      alert("Responda todas as perguntas antes de continuar.");
      return;
    }

    if (step < groups.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      alert("Você finalizou todas as perguntas!");
      console.log("Respostas finais:", answers);
    }
  };

  return (
    <ScrollView>
      <View>
        
      </View>
      <Text></Text>
      {/* Resposta de Cidade */}
      <View></View>

      {/* Div de respostas */}
      <View>
        <View>
          <View>
            <Text>
              {step === 0 && "Quantidade de Água"}
              {step === 1 && "Qualidade da Água"}
              {step === 2 && "Manejo de Resíduos e Uso de Fertilizantes"}
            </Text>
          </View>
          <View>
            <Text>Categoria {step + 1} de 3</Text>
          </View>
        </View>

        {currentGroup.map((q, i) => (
          <View key={q.id}>
            <View>
              <Text>
                <Text>{i + 1} - </Text>
                <Text>{q.text}</Text>
              </Text>
            </View>

            {q.observation && (
              <View><Text>{q.observation}</Text></View>
            )}

            {q.option.map((opt) => (
              <TouchableOpacity 
                key={opt.value} 
                style={styles.optionContainer} // Estilo para alinhar o botão e o texto
                onPress={() => handleSelect(q.id, opt.value)}
              >
                {/* Círculo de fora do radio button */}
                <View style={styles.radio}>
                  {answers[q.id] === opt.value && <View style={styles.radioSelected} />}
                </View>
                <Text>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View>
          <View>
            {step > 0 && (
              <TouchableOpacity onPress={() => setStep(step - 1)}>
                <Text>Voltar</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            <TouchableOpacity onPress={handleNext}>
              <Text>{step < groups.length - 1 ? "Próximo" : "Finalizar"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});