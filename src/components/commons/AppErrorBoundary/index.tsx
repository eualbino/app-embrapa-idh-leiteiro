// External Libraries
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import type { ErrorBoundaryProps } from "expo-router";

// Styles
import { styles } from "./styles";

/**
 * Tela exibida quando uma exceção escapa do render de uma rota.
 *
 * Sem isso o expo-router derruba o app em release, que é uma das causas mais
 * comuns de reprovação na revisão da App Store (Guideline 2.1). As mensagens
 * usam fallback embutido para continuar legíveis mesmo se a falha for no i18n.
 */
export function AppErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const { t } = useTranslation();

  // O detalhe técnico fica no log, nunca na tela do produtor.
  console.error("Erro não tratado na navegação:", error?.message);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            {t("errorBoundary.title", "Algo deu errado")}
          </Text>

          <Text style={styles.message}>
            {t(
              "errorBoundary.message",
              "Não foi possível carregar esta tela. Seus dados continuam salvos no aparelho.",
            )}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={retry}
            accessibilityRole="button"
            accessibilityLabel={t("errorBoundary.retry", "Tentar novamente")}
          >
            <Text style={styles.buttonText}>
              {t("errorBoundary.retry", "Tentar novamente")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
