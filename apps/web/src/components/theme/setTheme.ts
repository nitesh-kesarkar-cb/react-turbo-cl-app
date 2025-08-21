import { THEME_STORAGE_KEY } from "@/utils/constant";
import { Theme, ThemeEnum } from "./types";

/**
 * Sets the initial UI theme based on stored preference or system default.
 */
export function setInitialTheme(): void {
  try {
    const validThemes: Theme[] = [
      ThemeEnum.Light,
      ThemeEnum.Dark,
      ThemeEnum.System,
    ];

    // Get stored theme and validate
    let stored: string | null = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored || !validThemes.includes(stored as Theme)) {
      stored = null;
    }

    // Check system-level dark mode
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Explicitly determine theme
    let theme;
    if (stored === ThemeEnum.Light || stored === ThemeEnum.Dark) {
      theme = stored as Theme;
    } else if (systemDark) {
      theme = ThemeEnum.Dark;
    } else {
      theme = ThemeEnum.Light;
    }

    // Apply theme to root element
    const root = document.documentElement;
    root.classList.toggle(ThemeEnum.Dark, theme === ThemeEnum.Dark);
    root.style.colorScheme = theme;
  } catch (error) {
    console.error("Theme initialization failed:", error);
    const root = document.documentElement;
    root.classList.remove(ThemeEnum.Dark);
    root.style.colorScheme = ThemeEnum.Light;
  }
}
