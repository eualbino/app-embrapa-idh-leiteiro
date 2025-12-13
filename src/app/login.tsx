// External Libraries
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import LoginRegister from "../components/pages/login-register";

export default function ModalScreen() {
  return (
    <SafeAreaView edges={["top"]}>
      <LoginRegister />
    </SafeAreaView>
  );
}
