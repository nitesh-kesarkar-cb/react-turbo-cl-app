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
import {
  LayoutDashboard,
  Map as MapIcon,
  LogIn,
  LogOut,
  ShieldX,
  FileSearch2,
} from "lucide-react";

export function Navbar({ ...props }: Readonly<React.HTMLProps<HTMLElement>>) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = (e?: React.MouseEvent) => {
    e?.preventDefault();
    logout();
    setTimeout(() => navigate({ to: "/login" }), 0);
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
                    <a href="#" onClick={handleLogout}>
                      <span className="inline-flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        {t("nav.logout")}
                      </span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
