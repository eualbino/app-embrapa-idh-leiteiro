// External Libraries
import { View, StyleSheet } from "react-native";

// Components
import History from "@/src/components/pages/history";
import { AppBar } from "@/src/components/commons";

export default function HistoryPage() {
  return (
    <View style={styles.container}>
      <AppBar title="Histórico" />
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
