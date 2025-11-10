import AllQuestionsScore from "../../components/pages/questions";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionsPage() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <AllQuestionsScore />
    </SafeAreaView>
  );
}
