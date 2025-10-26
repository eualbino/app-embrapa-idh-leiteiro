import AllQuestionsScore from "../../components/pages/questions";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuestionsPage() {
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AllQuestionsScore />
      </ScrollView>
    </SafeAreaView>
  );
}
