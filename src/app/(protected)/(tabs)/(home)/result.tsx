// External Libraries
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import ResultPage from "@/src/components/pages/result";
import { AppBar } from "@/src/components/commons";

export default function Result() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.innerContainer}>
        <AppBar title="Resultado" />
        <ResultPage />
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
