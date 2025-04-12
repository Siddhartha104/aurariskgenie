
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, TrendingUp, AlertTriangle, Zap } from "lucide-react";

const insights = [
  {
    icon: <AlertTriangle className="h-5 w-5 text-risk-high" />,
    title: "Supply Chain Vulnerability",
    description:
      "Recent global events suggest increased vulnerability in your Asia-Pacific supply chain. Consider diversifying suppliers in affected regions.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-risk-medium" />,
    title: "Financial Risk Trend",
    description:
      "Currency fluctuations have increased by 12% this quarter, potentially affecting your international operations.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "Quick Win",
    description:
      "Implementing multi-factor authentication could reduce your cybersecurity risk score by 23% with minimal investment.",
  },
];

const AiInsights = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-md flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>
            Actionable insights based on your risk data
          </CardDescription>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary animate-pulse-slow">
          Updated 2h ago
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index}>
            <div className="flex gap-3">
              <div className="mt-0.5 flex-shrink-0">{insight.icon}</div>
              <div className="space-y-1">
                <h4 className="font-medium">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </div>
            {index < insights.length - 1 && (
              <Separator className="my-4" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AiInsights;
