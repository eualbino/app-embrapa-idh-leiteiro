import * as React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./styles";

export default function History() {
  const { t } = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      style={{ backgroundColor: "#ffffff" }}
    >
      <View style={styles.containerInfo}>
        <Text style={styles.textHeader}>{t("history.title")}</Text>
        <Text style={styles.textSubHeader}>{t("history.description")}</Text>
      </View>
    </ScrollView>
  );
}
