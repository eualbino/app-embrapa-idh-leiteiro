import React, { useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWaterPerformance } from "./hooks/useWaterPerformance";
import {
  getScoreColor,
  getScoreStatus,
  needsImprovement,
  formatScore,
  hasAnyImprovement,
  allScoresApproved,
} from "./utils";
import { getImprovements } from "./utils/improvementsHelper";
import { MINIMUM_SCORES } from "./constants";
import type { ScoreData } from "./types";
import { styles } from "./styles";

export default function ResultPage() {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const propertyId = params.propertyId as string | null;

  const { data, isLoading, error } = useWaterPerformance(propertyId);

  const IMPROVEMENTS = useMemo(() => getImprovements(t), [t]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006f36" />
        <Text style={styles.loadingText}>{t("result.loadingResults")}</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text style={styles.errorTitle}>{t("result.errorLoadingTitle")}</Text>
        <Text style={styles.errorMessage}>
          {error || t("result.errorLoadingMessage")}
        </Text>
      </View>
    );
  }

  const scores: ScoreData = {
    waterManagement: data.macroIndicators.quantidadeAgua,
    waterQuality: data.macroIndicators.qualidadeAgua,
    wasteManagement: data.macroIndicators.manejoResiduos,
    waterPerformanceIndex: data.finalScore,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{t("result.title")}</Text>
        <Text style={styles.subtitle}>{t("result.idhMilk")}</Text>

        <View
          style={[
            styles.mainScoreContainer,
            {
              backgroundColor: getScoreColor(
                scores.waterPerformanceIndex,
                MINIMUM_SCORES.waterPerformanceIndex,
              ),
            },
          ]}
        >
          <Text style={styles.mainScoreValue}>
            {formatScore(scores.waterPerformanceIndex, t)}
          </Text>
          <Text style={styles.mainScoreLabel}>{t("result.idhMilk")}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {getScoreStatus(
              scores.waterPerformanceIndex,
              MINIMUM_SCORES.waterPerformanceIndex,
              t,
            )}
          </Text>
        </View>
      </View>

      <View style={styles.scoresSection}>
        <Text style={styles.sectionTitle}>{t("result.detailedScores")}</Text>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCardHeader}>
            <View style={styles.scoreCardTitleContainer}>
              <Ionicons name="water-outline" size={24} color="#006f36" />
              <Text style={styles.scoreCardTitle}>
                {t("result.categoryWaterQuantity")}
              </Text>
            </View>
            <Text
              style={[
                styles.scoreCardValue,
                {
                  color: getScoreColor(
                    scores.waterManagement,
                    MINIMUM_SCORES.waterManagement,
                  ),
                },
              ]}
            >
              {formatScore(scores.waterManagement, t)}
            </Text>
          </View>
          <View style={styles.scoreCardDivider} />
          <View style={styles.scoreCardFooter}>
            <Text style={styles.scoreCardMinimum}>
              {t("result.minimumScore")}:{" "}
              {MINIMUM_SCORES.waterManagement.toFixed(2)}
            </Text>
            <View
              style={[
                styles.scoreCardStatusBadge,
                {
                  backgroundColor: needsImprovement(
                    scores.waterManagement,
                    MINIMUM_SCORES.waterManagement,
                  )
                    ? "#FEE2E2"
                    : "#D1FAE5",
                },
              ]}
            >
              <Text
                style={[
                  styles.scoreCardStatusText,
                  {
                    color: needsImprovement(
                      scores.waterManagement,
                      MINIMUM_SCORES.waterManagement,
                    )
                      ? "#DC2626"
                      : "#059669",
                  },
                ]}
              >
                {needsImprovement(
                  scores.waterManagement,
                  MINIMUM_SCORES.waterManagement,
                )
                  ? t("result.needsImprovement")
                  : t("result.approved")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCardHeader}>
            <View style={styles.scoreCardTitleContainer}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#006f36"
              />
              <Text style={styles.scoreCardTitle}>
                {t("result.categoryWaterQuality")}
              </Text>
            </View>
            <Text
              style={[
                styles.scoreCardValue,
                {
                  color: getScoreColor(
                    scores.waterQuality,
                    MINIMUM_SCORES.waterQuality,
                  ),
                },
              ]}
            >
              {formatScore(scores.waterQuality, t)}
            </Text>
          </View>
          <View style={styles.scoreCardDivider} />
          <View style={styles.scoreCardFooter}>
            <Text style={styles.scoreCardMinimum}>
              {t("result.minimumScore")}:{" "}
              {MINIMUM_SCORES.waterQuality.toFixed(2)}
            </Text>
            <View
              style={[
                styles.scoreCardStatusBadge,
                {
                  backgroundColor: needsImprovement(
                    scores.waterQuality,
                    MINIMUM_SCORES.waterQuality,
                  )
                    ? "#FEE2E2"
                    : "#D1FAE5",
                },
              ]}
            >
              <Text
                style={[
                  styles.scoreCardStatusText,
                  {
                    color: needsImprovement(
                      scores.waterQuality,
                      MINIMUM_SCORES.waterQuality,
                    )
                      ? "#DC2626"
                      : "#059669",
                  },
                ]}
              >
                {needsImprovement(
                  scores.waterQuality,
                  MINIMUM_SCORES.waterQuality,
                )
                  ? t("result.needsImprovement")
                  : t("result.approved")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.scoreCard}>
          <View style={styles.scoreCardHeader}>
            <View style={styles.scoreCardTitleContainer}>
              <Ionicons name="leaf-outline" size={24} color="#006f36" />
              <Text style={styles.scoreCardTitle}>
                {t("result.categoryWasteManagement")}
              </Text>
            </View>
            <Text
              style={[
                styles.scoreCardValue,
                {
                  color: getScoreColor(
                    scores.wasteManagement,
                    MINIMUM_SCORES.wasteManagement,
                  ),
                },
              ]}
            >
              {formatScore(scores.wasteManagement, t)}
            </Text>
          </View>
          <View style={styles.scoreCardDivider} />
          <View style={styles.scoreCardFooter}>
            <Text style={styles.scoreCardMinimum}>
              {t("result.minimumScore")}:{" "}
              {MINIMUM_SCORES.wasteManagement.toFixed(2)}
            </Text>
            <View
              style={[
                styles.scoreCardStatusBadge,
                {
                  backgroundColor: needsImprovement(
                    scores.wasteManagement,
                    MINIMUM_SCORES.wasteManagement,
                  )
                    ? "#FEE2E2"
                    : "#D1FAE5",
                },
              ]}
            >
              <Text
                style={[
                  styles.scoreCardStatusText,
                  {
                    color: needsImprovement(
                      scores.wasteManagement,
                      MINIMUM_SCORES.wasteManagement,
                    )
                      ? "#DC2626"
                      : "#059669",
                  },
                ]}
              >
                {needsImprovement(
                  scores.wasteManagement,
                  MINIMUM_SCORES.wasteManagement,
                )
                  ? t("result.needsImprovement")
                  : t("result.approved")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {hasAnyImprovement(scores, MINIMUM_SCORES) && (
        <View style={styles.improvementsSection}>
          <View style={styles.improvementHeader}>
            <Ionicons name="bulb-outline" size={28} color="#F59E0B" />
            <Text style={styles.improvementTitle}>
              {t("result.improvementSuggestions")}
            </Text>
          </View>

          {needsImprovement(
            scores.waterManagement,
            MINIMUM_SCORES.waterManagement,
          ) && (
            <View style={styles.improvementCategory}>
              <View style={styles.categoryHeader}>
                <Ionicons name="water" size={20} color="#EF4444" />
                <Text style={styles.categoryTitle}>
                  {t("result.categoryWaterQuantity")}
                </Text>
              </View>

              {IMPROVEMENTS.waterManagement.map((improvement, index) => (
                <View key={index} style={styles.improvementCard}>
                  <Text style={styles.improvementCardTitle}>
                    {improvement.title}
                  </Text>
                  <Text style={styles.improvementCardSubtitle}>
                    {improvement.subtitle}
                  </Text>
                  {improvement.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.improvementItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.improvementItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {needsImprovement(
            scores.waterQuality,
            MINIMUM_SCORES.waterQuality,
          ) && (
            <View style={styles.improvementCategory}>
              <View style={styles.categoryHeader}>
                <Ionicons name="checkmark-circle" size={20} color="#EF4444" />
                <Text style={styles.categoryTitle}>
                  {t("result.categoryWaterQuality")}
                </Text>
              </View>

              {IMPROVEMENTS.waterQuality.map((improvement, index) => (
                <View key={index} style={styles.improvementCard}>
                  <Text style={styles.improvementCardTitle}>
                    {improvement.title}
                  </Text>
                  <Text style={styles.improvementCardSubtitle}>
                    {improvement.subtitle}
                  </Text>
                  {improvement.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.improvementItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.improvementItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {needsImprovement(
            scores.wasteManagement,
            MINIMUM_SCORES.wasteManagement,
          ) && (
            <View style={styles.improvementCategory}>
              <View style={styles.categoryHeader}>
                <Ionicons name="leaf" size={20} color="#EF4444" />
                <Text style={styles.categoryTitle}>
                  {t("result.categoryWasteManagement")}
                </Text>
              </View>

              {IMPROVEMENTS.wasteManagement.map((improvement, index) => (
                <View key={index} style={styles.improvementCard}>
                  <Text style={styles.improvementCardTitle}>
                    {improvement.title}
                  </Text>
                  <Text style={styles.improvementCardSubtitle}>
                    {improvement.subtitle}
                  </Text>
                  {improvement.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.improvementItem}>
                      <View style={styles.bulletPoint} />
                      <Text style={styles.improvementItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {allScoresApproved(scores, MINIMUM_SCORES) && (
        <View style={styles.successSection}>
          <Ionicons name="checkmark-circle" size={64} color="#10B981" />
          <Text style={styles.successTitle}>{t("result.congratulations")}</Text>
          <Text style={styles.successMessage}>
            {t("result.congratulationsMessage")}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
