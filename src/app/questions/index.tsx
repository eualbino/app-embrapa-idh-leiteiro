import AllQuestionsScore from "../../components/pages/questions";
import { SafeAreaView } from "react-native-safe-area-context";
import { withAuthentication } from "@/src/hoc/withAuthentication";

function QuestionsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <AllQuestionsScore />
    </SafeAreaView>
  );
}

export default withAuthentication(QuestionsPage);
