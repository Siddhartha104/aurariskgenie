
import React from "react";
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

const data = [
  {
    date: "Jan",
    "Financial Risk": 45,
    "Operational Risk": 30,
    "Compliance Risk": 20,
    "Strategic Risk": 25,
  },
  {
    date: "Feb",
    "Financial Risk": 50,
    "Operational Risk": 25,
    "Compliance Risk": 35,
    "Strategic Risk": 30,
  },
  {
    date: "Mar",
    "Financial Risk": 40,
    "Operational Risk": 45,
    "Compliance Risk": 40,
    "Strategic Risk": 35,
  },
  {
    date: "Apr",
    "Financial Risk": 55,
    "Operational Risk": 50,
    "Compliance Risk": 30,
    "Strategic Risk": 40,
  },
  {
    date: "May",
    "Financial Risk": 60,
    "Operational Risk": 55,
    "Compliance Risk": 45,
    "Strategic Risk": 45,
  },
  {
    date: "Jun",
    "Financial Risk": 50,
    "Operational Risk": 65,
    "Compliance Risk": 55,
    "Strategic Risk": 60,
  },
  {
    date: "Jul",
    "Financial Risk": 45,
    "Operational Risk": 70,
    "Compliance Risk": 60,
    "Strategic Risk": 65,
  },
  {
    date: "Aug",
    "Financial Risk": 40,
    "Operational Risk": 75,
    "Compliance Risk": 55,
    "Strategic Risk": 55,
  },
  {
    date: "Sep",
    "Financial Risk": 50,
    "Operational Risk": 78,
    "Compliance Risk": 60,
    "Strategic Risk": 70,
  },
];

const colors = {
  "Financial Risk": "#3B82F6",
  "Operational Risk": "#F59E0B", 
  "Compliance Risk": "#10B981",
  "Strategic Risk": "#8B5CF6"
};

const RiskTrend = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Risk Trend Analysis</CardTitle>
        <CardDescription>Risk scores over the last 9 months</CardDescription>
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
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(data[0])
                .filter((key) => key !== "date")
                .map((key) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
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
