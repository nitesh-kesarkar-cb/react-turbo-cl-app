import * as hindiLanguge from "./locales/hi.json";
import * as usElishLanguage from "./locales/en.json";
import * as arabicLanguage from "./locales/ar.json";

export type Language = "en" | "hi" | "ar";

export const DEFAULT_LANGUAGE_CODE: Language = "en";

export const languages: Language[] = ["en", "hi", "ar"];

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const translationConfig = {
  resources: {
    en: usElishLanguage,
    hi: hindiLanguge,
    ar: arabicLanguage,
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  supportedLngs: languages,
  lng: DEFAULT_LANGUAGE_CODE, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  defaultNS: "translation",
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  ar: "العربية",
};
