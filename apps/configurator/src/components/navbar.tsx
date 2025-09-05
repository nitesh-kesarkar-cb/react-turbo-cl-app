
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
 
} from "@repo/ui/components/navigation-menu";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import {  LogIn } from "lucide-react";
import { ThemeToggle } from "./theme/theme-toggle";

export function Navbar({ ...props }: Readonly<React.HTMLProps<HTMLElement>>) {


  const handleLogin = (e?: React.MouseEvent) => {
    e?.preventDefault();
  };

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur"
      {...props}
    >
      <div className="w-full flex h-14 items-center gap-3 px-4">
        

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-6 sm:block"
        />

        {/* Navigation (top-level links styled like triggers) */}
        <NavigationMenu className="max-w-none">
          <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Button>
                    <span className="inline-flex items-center gap-2" onClick={handleLogin}>
                      <LogIn className="h-4 w-4" />
                      Login
                    </span>
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            

          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
