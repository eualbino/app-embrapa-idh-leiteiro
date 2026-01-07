// External Libraries
import { View, StyleSheet } from "react-native";

// Components
import ResultPage from "@/src/components/pages/result";
import { AppBar } from "@/src/components/commons";

export default function Result() {
  return (
    <View style={styles.container}>
      <AppBar title="Resultado" />
      <ResultPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
