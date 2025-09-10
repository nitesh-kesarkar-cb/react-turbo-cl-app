import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Separator } from "@repo/ui/components/separator";
import { Checkbox } from "@repo/ui/components/checkbox";
import { H1 } from "@repo/ui/components/heading";
import { User } from "lucide-react";

import { BiomarkerTable } from "./_components/BioMarkerTable";
import { useFetchTierBioMarkers, useFetchTiers } from "@/store/query/scoreEngineQuery";
import { useSelector } from "react-redux";
import { Tier } from "@/types/ScoreEngine";
import { useEffect, useMemo, useState } from "react";

export default function ScoreEngine() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const { isLoading: tiersLoading } = useFetchTiers();
  const { refetch: refetchTierBiomarkers } = useFetchTierBioMarkers(selectedTier?.value || '');

  const { tiers, biomarkers } = useSelector((state: any) => state.scoreEngine);


  useEffect(() => {
    if (tiers.length > 0 && !selectedTier) {
      setSelectedTier(tiers[0]);
      handleTierSelect(tiers[0].value);
    }
  }, [tiers, selectedTier]);


    const handleTierSelect = useMemo(() => (val: string) => {
      const tier = tiers.find((tier: Tier) => tier.value === val);

      if (tier) {
        setSelectedTier(tier);
        refetchTierBiomarkers();
      }
    }, [selectedTier]);

  if (tiersLoading) return <div>Loading...</div>;
  return (
    <div className="space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <User className="w-4 h-4" />
          B2C Portal
        </Button>
      </div>

      {/* Tier Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Tier Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier: Tier) => (
              <div
                key={tier.value}
                className={`p-6 rounded-lg cursor-pointer transition-all ${selectedTier?.value === tier.value ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => handleTierSelect(tier.value)}
              >
                <h3 className="text-lg font-semibold text-center">{tier.name}</h3>
                <p className="text-center mt-2 opacity-90">{tier.biomarkers_count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">Score Types</CardTitle>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <label className="flex items-center gap-2">
              <Checkbox id="general" /> General Health
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="wellness" /> Wellness
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="clinical" /> Clinical (Silver+)
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="metabolic" /> Metabolic (Silver+)
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="stress" /> Stress (Silver+)
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="hormonal" /> Hormonal (Gold+)
            </label>
            <label className="flex items-center gap-2">
              <Checkbox id="longevity" /> Longevity (Gold+)
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Score Types */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-gray-700">Biomarker Configuration</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Calculate</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />


          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <p className="text-gray-500 text-sm">Selected</p>
                <p className="text-lg font-semibold">0</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-lg font-semibold">{selectedTier?.biomarkers_count}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-gray-500 text-sm">Tier</p>
                <p className="text-lg font-semibold">{selectedTier?.name}</p>
              </Card>
            </div>
            <div className="mt-4"> <BiomarkerTable biomarkers={biomarkers} /></div>

          </CardContent>

        </CardContent>
      </Card>

    </div>
  );
}
