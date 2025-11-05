import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LoginRegister from "../components/pages/login-register";

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets.top; 

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -topInset, 
      }}
    >
      <View>
        <LoginRegister />
      </View>
    </View>
  );
}
