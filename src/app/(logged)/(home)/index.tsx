import AllQuestionsScore from "@/src/components/pages/questions";
import { SafeAreaView } from "react-native-safe-area-context";
import { withAuthentication } from "@/src/hoc/withAuthentication";

function QuestionsPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <AllQuestionsScore />
    </SafeAreaView>
  );
}

export default withAuthentication(QuestionsPage);
