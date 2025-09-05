import { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/card"; // shadcn/ui
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Layer,
  Customized,
} from "recharts";

export type SleepStage = "awake" | "rem" | "light" | "deep";

export interface SleepSegment {
  stage: SleepStage;
  start: string;
  end: string;
}

type TipState = {
  show: boolean;
  x: number;
  yTop: number;
  rectHeight: number;
  seg?: SleepSegment;
};

const STAGE_STYLES: Record<
  SleepStage,
  { label: string; color: string; laneIndex: number; height: number }
> = {
  awake: { label: "Awake", color: "#C6891A", laneIndex: 3, height: 0.45 },
  rem: { label: "REM", color: "#9B7000", laneIndex: 2, height: 0.65 },
  light: { label: "Light", color: "#7A5CF0", laneIndex: 1, height: 0.65 },
  deep: { label: "Deep", color: "#000000", laneIndex: 0, height: 0.65 },
};

/** Utility helpers */
const toMs = (iso: string) => new Date(iso).getTime();

function formatTick(ts: number) {
  const d = new Date(ts);
  let hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const mm = minutes.toString().padStart(2, "0");
  return `${hours}:${mm} ${ampm}`;
}

function msToHM(ms: number) {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  const hh = h > 0 ? `${h}h` : "";
  const mm = `${m}m`;
  return [hh, mm].filter(Boolean).join(" ");
}

/**
 * Compute aggregate durations and vertical connector times.
 */
function useComputed(segments: SleepSegment[]) {
  const bounds = useMemo(() => {
    const min = Math.min(...segments.map((s) => toMs(s.start)));
    const max = Math.max(...segments.map((s) => toMs(s.end)));
    return { min, max };
  }, [segments]);

  const perStage = useMemo(() => {
    const map = new Map<SleepStage, number>([
      ["awake", 0],
      ["rem", 0],
      ["light", 0],
      ["deep", 0],
    ]);
    for (const s of segments) {
      map.set(s.stage, (map.get(s.stage) || 0) + (toMs(s.end) - toMs(s.start)));
    }
    return map;
  }, [segments]);

  const connectors = useMemo(() => {
    // Vertical dashed lines at every segment boundary
    const tset = new Set<number>();
    for (const s of segments) {
      tset.add(toMs(s.start));
      tset.add(toMs(s.end));
    }
    return Array.from(tset).sort((a, b) => a - b);
  }, [segments]);

  return { bounds, perStage, connectors };
}

/**
 * Demo data roughly matching the screenshot
 */
const DEMO: SleepSegment[] = [
  {
    stage: "light",
    start: "2025-08-20T23:00:00",
    end: "2025-08-20T23:30:00",
  },
  {
    stage: "deep",
    start: "2025-08-20T23:30:00",
    end: "2025-08-21T00:15:00",
  },
  {
    stage: "light",
    start: "2025-08-21T00:15:00",
    end: "2025-08-21T01:00:00",
  },
  {
    stage: "rem",
    start: "2025-08-21T01:00:00",
    end: "2025-08-21T01:45:00",
  },
  {
    stage: "awake",
    start: "2025-08-21T01:45:00",
    end: "2025-08-21T01:55:00",
  },
  {
    stage: "light",
    start: "2025-08-21T01:55:00",
    end: "2025-08-21T02:30:00",
  },
  {
    stage: "deep",
    start: "2025-08-21T02:30:00",
    end: "2025-08-21T03:10:00",
  },
  {
    stage: "light",
    start: "2025-08-21T03:10:00",
    end: "2025-08-21T04:00:00",
  },
  {
    stage: "rem",
    start: "2025-08-21T04:00:00",
    end: "2025-08-21T04:45:00",
  },
  {
    stage: "awake",
    start: "2025-08-21T04:45:00",
    end: "2025-08-21T04:50:00",
  },
  {
    stage: "light",
    start: "2025-08-21T04:50:00",
    end: "2025-08-21T05:30:00",
  },
  {
    stage: "deep",
    start: "2025-08-21T05:30:00",
    end: "2025-08-21T06:00:00",
  },
  {
    stage: "light",
    start: "2025-08-21T06:00:00",
    end: "2025-08-21T07:00:00",
  },
  {
    stage: "rem",
    start: "2025-08-21T07:00:00",
    end: "2025-08-21T07:30:00",
  },
  {
    stage: "awake",
    start: "2025-08-21T07:30:00",
    end: "2025-08-21T07:45:00",
  },
];

export type SleepChartProps = {
  segments?: SleepSegment[];
  /** override chart height */
  height?: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const SleepChart: FC<SleepChartProps> = ({ segments = DEMO, height = 220 }) => {
  const [tip, setTip] = useState<TipState>({
    show: false,
    x: 0,
    yTop: 0,
    rectHeight: 0,
  });
  const [tipPos, setTipPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const { bounds, perStage } = useComputed(segments);

  useLayoutEffect(() => {
    if (!tip.show || !containerRef.current || !tipRef.current) return;

    const containerBox = containerRef.current.getBoundingClientRect();
    const tipBox = tipRef.current.getBoundingClientRect();

    const PADDING = 8;
    const GAP = 10;

    const containerW = containerBox.width;
    const containerH = containerBox.height;

    // center horizontally, then clamp
    let left = tip.x - tipBox.width / 2;
    left = clamp(left, PADDING, containerW - PADDING - tipBox.width);

    // prefer above the segment
    let top = tip.yTop - GAP - tipBox.height;

    // if not enough space above, flip below the segment
    if (top < PADDING) {
      top = tip.yTop + tip.rectHeight + GAP;
    }

    // final vertical clamp
    top = clamp(top, PADDING, containerH - PADDING - tipBox.height);

    setTipPos({ left, top });
  }, [tip]);

  // Data points for Recharts domain + ticks
  const data = useMemo(
    () => [
      { x: bounds.min },
      { x: Math.round(bounds.min + (bounds.max - bounds.min) / 2) },
      { x: bounds.max },
    ],
    [bounds.min, bounds.max]
  );

  // Generate 8 evenly spaced tick marks for a consistent axis split
  const step = (bounds.max - bounds.min) / 7;
  const ticks = Array.from({ length: 8 }, (_, i) => bounds.min + i * step);

  // For the Y domain we use 4 lanes [0..4]
  const yDomain: [number, number] = [0, 4];

  // Derived durations for labels
  const awakeDur = msToHM(perStage.get("awake") || 0);
  const remDur = msToHM(perStage.get("rem") || 0);
  const lightDur = msToHM(perStage.get("light") || 0);
  const deepDur = msToHM(perStage.get("deep") || 0);

  return (
    <Card className="w-full">
      <CardHeader className="pb-1">
        <CardTitle className="text-base font-semibold text-foreground/90">
          Sleep Stages
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-3 items-start">
          {/* Left: stage labels + durations */}
          <div className="text-xs select-none">
            <div className="flex items-center justify-between h-[42px]">
              <span className="text-foreground/80">Awake</span>
              <span className="text-foreground/60">{awakeDur}</span>
            </div>
            <div className="flex items-center justify-between h-[42px]">
              <span className="text-foreground/80">REM</span>
              <span className="text-foreground/60">{remDur}</span>
            </div>
            <div className="flex items-center justify-between h-[42px]">
              <span className="text-foreground/80">Light</span>
              <span className="text-foreground/60">{lightDur}</span>
            </div>
            <div className="flex items-center justify-between h-[42px]">
              <span className="text-foreground/80">Deep</span>
              <span className="text-foreground/60">{deepDur}</span>
            </div>
          </div>

          {/* Right: the chart */}
          <div
            ref={containerRef}
            className="relative rounded-md bg-muted/40 p-2"
          >
            <ResponsiveContainer width="100%" height={height}>
              <ComposedChart
                data={data}
                margin={{ top: 6, right: 6, left: 6, bottom: 20 }}
              >
                {/* X Axis */}
                <XAxis
                  dataKey="x"
                  type="number"
                  ticks={ticks}
                  domain={[bounds.min, bounds.max]}
                  tickFormatter={formatTick}
                  tick={{ fontSize: 11, fill: "currentColor" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                />

                {/* Hidden Y axis, we use numeric lanes [0..4] */}
                <YAxis type="number" domain={yDomain} hide />

                {/* Light lane separators (subtle) */}
                <Customized
                  component={(props: any) => {
                    const { xAxisMap, yAxisMap } = props;
                    const xKey = Object.keys(xAxisMap)[0];
                    const yKey = Object.keys(yAxisMap)[0];
                    const xScale = xAxisMap[xKey].scale;
                    const yScale = yAxisMap[yKey].scale;

                    return (
                      <Layer>
                        {/* Rounded stage rectangles */}
                        {segments.map((s, i) => {
                          const style = STAGE_STYLES[s.stage];

                          // --- lane math (domain is [0..4], each lane = 1 unit) ---
                          const laneTop = style.laneIndex;
                          const lanePad =
                            style.height < 1 ? (1 - style.height) / 2 : 0.17; // inner padding to get pill height
                          const y1 = laneTop + lanePad;
                          const y2 = laneTop + (1 - lanePad);

                          // --- time → pixel X ---
                          const t1 = new Date(s.start).getTime();
                          const t2 = new Date(s.end).getTime();
                          const x1 = xScale(t1);
                          const x2 = xScale(t2);
                          const pxX1 = Math.min(x1, x2);
                          const pxX2 = Math.max(x1, x2);
                          const widthPx = Math.max(0, pxX2 - pxX1);

                          // --- lane → pixel Y (SVG y grows downward) ---
                          const yPx1 = yScale(y1);
                          const yPx2 = yScale(y2);
                          const topPx = Math.min(yPx1, yPx2);
                          const botPx = Math.max(yPx1, yPx2);
                          const heightPx = Math.max(0, botPx - topPx);

                          // --- rounded corners radius (cap by size) ---
                          const r = Math.min(6, heightPx / 2, widthPx / 2);

                          // --- tooltip anchor (container coords need chart offsets) ---
                          const cx = (pxX1 + pxX2) / 2;
                          const leftOffset = props.offset?.left ?? 0;
                          const topOffset = props.offset?.top ?? 0;

                          return (
                            <rect
                              key={`seg-${i}`}
                              x={pxX1}
                              y={topPx}
                              width={widthPx}
                              height={heightPx}
                              rx={r}
                              ry={r}
                              fill={style.color}
                              // Tooltip events
                              onMouseEnter={() =>
                                setTip({
                                  show: true,
                                  x: leftOffset + cx,
                                  yTop: topOffset + topPx,
                                  rectHeight: heightPx,
                                  seg: s,
                                })
                              }
                              onMouseMove={() =>
                                setTip({
                                  show: true,
                                  x: leftOffset + cx,
                                  yTop: topOffset + topPx,
                                  rectHeight: heightPx,
                                  seg: s,
                                })
                              }
                              onMouseLeave={() =>
                                setTip((t) => ({ ...t, show: false }))
                              }
                            />
                          );
                        })}

                        {/* Handoff connectors between adjacent segments (only when stage changes) */}
                        {[...segments]
                          .sort(
                            (a, b) =>
                              new Date(a.start).getTime() -
                              new Date(b.start).getTime()
                          )
                          .map((s, i, arr) => {
                            if (i === arr.length - 1) return null;
                            const next = arr[i + 1];

                            const endT = new Date(s.end).getTime();
                            const startNextT = new Date(next.start).getTime();
                            if (endT !== startNextT) return null; // only draw at exact boundaries

                            const laneCenter = (stg: SleepStage) =>
                              STAGE_STYLES[stg].laneIndex + 0.5;
                            const x = xScale(endT);
                            const y1 = yScale(laneCenter(s.stage));
                            const y2 = yScale(laneCenter(next.stage));

                            return (
                              <line
                                key={`handoff-${i}`}
                                x1={x}
                                x2={x}
                                y1={y1}
                                y2={y2}
                                stroke="currentColor"
                                strokeOpacity={0.55}
                                strokeWidth={2}
                                strokeDasharray="2 6"
                              />
                            );
                          })}
                      </Layer>
                    );
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>

            {tip.show && tip.seg && (
              <div
                ref={tipRef}
                className="pointer-events-none absolute z-20 rounded-md border bg-background/95 px-2 py-1 text-xs shadow"
                style={{ left: tipPos.left, top: tipPos.top }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ background: STAGE_STYLES[tip.seg.stage].color }}
                  />
                  <span className="font-medium">
                    {STAGE_STYLES[tip.seg.stage].label}
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {formatTick(new Date(tip.seg.start).getTime())} –{" "}
                  {formatTick(new Date(tip.seg.end).getTime())} (
                  {msToHM(
                    new Date(tip.seg.end).getTime() -
                      new Date(tip.seg.start).getTime()
                  )}
                  )
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepChart;
