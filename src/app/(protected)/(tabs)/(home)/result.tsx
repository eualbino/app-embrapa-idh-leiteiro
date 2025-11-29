// External Libraries
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import ResultPage from "@/src/components/pages/result";

export default function Result() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <ResultPage />
    </SafeAreaView>
  );
}
