// External Libraries
import { useState } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Contexts
import { useOnboardingContext } from "@/src/contexts/OnboardingContext";

// Components
import { ButtonCommon } from "@/src/components/commons";

// Styles
import { styles } from "@/src/styles/welcome.styles";

export default function WelcomeScreen() {
  const router = useRouter();
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
              <Text style={styles.title}>Seja bem-vindo!</Text>
              <View style={styles.betaBadge}>
                <Text style={styles.betaText}>VERSÃO BETA</Text>
              </View>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.paragraph}>
                Com o{" "}
                <Text style={styles.bold}>
                  Índice de Desempenho Hídrico da Produção Leiteira
                </Text>{" "}
                você irá avaliar o uso da água e o manejo de dejetos da
                propriedade.
              </Text>

              <Text style={styles.paragraph}>
                Ele lhe auxiliará no monitoramento do desempenho ambiental e no
                uso eficiente da água e dos dejetos.
              </Text>

              <Text style={styles.paragraph}>
                Sua propriedade será analisada em três dimensões –{" "}
                <Text style={styles.bold}>
                  quantidade e qualidade de água e manejo de resíduos
                </Text>{" "}
                – ao responder às questões, indicações de melhorias para cada
                uma das dimensões são apresentadas relacionadas à performance
                alcançada!
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
            {isLoading ? "Carregando..." : "Avançar"}
          </ButtonCommon>
        </View>
      </SafeAreaView>
    </View>
  );
}
