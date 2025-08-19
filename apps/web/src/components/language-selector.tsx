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
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLang = ((i18n.language?.split?.("-")?.[0] ?? i18n.language) ||
    "en") as Language;

  const handleChange = (code: string) => {
    const selectedLang = code as Language;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("i18nextLng", selectedLang);
    document.documentElement.lang = selectedLang;
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* <Label
        id="language-label"
        htmlFor="language"
        className="whitespace-nowrap text-sm text-muted-foreground"
      >
        {t("common.language_label")}
      </Label> */}

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
