
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { RiskDataService } from "@/lib/data/riskDataService";
import { RiskMetric } from "@/lib/data/mockData";
import { toast } from "sonner";

const RiskOverview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [riskScores, setRiskScores] = useState<Record<string, number>>({
    overall: 0,
    Financial: 0,
    Operational: 0,
    Compliance: 0,
    Strategic: 0,
  });

  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const metrics = await RiskDataService.getRiskMetrics();
        const overall = await RiskDataService.getOverallRiskScore();
        
        const scoresByCategory: Record<string, number> = {
          overall: overall,
        };
        
        metrics.forEach(metric => {
          scoresByCategory[metric.category] = metric.score;
        });
        
        setRiskScores(scoresByCategory);
        setRiskMetrics(metrics);
        toast.success("Risk data loaded successfully");
      } catch (error) {
        console.error("Error loading risk data:", error);
        toast.error("Failed to load risk data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const getRiskColor = (score: number) => {
    if (score < 40) return "text-risk-low";
    if (score < 70) return "text-risk-medium";
    return "text-risk-high";
  };

  const getRiskProgressColor = (score: number) => {
    if (score < 40) return "bg-risk-low";
    if (score < 70) return "bg-risk-medium";
    return "bg-risk-high";
  };

  const getRiskIcon = (score: number) => {
    if (score < 40) return <CheckCircle className="h-5 w-5 text-risk-low" />;
    if (score < 70) return <AlertTriangle className="h-5 w-5 text-risk-medium" />;
    return <AlertTriangle className="h-5 w-5 text-risk-high" />;
  };

  const getTrendIndicator = (metric: RiskMetric) => {
    if (metric.trend === "increasing") {
      return <span className="text-risk-high">↑ {Math.abs(metric.change)}%</span>;
    } else if (metric.trend === "decreasing") {
      return <span className="text-risk-low">↓ {Math.abs(metric.change)}%</span>;
    }
    return <span className="text-risk-medium">→ {Math.abs(metric.change)}%</span>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Overview</CardTitle>
          <CardDescription>Loading risk data...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        <CardTitle>Risk Overview</CardTitle>
        <CardDescription>Current risk assessment scores across categories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getRiskIcon(riskScores.overall)}
              <span className="font-medium">Overall Risk</span>
            </div>
            <span className={`font-bold ${getRiskColor(riskScores.overall)}`}>
              {riskScores.overall}%
            </span>
          </div>
          <Progress value={riskScores.overall} className={getRiskProgressColor(riskScores.overall)} />
        </div>

        {riskMetrics.map((metric) => (
          <div key={metric.category} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getRiskIcon(metric.score)}
                <span className="text-sm font-medium capitalize">{metric.category} Risk</span>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIndicator(metric)}
                <span className={`text-sm font-bold ${getRiskColor(metric.score)}`}>
                  {metric.score}%
                </span>
              </div>
            </div>
            <Progress value={metric.score} className={getRiskProgressColor(metric.score)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RiskOverview;
