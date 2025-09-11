import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { DataTable } from "@repo/ui/components/data-table";
import { RiskZoneConfig } from "./RiskZoneConfig"

import { BiomarkerConfig, RiskZone } from "@/types/ScoreEngine";

export type Biomarker = {
  id: string;
  name: string;
  group: string;
  source: string;
  tier: string;
  weight: number;
  value: number;
  unit: string;
  riskZones: "high" | "moderate" | "low" | "optimal";
};

export const biomarkerColumns: ColumnDef<BiomarkerConfig>[] = [
  {
    id: "select",
    header: () => <Checkbox aria-label="Select all" />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "name", header: "Biomarker", id: "name" },
  {
    id: "group",
    accessorKey: "group",
    header: "Group",
    cell: ({ row }) => <Badge>{row.original.group}</Badge>,
  },
  {
    id: "source",
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => <Badge variant="secondary">{row.original.source}</Badge>,
  },
  {
    id: "tier",
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-amber-100 text-amber-800">
        {row.original.tier}
      </Badge>
    ),
  },
  {
    id: "weight",
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => (
      <Input type="number" defaultValue={row.original.weight} className="w-14" />
    ),
  },
  {
    id: "value",
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Input type="number" defaultValue={row.original.value} className="w-14" />
        <span className="text-xs text-muted-foreground">{row.original.unit}</span>
      </div>
    ),
  },
  {
    id: "riskZones",
    accessorKey: "riskZones",
    header: "Risk Zones",
    cell: ({ row }) => {
      const riskZones = row.original.risk_zones as RiskZone[];
      return (
        <div className="flex gap-1">
          {riskZones.map((zone) => (
            <div
              key={zone.name}
              title={`${zone.name}: ${zone.min} - ${zone.max} (HR: ${zone.hazardRatio})`}
              className={`h-3 w-5 rounded-sm`}
              style={{
                backgroundColor: zone.color,
              }}
            />
          ))}
        </div>
      );
    },
  },
  {
    id: "config",
    header: "Config",
    cell: ({ row }) => (
      <button onClick={() => row.toggleExpanded()}>
        {row.getIsExpanded() ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    ),
  },
];

export const BiomarkerTable = ({ biomarkers }: { biomarkers: BiomarkerConfig[] }) => {


  return (
    <DataTable
      columns={biomarkerColumns}
      data={biomarkers}
      renderSubComponent={(row) => (
        <RiskZoneConfig biomarker={row} />
      )}
    />
  );
}
