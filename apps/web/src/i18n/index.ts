import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translationConfig } from "./types";
import { LANGUAGE_STORAGE_KEY } from "@/utils/constant";
import { setLocalStorageItem } from "@/contexts/useStorageContext";


const applyDir = (lng: string) => {
    const dir = i18n.dir(lng);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lng);
};

i18n.use(initReactI18next).init(translationConfig, () => {
    applyDir(i18n.language || "en");
});

i18n.on("languageChanged", (lng) => {
    applyDir(lng);
    setLocalStorageItem(LANGUAGE_STORAGE_KEY, lng);
});

export default i18n;
