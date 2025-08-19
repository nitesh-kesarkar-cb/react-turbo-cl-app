import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "./language-selector";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// icons (optional)
import {
  LayoutDashboard,
  Map,
  LogIn,
  LogOut,
  ShieldX,
  FileSearch2,
} from "lucide-react";

export function Navbar({ ...props }: Readonly<React.HTMLProps<HTMLElement>>) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    // ensure context clears before routing
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 0);
  };

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur"
      {...props}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        {/* Brand */}
        <Button asChild variant="link" className="px-0 text-base font-semibold">
          <Link to="/">{t("common.appName")}</Link>
        </Button>

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-6 sm:block"
        />

        {/* Left nav links */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {!isLoggedIn && (
            <>
              <Button asChild variant="ghost" size="sm" className="bg-muted">
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("nav.login")}
                </Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="bg-muted">
                <Link to="/forget-password">{t("nav.forgotPassword")}</Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="bg-muted">
                <Link to="/reset-password">{t("nav.resetPassword")}</Link>
              </Button>
            </>
          )}

          {isLoggedIn && (
            <>
              <Button asChild variant="ghost" size="sm" className="bg-muted">
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  {t("nav.dashboard")}
                </Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="bg-muted">
                <Link to="/map">
                  <Map className="mr-2 h-4 w-4" />
                  {t("nav.map")}
                </Link>
              </Button>
            </>
          )}

          <Button asChild variant="ghost" size="sm" className="bg-muted">
            <Link to="/no-access">
              <ShieldX className="mr-2 h-4 w-4" />
              {t("nav.noAccess")}
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="bg-muted">
            <Link to="/page-not-found">
              <FileSearch2 className="mr-2 h-4 w-4" />
              {t("nav.notFound")}
            </Link>
          </Button>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <LanguageSelector />

          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t("nav.logout")}
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
