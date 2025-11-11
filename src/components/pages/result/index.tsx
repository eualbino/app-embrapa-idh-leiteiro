import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";

export default function ResultPage() {
  const { t } = useTranslation();

  const suggestions = [
    "water_monitoring",
    "hydraulic_mapping",
    "efficient_irrigation",
    "water_reuse",
    "rainwater_harvesting",
    "staff_training",
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com Score */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{t("result.title")}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>SCORE</Text>
        </View>
      </View>

      {/* Sugestões de Melhorias */}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>
          {t("result.improvementSuggestions")}
        </Text>

        {suggestions.map((suggestion, index) => (
          <View key={suggestion} style={styles.suggestionCard}>
            <View style={styles.suggestionNumber}>
              <Text style={styles.suggestionNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.suggestionText}>
              {t(`result.suggestions.${suggestion}`)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
