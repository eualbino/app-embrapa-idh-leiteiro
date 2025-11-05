import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ptBR from './pt-BR/translation';
import en from './en/translation';
import es from './es/translation';

const LANGUAGE_STORAGE_KEY = '@app:language';

// Detecção do idioma do dispositivo
const getDeviceLanguage = () => {
  const locales = Localization.getLocales();
  
  if (locales.length === 0) {
    return 'pt-BR';
  }
  
  const languageCode = locales[0].languageCode;
  
  // Mapeia os códigos de idioma
  if (languageCode === 'pt') return 'pt-BR';
  if (languageCode === 'es') return 'es';
  if (languageCode === 'en') return 'en';
  
  return 'pt-BR';
};

// Recursos de tradução
const resources = {
  'pt-BR': ptBR,
  en: en,
  es: es,
};

// Inicialização do i18n
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
        escapeValue: false, // React já faz escape
      },
      
      react: {
        useSuspense: false,
      },
      
      // Cache para melhor performance
      cache: {
        enabled: true,
      },
    });
};

initI18n();

// Função para mudar o idioma
export const changeLanguage = async (language: string) => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Idiomas disponíveis
export const availableLanguages = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export default i18n;
