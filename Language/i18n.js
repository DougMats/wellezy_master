import i18next from 'i18next';
import English from './English.json';
import Spanish from './Spanish.json';
import Russian from './Russian.json';
import Italian from './Italian.json';
import Portuges from './Portuges.json';
import French from './French.json';

import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: English,
    es: Spanish,
    ru: Russian,
    it: Italian,
    pr: Portuges,
    fr: French
  },
  react: {
    useSuspense: false
  }
})
export default i18next;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-xhr-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';


// i18n
//   .use(Backend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: 'en',
//     debug: true,

//     interpolation: {
//       escapeValue: false,
//     }
//   });
// export default i18n;