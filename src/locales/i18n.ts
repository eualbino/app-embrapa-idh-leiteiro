import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ptBR from './pt-BR/translation';
import en from './en/translation';
import es from './es/translation';

const LANGUAGE_STORAGE_KEY = '@app:language';

const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  
  if (locales.length === 0) {
    return 'pt-BR';
  }
  
  const languageCode = locales[0].languageCode;

  if (languageCode === 'pt') return 'pt-BR';
  if (languageCode === 'es') return 'es';
  if (languageCode === 'en') return 'en';
  
  return 'pt-BR';
};

const resources = {
  'pt-BR': ptBR,
  en: en,
  es: es,
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  
  if (!savedLanguage) {
    savedLanguage = getDeviceLanguage();
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, savedLanguage);
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: savedLanguage,
      fallbackLng: 'pt-BR',
      compatibilityJSON: 'v4',
      
      interpolation: {
        escapeValue: false,
      },
      
      react: {
        useSuspense: false,
      },

      cache: {
        enabled: true,
      },
    });
};

initI18n();

export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const availableLanguages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default i18n;
