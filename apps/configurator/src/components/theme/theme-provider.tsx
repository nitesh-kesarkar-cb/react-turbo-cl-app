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
  resolvedTheme: Theme;
  setTheme: (t: Theme) => void;
};

function isTheme(value: string): value is Theme {
  return (
    value === ThemeEnum.Light ||
    value === ThemeEnum.Dark ||
    value === ThemeEnum.System
  );
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) || ThemeEnum.System;
    return isTheme(stored) ? stored : ThemeEnum.System;
  });

  // system preference listener
  const [systemDark, setSystemDark] = useState<boolean>(
    window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, []);

  let resolvedTheme: ThemeEnum;

  if (theme === ThemeEnum.System) {
    if (systemDark) {
      resolvedTheme = ThemeEnum.Dark;
    } else {
      resolvedTheme = ThemeEnum.Light;
    }
  } else {
    resolvedTheme = theme;
  }

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(ThemeEnum.Dark, resolvedTheme === ThemeEnum.Dark);
    root.style.colorScheme = resolvedTheme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, resolvedTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme: (t: Theme) => setTheme(t) }),
    [theme, resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
