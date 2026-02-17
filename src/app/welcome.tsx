import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";

import { ButtonCommon } from "@/src/components/commons";
import { useOnboardingContext } from "@/src/contexts/OnboardingContext";

export default function WelcomeScreen() {
  const router = useRouter();
  const { markAsCompleted } = useOnboardingContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    try {
      setIsLoading(true);
      await markAsCompleted();
      router.replace("/login");
    } catch {
      router.replace("/login");
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
    gap: 16,
  },
  logoEmbrapa: {
    width: 150,
    height: 60,
  },
  logo: {
    width: 200,
    height: 80,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#006f36",
    textAlign: "center",
  },
  textContainer: {
    gap: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
    color: "#006f36",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    width: "100%",
  },
});
