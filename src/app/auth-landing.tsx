// External Libraries
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useOfflineModeContext } from "@/src/contexts/OfflineModeContext";

// Hooks
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";

// Components
import { ButtonCommon } from "@/src/components/commons/Button";

// Styles
import { styles } from "@/src/styles/auth-landing.styles";

export default function AuthLandingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOffline } = useNetworkStatus();
  const { enterOfflineMode } = useOfflineModeContext();

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

              {isOffline && (
                <ButtonCommon
                  onPress={enterOfflineMode}
                  variant="secondary"
                  style={styles.secondaryButton}
                >
                  {t("authLanding.continueOffline", "Continuar sem internet")}
                </ButtonCommon>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
