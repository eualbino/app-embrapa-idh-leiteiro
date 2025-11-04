import ConfirmCodeForgotPassword from "@/src/components/pages/forgot-password/confirm-code";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default function ConfirmCodePage() {
  const insets = useSafeAreaInsets();
  const topInset = insets.top;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { marginTop: -topInset }]}>
        <ConfirmCodeForgotPassword />
      </View>
    </SafeAreaView>
  );
}
