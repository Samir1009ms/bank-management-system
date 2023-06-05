import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './components/translate/locales/en.json'
import azTranslation from './components/translate/locales/az.json'

const resources = {
    en: {
        translation: enTranslation,
    },
    az: {
        translation: azTranslation,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
