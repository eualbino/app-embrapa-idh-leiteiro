// External Libraries
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import History from "@/src/components/pages/history";
import { AppBar } from "@/src/components/commons";

export default function HistoryPage() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.innerContainer}>
        <AppBar title="Histórico" />
        <History />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  innerContainer: {
    flex: 1,
  },
});
