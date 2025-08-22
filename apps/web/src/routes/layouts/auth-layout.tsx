import { Navbar } from "@/components/navbar";
import { Outlet } from "@tanstack/react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-svh flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
