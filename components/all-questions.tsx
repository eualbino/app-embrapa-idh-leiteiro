import { questions } from "@/data/questions";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import { stylesQuestions } from "@/components/style-all-questions";
import Feather from "@expo/vector-icons/Feather";

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
  const total_questions = 35;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number | null }>({});

  const groups = [
    data_quantidade_agua,
    data_qualidade_agua,
    data_manejo_residuos,
  ];

  const currentGroup = groups[step];

  useEffect(() => {
    if (answers["2"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "3": 0,
        "4": 0,
      }));
    }

    if (answers["14"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "15": null,
        "16": null,
        "17": null,
      }));
    }

    if (answers["22"] === 0) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        "23": null,
        "24": null,
        "25": null,
      }));
    }
  }, [answers["2"], answers["14"], answers["22"]]);

  const answeredCount = Object.values(answers).filter(
    (value) => value !== undefined
  ).length;

  const handleSelect = (id: string | number, value: number | null) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    const allAnswered = currentGroup.every((q) => answers[q.id] !== undefined);

    if (!allAnswered) {
      alert("Responda todas as perguntas antes de continuar.");
      return;
    }

    if (step < groups.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      alert("Você finalizou todas as perguntas!");
    }
  };

  const questionDisabled = (questionId: string | number) => {
    const id = String(questionId);
    if ((id === "3" || id === "4") && answers["2"] === 0) {
      return true;
    }
    if ((id === "15" || id === "16" || id === "17") && answers["14"] === 0) {
      return true;
    }
    if ((id === "23" || id === "24" || id === "25") && answers["22"] === 0) {
      return true;
    }
    return false;
  };

  return (
    <View>
      <View style={stylesQuestions.containerProgressBar}>
        <View style={stylesQuestions.containerTextProgressBar}>
          <View>
            <Text style={stylesQuestions.textInProgressBar}>Progresso</Text>
          </View>
          <View>
            <Text style={stylesQuestions.textInProgressBar}>
              {answeredCount} / 35
            </Text>
          </View>
        </View>
        <View>
          <ProgressBar
            progress={answeredCount / total_questions}
            color="#006f35"
            style={{ height: 10, borderRadius: 10 }}
          />
        </View>
      </View>

      {/* Resposta de Cidade */}
      <View></View>

      <View style={stylesQuestions.containerResponses}>
        <View style={stylesQuestions.containerResponsesTitle}>
          <View>
            <Text style={stylesQuestions.responseTextTitle}>
              {step === 0 && "Quantidade de Água"}
              {step === 1 && "Qualidade da Água"}
              {step === 2 && "Manejo de Resíduos e Uso de Fertilizantes"}
            </Text>
          </View>
          <View>
            <Text style={stylesQuestions.responseTextCategoryCount}>
              Categoria {step + 1} de 3
            </Text>
          </View>
        </View>

        {currentGroup.map((q) => {
          const isDisabled = questionDisabled(q.id);
          return (
            <View key={q.id} style={stylesQuestions.containerResponses}>
              <View>
                <Text style={stylesQuestions.questionText}>
                  <Text>{q.id}. </Text>
                  <Text>{q.text}</Text>
                </Text>
              </View>

              {q.observation && (
                <View style={stylesQuestions.questionContainerObsservation}>
                  <Feather
                    name="alert-circle"
                    size={24}
                    color="#006f36ff"
                    style={{ textAlign: "center" }}
                  />
                  <Text style={stylesQuestions.questionTextObsservation}>
                    {q.observation}
                  </Text>
                </View>
              )}
              <View style={stylesQuestions.optionMainContainer}>
                {q.option.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={stylesQuestions.optionContainer}
                    onPress={() => handleSelect(q.id, opt.value)}
                    disabled={isDisabled}
                  >
                    <View style={[stylesQuestions.radio, isDisabled && { borderColor: '#006f36ab' }]}>
                      {answers[q.id] === opt.value && (
                        <View style={stylesQuestions.radioSelected} />
                      )}
                    </View>
                    <View style={{ flex: 1, marginRight: 1 }}>
                      <Text style={[stylesQuestions.questionsResponseText, isDisabled && { color: '#006f36ab' }]}>
                        {opt.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        <View style={stylesQuestions.containerMainButton}>
          <View>
            <TouchableOpacity
              onPress={() => setStep(step - 1)}
              disabled={step === 0}
              style={stylesQuestions.buttonVoltar}
            >
              <Text
                style={[
                  stylesQuestions.buttonVoltarText,
                  step <= 0 && { opacity: 0.4 },
                ]}
              >
                {"<  "} Voltar
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleNext}
              style={stylesQuestions.buttonNext}
            >
              <Text style={stylesQuestions.buttonNextText}>
                {step < groups.length - 1 ? "Próximo" : "Finalizar"} {"  >"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
