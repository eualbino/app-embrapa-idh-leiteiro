// External Libraries
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

// Styles
import { styles } from "@/src/components/commons/AppErrorBoundary/styles";

/**
 * Rota de fallback para deep links inválidos no scheme `appembrapaidh://`.
 * Sem ela o expo-router mostra a tela de erro padrão de desenvolvimento.
 */
export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title} accessibilityRole="header">
            {t("errorBoundary.notFoundTitle")}
          </Text>

          <Text style={styles.message}>
            {t("errorBoundary.notFoundMessage")}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace("/")}
            accessibilityRole="button"
            accessibilityLabel={t("errorBoundary.goHome")}
          >
            <Text style={styles.buttonText}>{t("errorBoundary.goHome")}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
