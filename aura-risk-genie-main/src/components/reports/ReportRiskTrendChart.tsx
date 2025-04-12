
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ReportRiskTrendChartProps {
  chartType: string;
  chartTitle: string;
  data?: any[]; // In a real app, this would be strongly typed
}

const ReportRiskTrendChart = ({ chartType, chartTitle, data }: ReportRiskTrendChartProps) => {
  // Default data if none provided
  const defaultData = [
    { month: 'Jan', risk: 65 },
    { month: 'Feb', risk: 59 },
    { month: 'Mar', risk: 62 },
    { month: 'Apr', risk: 68 },
    { month: 'May', risk: 71 },
    { month: 'Jun', risk: 65 },
    { month: 'Jul', risk: 62 },
    { month: 'Aug', risk: 59 },
    { month: 'Sep', risk: 65 },
    { month: 'Oct', risk: 71 },
    { month: 'Nov', risk: 68 },
    { month: 'Dec', risk: 62 },
  ];

  const chartData = data || defaultData;

  const config = {
    risk: {
      label: "Risk Score",
      color: "#3B82F6"
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "line" ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="var(--color-risk)" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              ) : (
                <LineChart
                  data={chartData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-risk)" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportRiskTrendChart;
