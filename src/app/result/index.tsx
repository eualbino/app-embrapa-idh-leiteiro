import ResultPage from "../../components/pages/result";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Result() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ResultPage />
    </SafeAreaView>
  );
}
