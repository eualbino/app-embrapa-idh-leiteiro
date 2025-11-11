import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { availableLanguages, changeLanguage } from '@/src/locales/i18n';
import { theme } from '@/src/config';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleChangeLanguage = async (languageCode: string) => {
    await changeLanguage(languageCode);
  };

  return (
    <View style={styles.container}>
      {availableLanguages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={[
            styles.languageButton,
            currentLanguage === language.code && styles.activeLanguageButton,
          ]}
          onPress={() => handleChangeLanguage(language.code)}
        >
          <Text style={styles.flag}>{language.flag}</Text>
          <Text
            style={[
              styles.languageName,
              currentLanguage === language.code && styles.activeLanguageName,
            ]}
          >
            {language.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginVertical: theme.spacing.md,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borders.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.background.default,
    gap: theme.spacing.xxs,
  },
  activeLanguageButton: {
    borderColor: theme.colors.primary.default,
    backgroundColor: theme.colors.primary.light,
  },
  flag: {
    fontSize: theme.typography.sizes.lg,
  },
  languageName: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.text.primary,
  },
  activeLanguageName: {
    color: theme.colors.text.inverse,
    fontWeight: theme.typography.weights.bold,
  },
});
