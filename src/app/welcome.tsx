// External Libraries
import { useState } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Contexts
import { useOnboardingContext } from "@/src/contexts/OnboardingContext";

// Components
import { ButtonCommon } from "@/src/components/commons";

// Styles
import { styles } from "@/src/styles/welcome.styles";

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { markAsCompleted } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      await markAsCompleted();
      router.replace("/auth-landing");
    } catch {
      router.replace("/auth-landing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/src/assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t("welcome.title")}</Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.paragraph}>
                {t("welcome.p1Start")}
                <Text style={styles.bold}>{t("welcome.p1Highlight")}</Text>
                {t("welcome.p1End")}
              </Text>

              <Text style={styles.paragraph}>{t("welcome.p2")}</Text>

              <Text style={styles.paragraph}>
                {t("welcome.p3Start")}
                <Text style={styles.bold}>{t("welcome.p3Highlight")}</Text>
                {t("welcome.p3End")}
              </Text>
            </View>

            <View style={styles.logoContainer}>
              <Image
                source={require("@/src/assets/images/logo_embrapa.png")}
                style={styles.logoEmbrapa}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <ButtonCommon
            onPress={handleContinue}
            disabled={isLoading}
            style={styles.button}
          >
            {isLoading ? t("common.loading") : t("welcome.continue")}
          </ButtonCommon>
        </View>
      </SafeAreaView>
    </View>
  );
}
