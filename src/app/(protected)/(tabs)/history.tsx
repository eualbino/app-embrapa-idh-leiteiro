// External Libraries
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import History from "@/src/components/pages/history";

export default function HistoryPage() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      edges={["top"]}
    >
      <History />
    </SafeAreaView>
  );
}
