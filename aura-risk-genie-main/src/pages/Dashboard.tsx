
import RiskOverview from "@/components/dashboard/RiskOverview";
import RecentRisks from "@/components/dashboard/RecentRisks";
import RiskHeatmap from "@/components/dashboard/RiskHeatmap";
import AiInsights from "@/components/dashboard/AiInsights";
import RiskTrend from "@/components/dashboard/RiskTrend";
import ChatInterface from "@/components/chat/ChatInterface";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your organization's risk landscape
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RiskOverview />
        <AiInsights />
        <ChatInterface />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RiskTrend />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentRisks />
        <RiskHeatmap />
      </div>
    </div>
  );
};

export default Dashboard;
