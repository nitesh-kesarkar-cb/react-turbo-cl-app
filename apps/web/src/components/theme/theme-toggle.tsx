import { Moon, Sun } from "lucide-react";
import { Button } from "@repo/ui";
import { useTheme } from "./theme-provider";
import { ThemeEnum } from "./types";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() =>
        setTheme(
          resolvedTheme === ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark
        )
      }
      className="cursor-pointer"
    >
      {resolvedTheme === ThemeEnum.Dark ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  );
}
