
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  ResponsiveContainer 
} from "recharts";
import { RiskDataService } from "@/lib/data/riskDataService";
import { toast } from "sonner";

const COLORS = {
  Active: "#EF4444",
  Mitigated: "#10B981",
  Monitoring: "#F59E0B"
};

const RiskStatusChart = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<{name: string; value: number}>>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const statusData = await RiskDataService.getRisksByStatus();
        
        const formattedData = Object.entries(statusData).map(([name, value]) => ({
          name,
          value
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error loading status data:", error);
        toast.error("Failed to load risk status data");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Status Distribution</CardTitle>
          <CardDescription>Loading status data...</CardDescription>
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
        <CardTitle>Risk Status Distribution</CardTitle>
        <CardDescription>Current status of identified risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Number of Risks">
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskStatusChart;
