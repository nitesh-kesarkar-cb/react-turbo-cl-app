import { StatCard, type StatCardProps } from "./stat-card";

export function SectionCards() {
  const items: StatCardProps[] = [
    {
      description: "Total Revenue",
      value: "$1,250.00",
      trend: "up",
      trendText: "+12.5%",
      footMain: "Trending up this month",
      footSecondary: "Visitors for the last 6 months",
    },
    {
      description: "New Customers",
      value: "1,234",
      trend: "down",
      trendText: "-20%",
      footMain: "Down 20% this period",
      footSecondary: "Acquisition needs attention",
    },
    {
      description: "Active Accounts",
      value: "45,678",
      trend: "up",
      trendText: "+12.5%",
      footMain: "Strong user retention",
      footSecondary: "Engagement exceeds targets",
    },
    {
      description: "Growth Rate",
      value: "4.5%",
      trend: "up",
      trendText: "+4.5%",
      footMain: "Steady performance increase",
      footSecondary: "Meets growth projections",
    },
  ];

  return (
    <div
      className="grid grid-cols-4
      gap-4 px-4 lg:px-6
      *:data-[slot=card]:bg-gradient-to-t
      *:data-[slot=card]:from-primary/5
      *:data-[slot=card]:to-card
      *:data-[slot=card]:shadow-xs
      dark:*:data-[slot=card]:bg-card"
    >
      {items.map((item) => (
        <StatCard key={item.description} {...item} />
      ))}
    </div>
  );
}
