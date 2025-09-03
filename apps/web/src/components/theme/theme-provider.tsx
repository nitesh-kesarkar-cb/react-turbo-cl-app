import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Theme, ThemeEnum } from "./types";
import { THEME_STORAGE_KEY } from "@/utils/constant";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: Theme; // keep this for minimal impact; it's equal to theme now
  setTheme: (t: Theme) => void;
};

function isTheme(value: string): value is Theme {
  return value === ThemeEnum.Light || value === ThemeEnum.Dark;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isTheme(stored)) return stored as Theme;

    // No stored theme? Respect initial system preference once, then persist.
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    return prefersDark ? ThemeEnum.Dark : ThemeEnum.Light;
  });

  // resolvedTheme is simply theme now (no "system" mode)
  const resolvedTheme: Theme = theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(ThemeEnum.Dark, theme === ThemeEnum.Dark);
    root.style.colorScheme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
