import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginRegister from "../components/pages/login-register";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets.top;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: topInset,
      }}
    >
      <LoginRegister />
    </SafeAreaView>
  );
}
