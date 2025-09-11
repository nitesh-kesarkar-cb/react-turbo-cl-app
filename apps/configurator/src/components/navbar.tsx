import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@repo/ui/components/navigation-menu";
import { Button } from "@repo/ui/components/button";
import { LogIn, User } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";
import { useLocation } from "@tanstack/react-router";
import { H2 } from "@repo/ui/components/heading";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

export function Navbar({
  user,
  ...props
}: Readonly<React.HTMLProps<HTMLElement> & { user?: User }>) {
  const location = useLocation();

  const handleLogin = (e?: React.MouseEvent) => {
    e?.preventDefault();
    // 👉 trigger login flow here
  };

  // Simple page title from pathname
  const pageTitle =
    location.pathname === "/"
      ? "Home"
      : location.pathname.slice(1).charAt(0).toUpperCase() +
      location.pathname.slice(2).replace(/-/g, " ");

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur" {...props}>
      <div className="flex h-14 items-center px-6">
        {/* LEFT: Page Title */}
        <H2 className="text-lg font-semibold">{pageTitle}</H2>

        {/* RIGHT: nav + user + theme */}
        <div className="ml-auto flex items-center gap-4">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList>
              {!user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLogin}
                      className="flex items-center gap-2"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <div className="flex flex-row items-center gap-2 px-2 py-1">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-7 w-7 rounded-full border"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {user.name}
                      </span>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white"
                  id="portal-dropdown"
                >
                  <User className="w-4 h-4" />
                  Portal
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>B2C Portal</DropdownMenuItem>
                <DropdownMenuItem>Enterprise Portal</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

