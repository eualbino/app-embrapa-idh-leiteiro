import { SafeAreaView } from "react-native-safe-area-context";
import { withAuthentication } from "../../hoc/withAuthentication";
import History from "@/src/components/pages/history";

function HistoryPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <History />
    </SafeAreaView>
  );
}

export default withAuthentication(HistoryPage);
