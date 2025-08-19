// apps/web/src/components/ui/json-viewer.tsx
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function safeStringify(value: unknown, space = 2) {
  const seen = new WeakSet();
  return JSON.stringify(
    value,
    (key, val) => {
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) return "[Circular]";
        seen.add(val as object);
      }
      return val;
    },
    space
  );
}

export interface JSONViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  data: unknown;
  title?: string;
  space?: number; // indentation, default 2
  maxHeightClass?: string; // tailwind height class, e.g. "h-80"
}

export function JSONViewer({
  data,
  title = "JSON",
  space = 2,
  maxHeightClass = "h-80",
  className,
  ...rest
}: JSONViewerProps) {
  const pretty = React.useMemo(() => safeStringify(data, space), [data, space]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pretty);
    } catch {
      // ignore
    }
  };

  return (
    <Card className={className} {...rest}>
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Button size="sm" variant="outline" onClick={onCopy}>
          Copy
        </Button>
      </CardHeader>

      <CardContent>
        <ScrollArea className={maxHeightClass}>
          <pre className="whitespace-pre-wrap rounded-md bg-muted p-3 text-xs font-mono leading-5">
            {pretty}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
