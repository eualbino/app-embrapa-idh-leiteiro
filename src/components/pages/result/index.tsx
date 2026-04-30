import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWaterPerformance } from "./hooks/useWaterPerformance";
import { useResultPDFData } from "./hooks/useResultPDFData";
import { generateAndSharePDF } from "@/src/utils/pdfGenerator";
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

  const { data, isLoading, error } =
    useWaterPerformance(propertyId);
  const {
    userName,
    userEmail,
    userCpf,
    property,
    isLoading: isLoadingPDFData,
  } = useResultPDFData(propertyId);

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const IMPROVEMENTS = useMemo(() => getImprovements(t), [t]);

  const scrollViewRef = useRef<ScrollView>(null);
  const waterManagementRef = useRef<View>(null);
  const waterQualityRef = useRef<View>(null);
  const wasteManagementRef = useRef<View>(null);

  const scrollToSection = (ref: React.RefObject<View | null>) => {
    if (ref.current && scrollViewRef.current) {
      ref.current.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 20, animated: true });
        },
        () => {},
      );
    }
  };

  const handleDownloadPDF = async () => {
    if (!property && !data) {
      Alert.alert(
        "Erro",
        "Dados da propriedade não disponíveis para gerar o relatório.",
      );
      return;
    }

    try {
      setIsGeneratingPDF(true);

      await generateAndSharePDF({
        property: {
          city: property?.city ?? "",
          country: property?.country ?? "",
          productionSystem: property?.productionSystem ?? "",
          totalAreaHa: property?.totalAreaHa ?? 0,
          createdAt: property?.createdAt ?? new Date().toISOString(),
          waterManagementScore:
            data?.macroIndicators?.quantidadeAgua ??
            property?.waterManagementScore ??
            null,
          waterQualityConservationScore:
            data?.macroIndicators?.qualidadeAgua ??
            property?.waterQualityConservationScore ??
            null,
          wasteManagementScore:
            data?.macroIndicators?.manejoResiduos ??
            property?.wasteManagementScore ??
            null,
          waterPerformanceIndexScore:
            data?.finalScore ?? property?.waterPerformanceIndexScore ?? null,
        },
        userName,
        userEmail,
        userCpf,
      });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      Alert.alert(
        "Erro",
        "Não foi possível gerar o relatório. Tente novamente.",
      );
    } finally {
      setIsGeneratingPDF(false);
    }
  };

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

  const renderTextWithItalic = (text: string) => {
    const parts = text.split(/(Escherichia coli)/gi);
    return parts.map((part, index) => {
      if (part.match(/Escherichia coli/i)) {
        return (
          <Text key={index} style={{ fontStyle: "italic" }}>
            {part}
          </Text>
        );
      }
      return <Text key={index}>{part}</Text>;
    });
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

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

        {!isLoadingPDFData && (property || data) && (
          <View style={styles.downloadContainer}>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={handleDownloadPDF}
              disabled={isGeneratingPDF}
              activeOpacity={0.7}
            >
              {isGeneratingPDF ? (
                <ActivityIndicator size="small" color="#006f36" />
              ) : (
                <Ionicons name="download-outline" size={26} color="#006f36" />
              )}
            </TouchableOpacity>
            <Text style={styles.downloadText}>
              {t("result.downloadReport")}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.scoresSection}>
        <Text style={styles.sectionTitle}>{t("result.detailedScores")}</Text>

        <TouchableOpacity
          style={[
            styles.scoreCard,
            needsImprovement(
              scores.waterManagement,
              MINIMUM_SCORES.waterManagement,
            ) && styles.scoreCardClickable,
          ]}
          onPress={() =>
            needsImprovement(
              scores.waterManagement,
              MINIMUM_SCORES.waterManagement,
            ) && scrollToSection(waterManagementRef)
          }
          disabled={
            !needsImprovement(
              scores.waterManagement,
              MINIMUM_SCORES.waterManagement,
            )
          }
          activeOpacity={0.7}
        >
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
              {MINIMUM_SCORES.waterManagement.toFixed(2).replace(".", ",")}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={[
                  styles.scoreCardStatusBadge,
                  {
                    backgroundColor: needsImprovement(
                      scores.waterManagement,
                      MINIMUM_SCORES.waterManagement,
                    )
                      ? "#FEE2E2"
                      : "",
                  },
                ]}
              >
                {needsImprovement(
                  scores.waterManagement,
                  MINIMUM_SCORES.waterManagement,
                ) && (
                  <Text style={[styles.scoreStatus, { color: "#DC2626" }]}>
                    {t("result.needsImprovement")}
                  </Text>
                )}
              </View>
              {needsImprovement(
                scores.waterManagement,
                MINIMUM_SCORES.waterManagement,
              ) && (
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color="#F59E0B"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.scoreCard,
            needsImprovement(
              scores.waterQuality,
              MINIMUM_SCORES.waterQuality,
            ) && styles.scoreCardClickable,
          ]}
          onPress={() =>
            needsImprovement(
              scores.waterQuality,
              MINIMUM_SCORES.waterQuality,
            ) && scrollToSection(waterQualityRef)
          }
          disabled={
            !needsImprovement(scores.waterQuality, MINIMUM_SCORES.waterQuality)
          }
          activeOpacity={0.7}
        >
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
              {MINIMUM_SCORES.waterQuality.toFixed(2).replace(".", ",")}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={[
                  styles.scoreCardStatusBadge,
                  {
                    backgroundColor: needsImprovement(
                      scores.waterQuality,
                      MINIMUM_SCORES.waterQuality,
                    )
                      ? "#FEE2E2"
                      : "",
                  },
                ]}
              >
                {needsImprovement(
                  scores.waterQuality,
                  MINIMUM_SCORES.waterQuality,
                ) && (
                  <Text style={[styles.scoreStatus, { color: "#DC2626" }]}>
                    {t("result.needsImprovement")}
                  </Text>
                )}
              </View>
              {needsImprovement(
                scores.waterQuality,
                MINIMUM_SCORES.waterQuality,
              ) && (
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color="#F59E0B"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.scoreCard,
            needsImprovement(
              scores.wasteManagement,
              MINIMUM_SCORES.wasteManagement,
            ) && styles.scoreCardClickable,
          ]}
          onPress={() =>
            needsImprovement(
              scores.wasteManagement,
              MINIMUM_SCORES.wasteManagement,
            ) && scrollToSection(wasteManagementRef)
          }
          disabled={
            !needsImprovement(
              scores.wasteManagement,
              MINIMUM_SCORES.wasteManagement,
            )
          }
          activeOpacity={0.7}
        >
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
              {MINIMUM_SCORES.wasteManagement.toFixed(2).replace(".", ",")}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={[
                  styles.scoreCardStatusBadge,
                  {
                    backgroundColor: needsImprovement(
                      scores.wasteManagement,
                      MINIMUM_SCORES.wasteManagement,
                    )
                      ? "#FEE2E2"
                      : "",
                  },
                ]}
              >
                {needsImprovement(
                  scores.wasteManagement,
                  MINIMUM_SCORES.wasteManagement,
                ) && (
                  <Text style={[styles.scoreStatus, { color: "#DC2626" }]}>
                    {t("result.needsImprovement")}
                  </Text>
                )}
              </View>
              {needsImprovement(
                scores.wasteManagement,
                MINIMUM_SCORES.wasteManagement,
              ) && (
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color="#F59E0B"
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
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
            <View ref={waterManagementRef} style={styles.improvementCategory}>
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
                      <Text style={styles.improvementItemText}>
                        {renderTextWithItalic(item)}
                      </Text>
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
            <View ref={waterQualityRef} style={styles.improvementCategory}>
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
                      <Text style={styles.improvementItemText}>
                        {renderTextWithItalic(item)}
                      </Text>
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
            <View ref={wasteManagementRef} style={styles.improvementCategory}>
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
                      <Text style={styles.improvementItemText}>
                        {renderTextWithItalic(item)}
                      </Text>
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
