import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { createTranslationConfig,  DEFAULT_LANGUAGE_CODE } from "./types";
import { LANGUAGE_STORAGE_KEY } from "@/utils/constant";
import { setLocalStorageItem } from "@/contexts/useStorageContext";

const applyDir = (lng: string) => {
  const dir = i18n.dir(lng);
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lng);
};

i18n.use(initReactI18next).init((await createTranslationConfig()), () => {
    applyDir(i18n.language || DEFAULT_LANGUAGE_CODE);
});

i18n.on("languageChanged", (lng) => {
    applyDir(lng);
    setLocalStorageItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
