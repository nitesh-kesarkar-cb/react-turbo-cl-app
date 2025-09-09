import { Card, CardContent } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Text } from "@repo/ui/components/text";

export function RiskZoneConfig({ biomarker }: { biomarker: string }) {
  const zones = [
    { label: "High Risk", color: "red", min: 100, max: 200, hazard: 2.0 },
    { label: "Moderate Risk", color: "orange", min: 90, max: 99, hazard: 1.5 },
    { label: "Low Risk", color: "yellow", min: 80, max: 89, hazard: 1.1 },
    { label: "Optimal", color: "green", min: 60, max: 79, hazard: 0.9 },
  ];

  return (
    <Card className="mt-2">
      <CardContent className="p-6">
        <h2 className="font-semibold mb-4">
          Risk Zone Configuration for {biomarker}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {zones.map((zone) => (
            <Card key={zone.label} className={`border border-${zone.color}-400`}>
              <CardContent className="p-4 space-y-2">
                <Text className={`font-medium text-${zone.color}-500`}>
                  {zone.label}
                </Text>
                <div className="flex items-center gap-2">
                  <span>Min:</span>
                  <Input type="number" defaultValue={zone.min} className="w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Max:</span>
                  <Input type="number" defaultValue={zone.max} className="w-20" />
                </div>
                <div className="flex items-center gap-2">
                  <span>Hazard Ratio:</span>
                  <Input
                    type="number"
                    step="0.1"
                    defaultValue={zone.hazard}
                    className="w-20"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
