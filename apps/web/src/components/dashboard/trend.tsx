import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

export type Trend = "up" | "down" | "neutral";

export function TrendIcon({
  trend,
  className = "size-4",
}: Readonly<{
  trend: Trend;
  className?: string;
}>) {
  if (trend === "down") return <IconTrendingDown className={className} />;
  if (trend === "up") return <IconTrendingUp className={className} />;
  // neutral: pick one or render nothing; using up by default
  return <IconTrendingUp className={className} />;
}

export function TrendBadge({
  trend,
  text,
}: Readonly<{ trend: Trend; text: string }>) {
  return (
    <Badge variant="default">
      <TrendIcon trend={trend} />
      <span className="ml-1">{text}</span>
    </Badge>
  );
}

export function TrendLine({
  trend,
  children,
}: React.PropsWithChildren<{ trend: Trend }>) {
  return (
    <div className="line-clamp-1 flex gap-2 font-medium">
      {children}
      <TrendIcon trend={trend} className="size-4" />
    </div>
  );
}
