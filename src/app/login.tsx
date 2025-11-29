// External Libraries
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

// Components
import LoginRegister from "../components/pages/login-register";

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
