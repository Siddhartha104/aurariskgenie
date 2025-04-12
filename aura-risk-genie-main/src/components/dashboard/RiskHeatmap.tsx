
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RiskDataService } from "@/lib/data/riskDataService";
import { toast } from "sonner";

const impactLabels = ["Negligible", "Minor", "Moderate", "Major", "Severe"];
const likelihoodLabels = ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"];

const RiskHeatmap = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [heatmapData, setHeatmapData] = useState<number[][]>([]);

  useEffect(() => {
    const loadHeatmapData = async () => {
      try {
        setLoading(true);
        const data = await RiskDataService.getRiskHeatmapData();
        setHeatmapData(data);
      } catch (error) {
        console.error("Error loading heatmap data:", error);
        toast.error("Failed to load risk heatmap data");
      } finally {
        setLoading(false);
      }
    };
    
    loadHeatmapData();
  }, []);

  const getCellColor = (likelihood: number, impact: number) => {
    // Calculate risk score (1-25)
    const score = (likelihood + 1) * (impact + 1);
    
    if (score <= 4) return "bg-green-100 text-green-800"; // Low risk
    if (score <= 9) return "bg-green-200 text-green-800";
    if (score <= 14) return "bg-yellow-100 text-yellow-800"; // Medium risk
    if (score <= 19) return "bg-yellow-200 text-yellow-800";
    return "bg-red-200 text-red-800"; // High risk
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Heatmap</CardTitle>
          <CardDescription>Loading heatmap data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Heatmap</CardTitle>
        <CardDescription>
          Distribution of risks by likelihood and impact severity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-xs">
                <th className="w-24 border p-1 text-left font-normal text-muted-foreground">Likelihood / Impact</th>
                {impactLabels.map((label, index) => (
                  <th key={index} className="border p-1 text-center font-normal">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {likelihoodLabels.map((rowLabel, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border p-1 text-xs text-muted-foreground">{rowLabel}</td>
                  {heatmapData[rowIndex]?.map((count, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "border p-3 text-center text-sm font-medium",
                        getCellColor(rowIndex, colIndex)
                      )}
                    >
                      {count}
                    </td>
                  )) || Array(5).fill(0).map((_, i) => (
                    <td key={i} className="border p-3 text-center text-sm">0</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;
