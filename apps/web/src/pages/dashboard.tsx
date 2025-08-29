import { SectionCards } from "@/components/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { ChartBarInteractive } from "@/components/dashboard/chart-bar-interactive";
import { ChartLineDotInteractive } from "@/components/dashboard/chart-line-dot-interactive";
import { ChartPieInteractive } from "@/components/dashboard/chart-pie-chart-interactive";
import { ChartRadialStackedInteractive } from "@/components/dashboard/chart-radial-stacked-interactive";
import SleepChart from "@/components/dashboard/chart-sleep-interactive";
import { useAuth } from "@/contexts/auth/AuthContext";
import { FEATURES, PERMISSIONS, ROLES } from "@/contexts/auth/auth.types";

export default function DashboardPage() {
  const { hasRole, hasPermission, hasFeature } = useAuth();

  console.log("hasRole(ROLES.SUPER_ADMIN)", hasRole(ROLES.SUPER_ADMIN));
  console.log(
    "hasPermission(PERMISSIONS.READ)",
    hasPermission(PERMISSIONS.READ)
  );
  console.log("hasFeature(FEATURES.BILLING)", hasFeature(FEATURES.BILLING));

  return (
    <div className="w-full max-w-xxl">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <SectionCards />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6">
            <ChartAreaInteractive />
            <ChartLineDotInteractive />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-6">
            <ChartBarInteractive />
            <ChartPieInteractive />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
            <SleepChart />
            <ChartRadialStackedInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
