import { cn } from "@repo/ui/lib/utils";
import { useRouterState } from "@tanstack/react-router";
import {
  BellIcon,
  Building2Icon,
  FileIcon,
  LockIcon,
  RocketIcon,
  Settings,
  TicketIcon,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { SidebarFooter, SidebarProvider } from "./sidebar";
import { NavUser } from "./nav-user";
import * as React from "react";

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
  { label: "Tenants", route: "/tenants", icon: Building2Icon },
  { label: "Form Builder", route: "/form-builder", icon: FileIcon },
  { label: "Onboarding One", route: "/onboarding-one", icon: RocketIcon },
];

export function AppSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const [collapsed, setCollapsed] = React.useState(false);

  const data = {
    user: {
      name: "Nitesh Kesarkar",
      email: "nitesh@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  };

  return (
    <aside
      className={cn(
        "border-r bg-white dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Inner container full height */}
      <div className="flex h-dvh flex-col">
        {/* Header / workspace switcher */}
        <div className="flex items-center p-4">
          {!collapsed && (
            <button className="flex items-center rounded-xl p-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              <p className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                ⌘
              </p>
              <p className="text-base font-medium leading-none ml-2">
                Wellness Portal
              </p>
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-2 hover:bg-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-2 flex-1">
          <ul className="space-y-1 px-2">
            {menus.map(({ label, route, icon: Icon, isActive }) => {
              const active = isActive ?? pathname.startsWith(route);
              return (
                <li key={route}>
                  <SidebarItem
                    icon={<Icon className="h-5 w-5" />}
                    active={active}
                    href={route}
                    collapsed={collapsed}
                  >
                    {label}
                  </SidebarItem>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer fixed to bottom */}
        <div className="mt-auto">
          <SidebarProvider>
            <SidebarFooter>
              <NavUser user={data.user} collapsed={collapsed} />
            </SidebarFooter>
          </SidebarProvider>
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
  collapsed,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  active?: boolean;
  collapsed?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 text-[15px] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "bg-accent dark:bg-gray-600 text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        collapsed ? "justify-center" : "gap-3"
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
      {!collapsed && <span>{children}</span>}
    </a>
  );
}
