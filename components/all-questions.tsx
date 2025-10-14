import { questions } from "@/data/questions";
import { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  Alert,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { stylesQuestions } from "@/components/style-all-questions";
import Feather from "@expo/vector-icons/Feather";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FormularioQuestionario } from "./QuestionsCaracterizacao/questions-caracterizacao";

interface FormData {
  sistemaProducao: {
    tipo: string;
    outroEspecificacao: string | null;
  };
  area: {
    propriedade: number;
    pastagem: number;
    silagem: number;
  };
  rebanho: {
    vacasLactacao: number;
    vacasSecas: number;
    novilhas: number;
    bezerros: number;
    garrotes: number;
  };
  producaoLeiteira: {
    litrosDiaPropriedade: number;
    litrosVacaDia: number;
  };
  composicaoLeite: {
    percentualGordura: number;
    percentualProteina: number;
  };
  consumoDiario: {
    volumoso: number;
    concentrado: number;
    unidadeInformada: string;
  };
  energiaEletrica: {
    consumoMensal: number;
    temEnergiaFotovoltaica: boolean;
  };
  legislacaoAmbiental: {
    temLicencaAmbiental: string;
    temOutorgaAgua: string;
  };
  dataPreenchimento: string;
}

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
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  // Ref para a função de validação do FormularioQuestionario
  const validateFormRef = useRef<(() => string[]) | null>(null);

  const handleDataChange = (data: FormData) => {
    setFormData(data);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const formatDate = (rawDate: Date) => {
    let day = rawDate.getDate().toString().padStart(2, "0");
    let month = (rawDate.getMonth() + 1).toString().padStart(2, "0");
    let year = rawDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const groups = [
    null, // Step 0 é o FormularioQuestionario
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
    console.log("handleNext chamado, step atual:", step);

    // Se estamos no step 0 (caracterização), validar o formulário
    if (step === 0) {
      if (formData) {
        const errors = validateCaracterizacaoForm(formData);
        if (errors.length > 0) {
          Alert.alert(
            "Campos Obrigatórios",
            "Por favor, preencha os seguintes campos:\n\n" + errors.join("\n"),
            [{ text: "OK" }]
          );
          return;
        }
      } else {
        Alert.alert("Erro", "Dados do formulário de caracterização não disponíveis.");
        return;
      }
    }

    // Para outros steps (1, 2, 3), validar se todas as perguntas foram respondidas
    if (step > 0 && currentGroup) {
      const allAnswered = currentGroup.every(
        (q) => answers[q.id] !== undefined
      );

      if (!allAnswered) {
        Alert.alert("Atenção", "Responda todas as perguntas antes de continuar.");
        return;
      }
    }

    if (step < groups.length - 1) {
      console.log("Avançando para próximo step");
      setStep((prev) => prev + 1);
    } else {
      console.log("Finalizando questionário");
      Alert.alert("Sucesso", "Você finalizou todas as perguntas!");
      // Aqui você pode enviar o formData final e as answers para o backend
      console.log("Dados finais do formulário de caracterização:", formData);
      console.log("Respostas das outras seções:", answers);
    }
  };

  const validateCaracterizacaoForm = (data: FormData): string[] => {
    const errors: string[] = [];

    if (!data.sistemaProducao.tipo) {
      errors.push("Sistema de Produção é obrigatório");
    }

    if (data.sistemaProducao.tipo === "outro" && !data.sistemaProducao.outroEspecificacao?.trim()) {
      errors.push("Especifique o sistema de produção quando \"Outro\" for selecionado");
    }

    if (!data.area.propriedade) {
      errors.push("Área da propriedade é obrigatória");
    }

    if (!data.rebanho.vacasLactacao) {
      errors.push("Número de vacas em lactação é obrigatório");
    }

    if (!data.producaoLeiteira.litrosDiaPropriedade) {
      errors.push("Produção de litros por dia é obrigatória");
    }

    // Adicionar validações para os outros campos numéricos se necessário
    // Exemplo: if (isNaN(data.area.pastagem)) { errors.push('Área de pastagem deve ser um número'); }

    return errors;
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
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}

      {step === 0 ? (
        <View>
          <View style={stylesQuestions.datePickerContainer}>
            <Text style={stylesQuestions.datePickerLabel}>
              Data (dd/mm/aaaa)
            </Text>

            <TouchableOpacity
              onPress={toggleDatePicker}
              style={stylesQuestions.datePickerTouchable}
            >
              <Text style={stylesQuestions.datePickerText}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={stylesQuestions.containerResponses}>
            <View style={stylesQuestions.containerResponsesTitle}>
              <Text style={stylesQuestions.responseTextTitle}>
                Caracterização da Propriedade / Rebanho / Sistema
              </Text>
              <View>
                <Text style={stylesQuestions.responseTextCategoryCount}>
                  Categoria {step + 1} de 4
                </Text>
              </View>
            </View>
          </View>

          <FormularioQuestionario
            onDataChange={handleDataChange}
          />
        </View>
      ) : (
        <>
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

          <View style={stylesQuestions.containerResponses}>
            <View style={stylesQuestions.containerResponsesTitle}>
              <Text style={stylesQuestions.responseTextTitle}>
                {step === 1 && "Quantidade de Água"}
                {step === 2 && "Qualidade da Água"}
                {step === 3 && "Manejo de Resíduos e Uso de Fertilizantes"}
              </Text>
              <View>
                <Text style={stylesQuestions.responseTextCategoryCount}>
                  Categoria {step + 1} de 4
                </Text>
              </View>
            </View>

            {currentGroup?.map((q) => {
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
                        <View
                          style={[
                            stylesQuestions.radio,
                            isDisabled && { borderColor: "#006f36ab" },
                          ]}
                        >
                          {answers[q.id] === opt.value && (
                            <View style={stylesQuestions.radioSelected} />
                          )}
                        </View>
                        <View style={{ flex: 1, marginRight: 1 }}>
                          <Text
                            style={[
                              stylesQuestions.questionsResponseText,
                              isDisabled && { color: "#006f36ab" },
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
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
  );
}

