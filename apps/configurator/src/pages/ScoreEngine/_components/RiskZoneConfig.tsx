import { BiomarkerConfig } from "@/types/ScoreEngine"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import { riskZoneTextColorMap } from "@/constants/mapColors"

export function RiskZoneConfig({ biomarker }: { biomarker: BiomarkerConfig }) {
  return (
    <Card className="mt-2">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          Risk Zone Configuration for {biomarker.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {biomarker.risk_zones.map((zone) => (
            <Card
              key={zone.name}
              className="relative overflow-hidden shadow-sm border"
            >
              {/* Left colored side border */}
              <div
                className="absolute left-0 top-0 h-full w-2 rounded-l-lg"
                style={{ backgroundColor: zone.color }}
              />

              <CardHeader>
                <CardTitle
                  className={cn(
                    "flex items-center space-x-2 font-medium",
                    riskZoneTextColorMap[zone.color]
                  )}
                >
                  <span
                    className="w-6 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span>
                    {zone.name.charAt(0).toUpperCase() + zone.name.slice(1)} Risk
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Min:</span>
                  <Input type="number" defaultValue={zone.min} className="w-20" />
                  <span className="text-sm font-medium">Max:</span>
                  <Input type="number" defaultValue={zone.max} className="w-20" />
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Hazard Ratio:</span>
                  <Input
                    type="number"
                    step="0.1"
                    defaultValue={zone.hazardRatio}
                    className="w-24"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-sm text-muted-foreground italic">
          <strong>Unit:</strong> {biomarker.unit} | <strong>Tier:</strong>{" "}
          {biomarker.tier} | Evidence-based ranges from medical guidelines
        </p>
      </CardContent>
    </Card>
  )
}
