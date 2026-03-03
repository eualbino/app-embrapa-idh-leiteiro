// External Libraries
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

// Components
import LoginRegister from "../components/pages/login-register";

// Types
import { VIEW_LOGIN_PAGE } from "../components/pages/login-register/contants";

export default function ModalScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  
  const initialMode = mode === "register" 
    ? VIEW_LOGIN_PAGE.REGISTER 
    : VIEW_LOGIN_PAGE.LOGIN;

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <LoginRegister initialMode={initialMode} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
