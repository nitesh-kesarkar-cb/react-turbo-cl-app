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
import { SidebarFooter } from "./sidebar";
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
    <aside className="w-72 border-r bg-background">
      {/* Make the inner container column + full height */}
      <div className="flex h-dvh flex-col">
        {/* Header / workspace switcher */}
        <div className="p-4">
          <button className="flex w-full items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background text-sm font-semibold">
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
        <div className="mt-auto p-4 border-t">
          <SidebarFooter>
            <NavUser user={data.user} />
          </SidebarFooter>
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
        "group flex items-center gap-3 rounded-2xl px-3 py-2 text-[15px] leading-none transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "bg-muted text-foreground"
          : "text-foreground hover:bg-muted/60"
      )}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "text-muted-foreground transition-colors",
          active && "text-foreground"
        )}
      >
        {icon}
      </span>
      <span className="font-medium">{children}</span>
    </a>
  );
}
