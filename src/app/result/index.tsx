import ResultPage from "../../components/pages/result";
import { SafeAreaView } from "react-native-safe-area-context";
import { withAuthentication } from "@/src/hoc/withAuthentication";

function Result() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ResultPage />
    </SafeAreaView>
  );
}

export default withAuthentication(Result);
