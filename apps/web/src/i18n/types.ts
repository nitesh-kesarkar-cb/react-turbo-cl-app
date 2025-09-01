import { type InitOptions } from "i18next";
import { getLocalStorageItem } from "@/contexts/useStorageContext";
import { LANGUAGE_STORAGE_KEY } from "@/utils/constant";

export type Language = "en" | "hi" | "ar" | "zh" | "yue";

export const DEFAULT_LANGUAGE_CODE: Language = "en";

export const languages: Language[] = ["en", "hi", "ar", "zh", "yue"];

const savedLang = (getLocalStorageItem(LANGUAGE_STORAGE_KEY) as Language) || DEFAULT_LANGUAGE_CODE;

// Define the namespaces used in translations folder
const namespaces = ["auth"] as const;

type Namespace = (typeof namespaces)[number];

// generates like { en: { common: {...}, auth: {...}, map: {...} }, hi: {...}, ... }
export const loadResources = async (): Promise<Record<Language, Record<Namespace, any>>> => {
  const resources: Record<Language, Record<Namespace, any>> = {} as Record<Language, Record<Namespace, any>>;
  for (const lang of languages) {
    resources[lang] = {} as Record<Namespace, any>;
    for (const ns of namespaces) {
      resources[lang][ns] = (await import(`./locales/${lang}/${ns}.json`)).default;
    }
  }
  return resources;
};

// Use this function to asynchronously create the translation config
export const createTranslationConfig = async (): Promise<InitOptions> => {
  const resources = await loadResources();
  return {
    resources,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    supportedLngs: languages,
    lng: savedLang,
    interpolation: {
      escapeValue: false,
    },
    ns: namespaces,
    defaultNS: "auth"
  };
};

export const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  ar: "العربية",
  zh: "中文 (简体)",
  yue: "中文 (繁體, 粵語)",
};
