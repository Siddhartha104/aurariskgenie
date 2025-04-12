
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ReportRiskCategory {
  name: string;
  score: number;
  trend: string;
}

interface ReportRiskCategoriesChartProps {
  categories: ReportRiskCategory[];
}

const ReportRiskCategoriesChart = ({ categories }: ReportRiskCategoriesChartProps) => {
  // Configure chart colors
  const config = {
    Financial: {
      label: "Financial",
      color: "#3B82F6"
    },
    Operational: {
      label: "Operational",
      color: "#F59E0B"
    },
    Compliance: {
      label: "Compliance",
      color: "#10B981"
    },
    Strategic: {
      label: "Strategic",
      color: "#8B5CF6"
    },
    "Data Breach": {
      label: "Data Breach",
      color: "#EF4444"
    },
    Ransomware: {
      label: "Ransomware",
      color: "#EC4899"
    },
    "Insider Threat": {
      label: "Insider Threat",
      color: "#8B5CF6"
    },
    "Supplier Disruption": {
      label: "Supplier Disruption",
      color: "#F59E0B"
    },
    "Quality Control": {
      label: "Quality Control",
      color: "#10B981"
    },
    "Logistics Delay": {
      label: "Logistics Delay",
      color: "#3B82F6"
    },
    "Market Volatility": {
      label: "Market Volatility",
      color: "#EF4444"
    },
    "Credit Risk": {
      label: "Credit Risk",
      color: "#F59E0B"
    },
    "Liquidity Risk": {
      label: "Liquidity Risk",
      color: "#10B981"
    },
    "Regulatory Changes": {
      label: "Regulatory Changes",
      color: "#3B82F6"
    },
    Documentation: {
      label: "Documentation",
      color: "#8B5CF6"
    },
    Training: {
      label: "Training",
      color: "#F59E0B"
    }
  };

  const chartData = categories.map(category => ({
    name: category.name,
    score: category.score
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" name="Score" fill="var(--color-Financial)" radius={4} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportRiskCategoriesChart;
