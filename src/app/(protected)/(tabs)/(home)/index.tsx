// External Libraries
import { View, StyleSheet } from "react-native";

// Components
import AllQuestionsScore from "@/src/components/pages/questions";
import { AppBar } from "@/src/components/commons";

export default function QuestionsPage() {
  return (
    <View style={styles.container}>
      <AppBar title="IDH Leite" />
      <AllQuestionsScore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
