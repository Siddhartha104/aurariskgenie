
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RiskDataService } from "@/lib/data/riskDataService";
import { Risk } from "@/lib/data/mockData";
import { toast } from "sonner";

const RecentRisks = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [recentRisks, setRecentRisks] = useState<Risk[]>([]);

  useEffect(() => {
    const loadRecentRisks = async () => {
      try {
        setLoading(true);
        const risks = await RiskDataService.getRecentRisks(5);
        setRecentRisks(risks);
      } catch (error) {
        console.error("Error loading recent risks:", error);
        toast.error("Failed to load recent risks");
      } finally {
        setLoading(false);
      }
    };
    
    loadRecentRisks();
  }, []);

  const getRiskLevelColor = (riskScore: number) => {
    if (riskScore < 9) return "bg-risk-low text-white";
    if (riskScore < 16) return "bg-risk-medium text-white";
    return "bg-risk-high text-white";
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore < 9) return "low";
    if (riskScore < 16) return "medium";
    return "high";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Risks</CardTitle>
          <CardDescription>Loading recent risks...</CardDescription>
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
        <CardTitle>Recent Risks</CardTitle>
        <CardDescription>Newly identified or updated risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRisks.map((risk) => (
            <div
              key={risk.id}
              className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className={cn(getRiskLevelColor(risk.riskScore), "capitalize")}>
                    {getRiskLevel(risk.riskScore)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{risk.id}</span>
                </div>
                <h4 className="font-medium">{risk.name}</h4>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{risk.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    Added on {new Date(risk.dateIdentified).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center self-end sm:self-auto">
                <button className="text-sm font-medium text-primary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRisks;
