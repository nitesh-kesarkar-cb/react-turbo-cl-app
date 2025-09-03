import { THEME_STORAGE_KEY } from "@/utils/constant";
import { Theme, ThemeEnum } from "./types";

/**
 * Sets the initial UI theme based on stored preference or (once) system default.
 * Only supports Light/Dark.
 */
export function setInitialTheme(): void {
  try {
    const validThemes: Theme[] = [ThemeEnum.Light, ThemeEnum.Dark];

    // Read and validate stored value (if any)
    let stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (!stored || !validThemes.includes(stored as Theme)) {
      stored = null;
    }

    // One-time system preference (used only if nothing stored)
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;

    const theme: Theme =
      (stored as Theme) ?? (prefersDark ? ThemeEnum.Dark : ThemeEnum.Light);

    // Apply to <html>
    const root = document.documentElement;
    root.classList.toggle(ThemeEnum.Dark, theme === ThemeEnum.Dark);
    root.style.colorScheme = theme;

    // (Optional) persist initial choice if nothing stored
    if (!stored) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch (error) {
    console.error("Theme initialization failed:", error);
    const root = document.documentElement;
    root.classList.remove(ThemeEnum.Dark);
    root.style.colorScheme = ThemeEnum.Light;
  }
}
