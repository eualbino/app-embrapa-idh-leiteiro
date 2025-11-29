// External Libraries
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

// Config
import { theme } from "@/src/config";

// Components
import { PropertyHistoryCard } from "./components/PropertyHistoryCard";
import { LogoutButton } from "../../commons/LogoutButton";

// Hooks
import { useUserHistory } from "./hooks/useUserHistory";

// Utils
import { formatCPF } from "@/src/utils";

// Style
import { styles } from "./styles";

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
          <Text style={styles.errorSubText}>{t("history.pullToRefresh")}</Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <>
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
          <LogoutButton />
        </View>

        {user && (
          <View style={styles.userInfoCard}>
            <Text style={styles.userInfoTitle}>{t("history.userData")}</Text>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>{t("history.userName")}:</Text>
              <Text style={styles.userInfoValue}>{user.name}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>
                {t("history.userEmail")}:
              </Text>
              <Text style={styles.userInfoValue}>{user.email}</Text>
            </View>
            <View style={styles.userInfoRow}>
              <Text style={styles.userInfoLabel}>{t("history.userCpf")}:</Text>
              <Text style={styles.userInfoValue}>{formatCPF(user.cpf)}</Text>
            </View>
          </View>
        )}

        <View style={styles.propertiesSection}>
          <Text style={styles.propertiesTitle}>
            {t("history.propertiesHistory")} ({properties.length})
          </Text>

          {properties.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t("history.noRecords")}</Text>
              <Text style={styles.emptySubText}>
                {t("history.emptyMessage")}
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
    </>
  );
}
