import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={() => router.push("/questions")} >
          <Text style={styles.link}>Go to questions screen</Text>
        </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    color: "blue",
  },
});
