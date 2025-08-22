import { Navbar } from "@/components/navbar";
import { Outlet } from "@tanstack/react-router";

export default function AppLayout() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      {/* Let pages control their own width/padding */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
