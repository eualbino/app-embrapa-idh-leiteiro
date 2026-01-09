// External Libraries
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import AllQuestionsScore from "@/src/components/pages/questions";
import { AppBar } from "@/src/components/commons";

export default function QuestionsPage() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.innerContainer}>
        <AppBar title="IDH Leite" />
        <AllQuestionsScore />
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
