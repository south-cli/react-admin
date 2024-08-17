import { initReactI18next } from 'react-i18next';
import { getZhLang, getEnLang } from './utils/helper';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    },
    resources: {
      zh: {
        translation: getZhLang()
      },
      en: {
        translation: getEnLang()
      },
    }
  });

export default i18n;