import AllQuestions from "@/components/all-questions";
import {
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionsPage() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AllQuestions />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  questionBox: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  observation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    fontStyle: "italic",
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  optionSelected: {
    backgroundColor: "#007AFF22",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  optionTextSelected: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "600",
  },
});
