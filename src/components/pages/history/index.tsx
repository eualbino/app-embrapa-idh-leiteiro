import React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";
import { useUserHistory } from "./hooks/useUserHistory";
import { PropertyHistoryCard } from "./components/PropertyHistoryCard";
import { theme } from "@/src/config";

export default function History() {
  const { t } = useTranslation();
  const { user, properties, isLoading, error, refetch } = useUserHistory();

  const onRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary.default} />
        <Text style={styles.loadingText}>{t("common.loading")}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, flex: 1 }}
        style={{ backgroundColor: "#ffffff" }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubText}>
            Puxe para baixo para tentar novamente
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      style={{ backgroundColor: "#ffffff" }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    >
      <View style={styles.containerInfo}>
        <Text style={styles.textHeader}>{t("history.title")}</Text>
        <Text style={styles.textSubHeader}>{t("history.description")}</Text>
      </View>

      {user && (
        <View style={styles.userInfoCard}>
          <Text style={styles.userInfoTitle}>Dados do Usuário</Text>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Nome:</Text>
            <Text style={styles.userInfoValue}>{user.name}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoValue}>{user.email}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>CPF:</Text>
            <Text style={styles.userInfoValue}>{user.cpf}</Text>
          </View>
        </View>
      )}

      <View style={styles.propertiesSection}>
        <Text style={styles.propertiesTitle}>
          Histórico de Propriedades ({properties.length})
        </Text>

        {properties.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t("history.noRecords")}</Text>
            <Text style={styles.emptySubText}>
              Preencha o questionário para visualizar seu histórico
            </Text>
          </View>
        ) : (
          <View style={styles.propertiesList}>
            {properties.map((property) => (
              <PropertyHistoryCard
                key={property.id}
                property={property}
                onPress={() => {
                  console.log("Navegar para propriedade:", property.id);
                }}
              />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
