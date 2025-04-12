
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskTrend from "@/components/analytics/RiskTrend";
import CategoryBreakdown from "@/components/analytics/CategoryBreakdown";
import RiskTable from "@/components/analytics/RiskTable";
import RiskStatusChart from "@/components/analytics/RiskStatusChart";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("trends");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Detailed analysis of your organization's risk landscape
        </p>
      </div>
      
      <Tabs defaultValue="trends" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Risk Trends</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="status">Risk Status</TabsTrigger>
          <TabsTrigger value="table">All Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="mt-6">
          <RiskTrend />
        </TabsContent>
        
        <TabsContent value="categories" className="mt-6">
          <CategoryBreakdown />
        </TabsContent>
        
        <TabsContent value="status" className="mt-6">
          <RiskStatusChart />
        </TabsContent>
        
        <TabsContent value="table" className="mt-6">
          <RiskTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
