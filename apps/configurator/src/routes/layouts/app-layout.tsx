import { SidebarProvider } from "../../components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <div className="fixed left-0 top-0 h-screen w-55 z-20 bg-white border-r shadow-sm">
          <AppSidebar />
        </div>
        <main className="ml-50 flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
