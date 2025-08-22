import { type InitOptions } from "i18next";
import * as hindiLanguge from "./locales/hi.json";
import * as usElishLanguage from "./locales/en.json";
import * as chineseLanguage from "./locales/zh.json";
import * as cantoneseLanguage from "./locales/yue.json";
import * as arabicLanguage from "./locales/ar.json";
import { getLocalStorageItem } from "@/contexts/useStorageContext";
import { LANGUAGE_STORAGE_KEY } from "@/utils/constant";

export type Language = "en" | "hi" | "ar" | "zh" | "yue";

export const DEFAULT_LANGUAGE_CODE: Language = "en";

export const languages: Language[] = ["en", "hi", "ar", "zh", "yue"];

const savedLang =
  (getLocalStorageItem(LANGUAGE_STORAGE_KEY) as string) ||
  DEFAULT_LANGUAGE_CODE;

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const translationConfig: InitOptions = {
  resources: {
    en: usElishLanguage,
    hi: hindiLanguge,
    ar: arabicLanguage,
    zh: chineseLanguage,
    yue: cantoneseLanguage,
  },
  fallbackLng: DEFAULT_LANGUAGE_CODE,
  supportedLngs: languages,
  lng: savedLang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  defaultNS: "translation",
  detection: {
    order: ["cookie", "localStorage", "navigator", "htmlTag"],
    caches: ["cookie"],
    cookieMinutes: 60 * 24 * 30,
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  ar: "العربية",
  zh: "中文 (简体)",
  yue: "中文 (繁體, 粵語)",
};
