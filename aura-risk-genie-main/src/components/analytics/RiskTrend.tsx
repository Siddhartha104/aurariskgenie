
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { RiskDataService } from "@/lib/data/riskDataService";
import { RiskAnalyticData } from "@/lib/data/mockData";
import { toast } from "sonner";

const colors = {
  "Financial": "#3B82F6",
  "Operational": "#F59E0B", 
  "Compliance": "#10B981",
  "Strategic": "#8B5CF6"
};

const RiskTrend = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<RiskAnalyticData[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const trendData = await RiskDataService.getRiskTrendData();
        setData(trendData);
      } catch (error) {
        console.error("Error loading risk trend data:", error);
        toast.error("Failed to load risk trend data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Risk Trend Analysis</CardTitle>
          <CardDescription>Loading trend data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="animate-pulse text-primary">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Trend Analysis</CardTitle>
        <CardDescription>Risk scores over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(colors).map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key.toLowerCase()}
                  stackId="1"
                  stroke={colors[key as keyof typeof colors]}
                  fill={colors[key as keyof typeof colors]}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskTrend;
