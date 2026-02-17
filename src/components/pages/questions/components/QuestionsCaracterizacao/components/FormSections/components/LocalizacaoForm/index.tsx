// External Libraries
import React, { useMemo, useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";

// Style
import { stylesCharacterization } from "../../../../styles";

const ESTADOS_BRASILEIROS = [
  "Acre",
  "Alagoas",
  "Amapá",
  "Amazonas",
  "Bahia",
  "Ceará",
  "Distrito Federal",
  "Espírito Santo",
  "Goiás",
  "Maranhão",
  "Mato Grosso",
  "Mato Grosso do Sul",
  "Minas Gerais",
  "Pará",
  "Paraíba",
  "Paraná",
  "Pernambuco",
  "Piauí",
  "Rio de Janeiro",
  "Rio Grande do Norte",
  "Rio Grande do Sul",
  "Rondônia",
  "Roraima",
  "Santa Catarina",
  "São Paulo",
  "Sergipe",
  "Tocantins",
];

interface LocalizacaoInputProps {
  pais: string;
  setPais: (value: string) => void;
  estado: string | null;
  setEstado: (value: string | null) => void;
  cidade: string | null;
  setCidade: (value: string | null) => void;
}

const LocalizacaoInput: React.FC<LocalizacaoInputProps> = ({
  pais,
  setPais,
  estado,
  setEstado,
  cidade,
  setCidade,
}) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const isBrazil = useMemo(() => {
    if (!pais || typeof pais !== "string") return false;
    const paisNormalized = pais.toLowerCase().trim();
    return paisNormalized === "brasil" || paisNormalized === "brazil";
  }, [pais]);

  const handlePaisChange = useCallback(
    (value: string) => {
      setPais(value);

      const newValue = value.toLowerCase().trim();
      const isNewValueBrazil = newValue === "brasil" || newValue === "brazil";

      if (!isNewValueBrazil) {
        setEstado("");
        setCidade("");
      }
    },
    [setPais, setEstado, setCidade],
  );

  const handleSelectEstado = useCallback(
    (selectedEstado: string) => {
      setEstado(selectedEstado);
      setModalVisible(false);
    },
    [setEstado],
  );

  const renderEstadoItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        selectStyles.optionItem,
        estado === item && selectStyles.optionItemSelected,
      ]}
      onPress={() => handleSelectEstado(item)}
    >
      <Text
        style={[
          selectStyles.optionText,
          estado === item && selectStyles.optionTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={stylesCharacterization.containerResponses}>
      <View style={stylesCharacterization.containerQuestionInput}>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.location.sectionTitle")}{" "}
        </Text>
        <Text style={stylesCharacterization.questionText}>
          {t("questionnaire.characterization.location.country")}
        </Text>
        <TextInput
          style={stylesCharacterization.textInput}
          placeholder={t(
            "questionnaire.characterization.location.countryPlaceholder",
          )}
          placeholderTextColor="#999"
          value={pais}
          onChangeText={handlePaisChange}
        />
      </View>

      {isBrazil && (
        <View style={stylesCharacterization.containerQuestionInput}>
          <Text style={stylesCharacterization.questionText}>
            <Text>{t("questionnaire.characterization.location.state")}</Text>
          </Text>
          <TouchableOpacity
            style={[
              stylesCharacterization.textInput,
              selectStyles.selectButton,
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                selectStyles.selectButtonText,
                !estado && selectStyles.placeholderText,
              ]}
            >
              {estado ||
                t("questionnaire.characterization.location.statePlaceholder")}
            </Text>
            <Text style={selectStyles.arrow}>▼</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableOpacity
              style={selectStyles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            >
              <View style={selectStyles.modalContent}>
                <View style={selectStyles.modalHeader}>
                  <Text style={selectStyles.modalTitle}>
                    {t("questionnaire.characterization.location.state")}
                  </Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={selectStyles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={ESTADOS_BRASILEIROS}
                  keyExtractor={(item) => item}
                  renderItem={renderEstadoItem}
                  showsVerticalScrollIndicator={true}
                />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}

      {isBrazil && (
        <View style={stylesCharacterization.containerQuestionInput}>
          <Text style={stylesCharacterization.questionText}>
            <Text>{t("questionnaire.characterization.location.city")}</Text>
          </Text>
          <TextInput
            style={stylesCharacterization.textInput}
            placeholder={t(
              "questionnaire.characterization.location.cityPlaceholder",
            )}
            placeholderTextColor="#999"
            value={cidade || ""}
            onChangeText={setCidade}
          />
        </View>
      )}
    </View>
  );
};

const selectStyles = StyleSheet.create({
  selectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    color: "#000",
  },
  placeholderText: {
    color: "#999",
  },
  arrow: {
    fontSize: 12,
    color: "#999",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    fontSize: 20,
    color: "#666",
    padding: 4,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionItemSelected: {
    backgroundColor: "#e8f5e9",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    color: "#006f36",
    fontWeight: "600",
  },
});

export default LocalizacaoInput;
