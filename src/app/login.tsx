// External Libraries
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

// Components
import LoginRegister from "@/src/components/pages/login-register";

// Types
import { VIEW_LOGIN_PAGE } from "@/src/components/pages/login-register/contants";

// Styles
import { styles } from "@/src/styles/login.styles";

export default function LoginScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();

  const initialMode =
    mode === "register" ? VIEW_LOGIN_PAGE.REGISTER : VIEW_LOGIN_PAGE.LOGIN;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <LoginRegister initialMode={initialMode} />
      </SafeAreaView>
    </View>
  );
}
