import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationAR from './locales/ar.json'
import translationEN from './locales/en.json'
import translationFR from './locales/fr.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: translationAR },
      en: { translation: translationEN },
      fr: { translation: translationFR }
    },
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n