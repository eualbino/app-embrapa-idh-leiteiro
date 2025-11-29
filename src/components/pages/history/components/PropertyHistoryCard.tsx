// External Libraries
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Config
import { theme } from "@/src/config";

// Types
import { PropertySummary } from "@/src/services/api/user";

interface PropertyHistoryCardProps {
  property: PropertySummary;
  onPress?: () => void;
}

export const PropertyHistoryCard: React.FC<PropertyHistoryCardProps> = ({
  property,
  onPress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getProductionSystemLabel = (system: string) => {
    const systems: { [key: string]: string } = {
      PASTO: "Pasto",
      PASTO_SUPLEMENTACAO: "Pasto com Suplementação",
      CONFINADO: "Confinado",
      CONFINADO_MISTO: "Confinado Misto",
      OUTRO: "Outro",
    };
    return systems[system] || system;
  };

  const MINIMUM_SCORES = {
    waterManagement: 0.62,
    waterQuality: 0.61,
    wasteManagement: 0.71,
    waterPerformanceIndex: 0.64,
  };

  const getScoreColor = (score: number | null, minimum: number) => {
    if (score === null) return theme.colors.text.secondary;
    if (score >= minimum) return theme.colors.state.success;
    return theme.colors.state.error;
  };

  const formatScore = (score: number | null) => {
    if (score === null) return "N/A";
    return score.toFixed(2);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons
            name="location-outline"
            size={18}
            color={theme.colors.primary.default}
          />
          <Text style={styles.location}>
            {property.city}, {property.country}
          </Text>
        </View>
        <Text style={styles.date}>{formatDate(property.createdAt)}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Sistema:</Text>
        <Text style={styles.value}>
          {getProductionSystemLabel(property.productionSystem)}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Área Total:</Text>
        <Text style={styles.value}>{property.totalAreaHa} ha</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.scoresTitle}>Pontuações:</Text>

      <View style={styles.scoresContainer}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Quantidade de Água</Text>
          <Text
            style={[
              styles.scoreValue,
              {
                color: getScoreColor(
                  property.waterManagementScore,
                  MINIMUM_SCORES.waterManagement,
                ),
              },
            ]}
          >
            {formatScore(property.waterManagementScore)}
          </Text>
        </View>

        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Qualidade da Água</Text>
          <Text
            style={[
              styles.scoreValue,
              {
                color: getScoreColor(
                  property.waterQualityConservationScore,
                  MINIMUM_SCORES.waterQuality,
                ),
              },
            ]}
          >
            {formatScore(property.waterQualityConservationScore)}
          </Text>
        </View>

        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Manejo de Resíduos</Text>
          <Text
            style={[
              styles.scoreValue,
              {
                color: getScoreColor(
                  property.wasteManagementScore,
                  MINIMUM_SCORES.wasteManagement,
                ),
              },
            ]}
          >
            {formatScore(property.wasteManagementScore)}
          </Text>
        </View>

        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>IDH Água</Text>
          <Text
            style={[
              styles.scoreValueLarge,
              {
                color: getScoreColor(
                  property.waterPerformanceIndexScore,
                  MINIMUM_SCORES.waterPerformanceIndex,
                ),
              },
            ]}
          >
            {formatScore(property.waterPerformanceIndexScore)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.primary.default}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  location: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.primary.default,
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 12,
  },
  scoresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary.default,
    marginBottom: 12,
  },
  scoresContainer: {
    gap: 8,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  scoreValueLarge: {
    fontSize: 20,
    fontWeight: "700",
  },
  footer: {
    alignItems: "flex-end",
    marginTop: 8,
  },
});
