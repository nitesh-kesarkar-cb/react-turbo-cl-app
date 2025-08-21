import React from "react";
import { useTranslation } from "react-i18next";
import { Language, languageNames } from "../i18n/types";

// shadcn/ui
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { LANGUAGE_STORAGE_KEY } from "@/utils/constant";

function normalizeLanguageCode(lang?: string): Language {
  if (!lang) return "en";
  const base = lang.split?.("-")?.[0];
  return (base || lang || "en") as Language;
}

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLang = normalizeLanguageCode(i18n.language);

  const handleChange = (code: string) => {
    const selectedLang = code as Language;
    i18n.changeLanguage(selectedLang);
    document.documentElement.lang = selectedLang;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLang);
    const dir = i18n.dir(selectedLang);
    document.documentElement.dir = dir;


  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative">
        <Globe
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 opacity-60"
          aria-hidden
        />
        <Select value={currentLang} onValueChange={handleChange}>
          <SelectTrigger
            id="language"
            aria-labelledby="language-label"
            className="w-48 pl-9"
          >
            <SelectValue placeholder={t("common.language_placeholder")} />
          </SelectTrigger>

          <SelectContent align="start" className="w-56">
            {Object.entries(languageNames).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelector;
