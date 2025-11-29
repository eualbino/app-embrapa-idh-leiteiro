// External Libraries
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import AllQuestionsScore from "@/src/components/pages/questions";

export default function QuestionsPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <AllQuestionsScore />
    </SafeAreaView>
  );
}
