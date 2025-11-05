import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import { useQuestionnaireContext } from "@/src/contexts/QuestionnaireContext";
import { styles } from "./styles";

export const DatePicker: React.FC = () => {
  const { t } = useTranslation();
  const { date, showPicker, setDate, setShowPicker, formatDate } =
    useQuestionnaireContext();

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}

      <View style={styles.container}>
        <Text style={styles.label}>{t('questionnaire.questions.dateLabel')}</Text>

        <TouchableOpacity onPress={toggleDatePicker} style={styles.touchable}>
          <Text style={styles.text}>{formatDate(date)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
