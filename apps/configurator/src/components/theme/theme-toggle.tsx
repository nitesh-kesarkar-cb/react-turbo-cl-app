import { Moon, Sun, Monitor } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button
} from "@repo/ui";
import { useTheme } from "./theme-provider";
import { ThemeEnum } from "./types";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme">
          {resolvedTheme === ThemeEnum.Dark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme(ThemeEnum.Light)}>
          <Sun className="mr-2 h-4 w-4" /> Light{" "}
          {theme === ThemeEnum.Light ? "✓" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeEnum.Dark)}>
          <Moon className="mr-2 h-4 w-4" /> Dark{" "}
          {theme === ThemeEnum.Dark ? "✓" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(ThemeEnum.System)}>
          <Monitor className="mr-2 h-4 w-4" /> System{" "}
          {theme === ThemeEnum.System ? "✓" : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
