import { SectionCards } from "@/components/dashboard/section-cards";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { ChartBarInteractive } from "@/components/dashboard/chart-bar-interactive";
import { ChartLineDotInteractive } from "@/components/dashboard/chart-line-dot-interactive";
import { ChartPieInteractive } from "@/components/dashboard/chart-pie-chart-interactive";
import { ChartRadialStackedInteractive } from "@/components/dashboard/chart-radial-stacked-interactive";
import SleepChart from "@/components/dashboard/chart-sleep-interactive";

export default function DashboardPage() {
  return (
    <div className="w-full max-w-xxl">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <SectionCards />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-4">
            <ChartAreaInteractive />
            <ChartLineDotInteractive />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 px-4">
            <ChartBarInteractive />
            <ChartPieInteractive />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            <SleepChart />
            <ChartRadialStackedInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
