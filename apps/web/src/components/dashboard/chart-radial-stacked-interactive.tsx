"use client";

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "A radial chart with stacked sections";

const chartData = [
  {
    month: "january",
    desktop: 154,
    mobile: 297,
    tablet: 244,
    tabletLarge: 121,
    tabletSmall: 118,
    tv: 82,
    console: 345,
    wearable: 309,
    smartSpeaker: 192,
    car: 118,
    kiosk: 98,
    other: 91,
  },
  {
    month: "february",
    desktop: 151,
    mobile: 304,
    tablet: 248,
    tabletLarge: 123,
    tabletSmall: 121,
    tv: 80,
    console: 349,
    wearable: 305,
    smartSpeaker: 194,
    car: 121,
    kiosk: 101,
    other: 93,
  },
  {
    month: "march",
    desktop: 159,
    mobile: 309,
    tablet: 252,
    tabletLarge: 126,
    tabletSmall: 124,
    tv: 84,
    console: 358,
    wearable: 316,
    smartSpeaker: 196,
    car: 124,
    kiosk: 102,
    other: 95,
  },
  {
    month: "april",
    desktop: 153,
    mobile: 299,
    tablet: 241,
    tabletLarge: 122,
    tabletSmall: 120,
    tv: 79,
    console: 340,
    wearable: 301,
    smartSpeaker: 189,
    car: 122,
    kiosk: 100,
    other: 90,
  },
  {
    month: "may",
    desktop: 160,
    mobile: 318,
    tablet: 255,
    tabletLarge: 127,
    tabletSmall: 126,
    tv: 85,
    console: 362,
    wearable: 322,
    smartSpeaker: 201,
    car: 127,
    kiosk: 107,
    other: 96,
  },
  {
    month: "june",
    desktop: 148,
    mobile: 289,
    tablet: 236,
    tabletLarge: 117,
    tabletSmall: 115,
    tv: 77,
    console: 332,
    wearable: 296,
    smartSpeaker: 185,
    car: 117,
    kiosk: 98,
    other: 88,
  },
  {
    month: "july",
    desktop: 161,
    mobile: 321,
    tablet: 258,
    tabletLarge: 129,
    tabletSmall: 128,
    tv: 86,
    console: 366,
    wearable: 324,
    smartSpeaker: 203,
    car: 129,
    kiosk: 108,
    other: 97,
  },
  {
    month: "august",
    desktop: 157,
    mobile: 314,
    tablet: 249,
    tabletLarge: 125,
    tabletSmall: 123,
    tv: 83,
    console: 353,
    wearable: 313,
    smartSpeaker: 197,
    car: 125,
    kiosk: 104,
    other: 94,
  },
  {
    month: "september",
    desktop: 149,
    mobile: 296,
    tablet: 238,
    tabletLarge: 119,
    tabletSmall: 117,
    tv: 79,
    console: 336,
    wearable: 298,
    smartSpeaker: 186,
    car: 119,
    kiosk: 99,
    other: 89,
  },
  {
    month: "october",
    desktop: 155,
    mobile: 305,
    tablet: 246,
    tabletLarge: 123,
    tabletSmall: 122,
    tv: 81,
    console: 346,
    wearable: 307,
    smartSpeaker: 191,
    car: 123,
    kiosk: 102,
    other: 92,
  },
  {
    month: "november",
    desktop: 152,
    mobile: 299,
    tablet: 240,
    tabletLarge: 120,
    tabletSmall: 119,
    tv: 80,
    console: 341,
    wearable: 302,
    smartSpeaker: 188,
    car: 121,
    kiosk: 100,
    other: 90,
  },
  {
    month: "december",
    desktop: 158,
    mobile: 310,
    tablet: 251,
    tabletLarge: 126,
    tabletSmall: 125,
    tv: 84,
    console: 355,
    wearable: 315,
    smartSpeaker: 198,
    car: 126,
    kiosk: 105,
    other: 95,
  },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  tablet: { label: "Tablet", color: "var(--chart-3)" },
  tabletLarge: { label: "Tablet (Large)", color: "var(--chart-4)" },
  tabletSmall: { label: "Tablet (Small)", color: "var(--chart-5)" },
  tv: { label: "TV", color: "var(--chart-6)" },
  console: { label: "Console", color: "var(--chart-7)" },
  wearable: { label: "Wearable", color: "var(--chart-8)" },
  smartSpeaker: { label: "Smart Speaker", color: "var(--chart-9)" },
  car: { label: "Car", color: "var(--chart-10)" },
} satisfies ChartConfig;

const seriesKeys = [
  "desktop",
  "mobile",
  "tablet",
  "tabletLarge",
  "tabletSmall",
  "tv",
  "console",
  "wearable",
  "smartSpeaker",
  "car",
] as const;

export function ChartRadialStackedInteractive() {
  // sum all series in the first (and only) row
  // derive months from data & wire active month
  const months = useMemo(() => chartData.map((d) => d.month), []);
  const [activeMonth, setActiveMonth] = useState<string>(months[0] ?? "");

  // slice data for the selected month (RadialBarChart expects a row with series columns)
  const dataForMonth = useMemo(
    () => chartData.filter((d) => d.month === activeMonth),
    [activeMonth]
  );

  // total for label in the center
  const totalVisitors = React.useMemo(
    () =>
      seriesKeys.reduce((sum, key) => sum + (dataForMonth[0]?.[key] ?? 0), 0),
    [dataForMonth]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl z-50">
            {months.map((m) => (
              <SelectItem key={m} value={m} className="rounded-lg">
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={dataForMonth}
            startAngle={210} // where to begin (e.g., left side)
            endAngle={-30} // where to end (clockwise from start)
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <PolarRadiusAxis
              tick={false}
              tickLine={false}
              axisLine={false}
              tickFormatter={(m) => m.charAt(0).toUpperCase() + m.slice(1)}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>

            {/* Render a stacked radial bar for each series */}
            {seriesKeys.map((key) => (
              <RadialBar
                key={key}
                dataKey={key}
                stackId="a"
                cornerRadius={5}
                fill={`var(--color-${key})`}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
