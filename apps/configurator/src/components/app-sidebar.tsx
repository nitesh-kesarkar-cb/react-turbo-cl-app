import { cn } from "@repo/ui/lib/utils";
import { useRouterState } from "@tanstack/react-router";
import {
  BellIcon,
  LockIcon,
  RocketIcon,
  Settings,
  TicketIcon,
  type LucideIcon,
} from "lucide-react";
import { SidebarFooter, SidebarProvider } from "./sidebar";
import { NavUser } from "./nav-user";

type MenuItem = {
  label: string;
  route: string;
  isActive?: boolean;
  icon: LucideIcon;
};

const menus: MenuItem[] = [
  { label: "Score Engine", route: "/score-engine", icon: Settings },
  { label: "Notifications", route: "/notifications", icon: BellIcon },
  { label: "Onboarding", route: "/onboarding", icon: RocketIcon },
  { label: "White Label", route: "/white-label", icon: TicketIcon },
  { label: "Access Control", route: "/access-control", icon: LockIcon },
];

export function AppSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const data = {
    user: {
      name: "Nitesh Kesarkar",
      email: "nitesh@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  };

  return (
    <aside className="w-56 border-r bg-white">
      {/* Inner container full height */}
      <div className="flex h-dvh flex-col">
        {/* Header / workspace switcher */}
        <div className="p-4">
          <button className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
              ⌘
            </div>
            <div className="flex-1 text-left">
              <div className="text-base font-medium leading-none">
                Wellness Portal
              </div>
            </div>
          </button>

          {/* Nav */}
          <nav className="mt-6">
            <ul className="space-y-1">
              {menus.map(({ label, route, icon: Icon, isActive }) => {
                const active = isActive ?? pathname.startsWith(route);
                return (
                  <li key={route}>
                    <SidebarItem
                      icon={<Icon className="h-5 w-5" />}
                      active={active}
                      href={route}
                    >
                      {label}
                    </SidebarItem>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer fixed to bottom */}
        <div className="mt-auto">
          <SidebarProvider><SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter> </SidebarProvider>

        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  icon,
  children,
  href,
  active,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "flex items-center",
          active ? "text-accent-foreground" : "text-muted-foreground"
        )}
      >
        {icon}
      </span>
      <span>{children}</span>
    </a>
  );
}
