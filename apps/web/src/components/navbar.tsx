import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "./language-selector";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, LogIn, LogOut, MapIcon } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import { MOCK_API_TIMEOUT } from "@/utils/constant";

export function Navbar({ ...props }: Readonly<React.HTMLProps<HTMLElement>>) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    logout();
    setTimeout(() => navigate({ to: "/login" }), MOCK_API_TIMEOUT);
  };

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur"
      {...props}
    >
      <div className="w-full flex h-14 items-center gap-3 px-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-base font-semibold hover:opacity-90"
          aria-label={t("common.appName")}
        >
          {t("common.appName")}
        </Link>

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-6 sm:block"
        />

        {/* Navigation (top-level links styled like triggers) */}
        <NavigationMenu className="max-w-none">
          <NavigationMenuList>
            {!isLoggedIn ? (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/login" activeProps={{ className: "bg-muted" }}>
                    <span className="inline-flex items-center gap-2">
                      <LogIn className="h-4 w-4" />
                      {t("nav.login")}
                    </span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link
                      to="/dashboard"
                      activeProps={{ className: "bg-muted" }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        {t("nav.dashboard")}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/map" activeProps={{ className: "bg-muted" }}>
                      <span className="inline-flex items-center gap-2">
                        <MapIcon className="h-4 w-4" />
                        {t("nav.map")}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left bg-transparent border-0 p-0 m-0 cursor-pointer"
                    >
                      <span className="inline-flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        {t("nav.logout")}
                      </span>
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
