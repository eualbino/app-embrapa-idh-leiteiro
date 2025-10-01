import AllQuestions from "@/components/all-questions";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionsPage() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerInfo}>
          <Text style={styles.textHeader}>
            Índice de{"\n"}Desempenho{"\n"}Hídrico na Produção Leiteira
          </Text>
          <Text style={styles.textSubHeader}>
            Responda o questionário e obtenha um score indívidual, indicando o
            nível de desempenho hídrico do sistema de produção leiteira.
          </Text>
        </View>
        <AllQuestions />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  containerInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    color: "#006f35",
    fontSize: 30,
    textAlign: "center",
    fontWeight: 600,
  },
  textSubHeader: {
    marginTop: 15,
    color: "#006f35",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
