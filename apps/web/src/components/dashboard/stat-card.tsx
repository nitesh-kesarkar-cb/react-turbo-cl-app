import * as React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trend, TrendBadge, TrendLine } from "./trend";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  description: string;
  value: React.ReactNode; // string | number | node
  trend: Trend; // "up" | "down" | "neutral"
  trendText: string; // e.g. "+12.5%" or "-20%"
  footMain: React.ReactNode; // main footer line (with icon appended)
  footSecondary: React.ReactNode; // secondary footer line
  className?: string;
};

export function StatCard({
  description,
  value,
  trend,
  trendText,
  footMain,
  footSecondary,
  className,
}: Readonly<StatCardProps>) {
  return (
    <Card className={cn("@container/card", className)}>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <TrendBadge trend={trend} text={trendText} />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <TrendLine trend={trend}>{footMain}</TrendLine>
        <div className="text-muted-foreground">{footSecondary}</div>
      </CardFooter>
    </Card>
  );
}
