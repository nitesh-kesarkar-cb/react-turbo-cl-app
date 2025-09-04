import { SidebarProvider } from "../../components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-5 w-full bg-[#f7fafc]">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
