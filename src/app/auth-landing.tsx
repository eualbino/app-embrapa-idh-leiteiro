// External Libraries
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Components
import { ButtonCommon } from "@/src/components/commons/Button";

// Config
import { theme } from "@/src/config";

const { width } = Dimensions.get("window");

export default function AuthLandingScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleAccessAccount = () => {
    router.push("/login?mode=login");
  };

  const handleRegister = () => {
    router.push("/login?mode=register");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/src/assets/images/logo_embrapa.png")}
                style={styles.logoIdh}
                resizeMode="contain"
              />
            </View>

            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("@/src/assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Welcome Text */}
            <View style={styles.textContainer}>
              <Text style={styles.welcomeTitle}>
                {t("authLanding.welcome", "Seja Bem-Vindo!")}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {t(
                  "authLanding.description",
                  "Acesse a sua conta ou faça o seu cadastro gratuito e comece a usar o aplicativo",
                )}
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonsContainer}>
              <ButtonCommon
                onPress={handleAccessAccount}
                variant="primary"
                style={styles.primaryButton}
              >
                {t("authLanding.accessAccount", "ACESSAR MINHA CONTA")}
              </ButtonCommon>

              <ButtonCommon
                onPress={handleRegister}
                variant="primary"
                style={styles.secondaryButton}
              >
                {t("authLanding.register", "CADASTRE-SE")}
              </ButtonCommon>

              <Text
                style={styles.outlinedButton}
                onPress={handleForgotPassword}
              >
                {t("authLanding.forgotPassword", "Esqueci minha senha")}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    minHeight: "100%",
  },
  languageContainer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoIdh: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: -20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary.default,
    textAlign: "center",
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    paddingVertical: 16,
  },
  secondaryButton: {
    paddingVertical: 16,
    backgroundColor: theme.colors.primary.light,
  },
  outlinedButton: {
     color: theme.colors.primary.default,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  outlinedButtonText: {
    color: theme.colors.primary.default,
  },
});
