import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector) // Работает и на клиенте, и на сервере, но может быть отключен вручную при необходимости
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      defaultNS: 'translation',
      ns: ['translation'],
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;