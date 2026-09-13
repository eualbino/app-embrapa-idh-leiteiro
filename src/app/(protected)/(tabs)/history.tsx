// External Libraries
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

// Components
import History from "@/src/components/pages/history";
import { AppBar } from "@/src/components/commons";

export default function HistoryPage() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.innerContainer}>
        <AppBar title={t("menu.history")} />
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
