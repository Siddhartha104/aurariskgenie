
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { RiskDataService } from "@/lib/data/riskDataService";
import { toast } from "sonner";

const COLORS = {
  Financial: "#3B82F6",
  Operational: "#F59E0B",
  Compliance: "#10B981",
  Strategic: "#8B5CF6"
};

const CategoryBreakdown = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Array<{name: string; value: number}>>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const categoryData = await RiskDataService.getRisksByCategory();
        
        const formattedData = Object.entries(categoryData).map(([name, value]) => ({
          name,
          value
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error("Error loading category breakdown:", error);
        toast.error("Failed to load risk category data");
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
          <CardTitle>Risk Category Breakdown</CardTitle>
          <CardDescription>Loading category data...</CardDescription>
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
        <CardTitle>Risk Category Breakdown</CardTitle>
        <CardDescription>Distribution of risks by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} risks`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
