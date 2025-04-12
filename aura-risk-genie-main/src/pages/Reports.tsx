import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, Search, Filter, CalendarIcon, ChevronDown, BarChart } from "lucide-react";
import { toast } from "sonner";
import ReportRiskCategoriesChart from "@/components/reports/ReportRiskCategoriesChart";
import ReportRiskTrendChart from "@/components/reports/ReportRiskTrendChart";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const reportData = [
  {
    id: "RPT-2023-001",
    title: "Quarterly Risk Assessment",
    date: "Dec 15, 2023",
    type: "Quarterly",
    status: "Final",
    riskScore: 65,
    analytics: {
      topRisks: [
        { category: "Financial", score: 72, trend: "increasing" },
        { category: "Operational", score: 58, trend: "stable" },
        { category: "Compliance", score: 45, trend: "decreasing" },
      ],
      summary: "Overall risk profile remains moderate with financial risks increasing by 7% over previous quarter. Operational risks stable with improved security controls in place. Compliance risks decreased due to successful regulatory audit.",
      charts: [
        { type: "bar", title: "Risk Categories" },
        { type: "line", title: "Risk Trend" }
      ]
    }
  },
  {
    id: "RPT-2023-002",
    title: "Cybersecurity Risk Analysis",
    date: "Dec 10, 2023",
    type: "Special",
    status: "Final",
    riskScore: 78,
    analytics: {
      topRisks: [
        { category: "Data Breach", score: 85, trend: "increasing" },
        { category: "Ransomware", score: 76, trend: "increasing" },
        { category: "Insider Threat", score: 62, trend: "stable" },
      ],
      summary: "Cybersecurity risk profile is elevated with increased threats detected. Immediate action recommended to strengthen security controls and implement additional monitoring capabilities.",
      charts: [
        { type: "bar", title: "Threat Categories" },
        { type: "pie", title: "Attack Vectors" }
      ]
    }
  },
  {
    id: "RPT-2023-003",
    title: "Supply Chain Vulnerability Assessment",
    date: "Dec 5, 2023",
    type: "Special",
    status: "Final",
    riskScore: 42,
    analytics: {
      topRisks: [
        { category: "Supplier Disruption", score: 48, trend: "stable" },
        { category: "Quality Control", score: 39, trend: "decreasing" },
        { category: "Logistics Delay", score: 44, trend: "stable" },
      ],
      summary: "Supply chain risks remain manageable with no significant disruptions identified. Continued monitoring of key suppliers recommended with focus on geopolitical developments.",
      charts: [
        { type: "bar", title: "Supplier Risk" },
        { type: "line", title: "Disruption History" }
      ]
    }
  },
  {
    id: "RPT-2023-004",
    title: "Financial Risk Trend Analysis",
    date: "Nov 28, 2023",
    type: "Monthly",
    status: "Final",
    riskScore: 55,
    analytics: {
      topRisks: [
        { category: "Market Volatility", score: 62, trend: "increasing" },
        { category: "Credit Risk", score: 48, trend: "stable" },
        { category: "Liquidity Risk", score: 43, trend: "stable" },
      ],
      summary: "Financial risk trends show increased market volatility affecting certain asset classes. Credit and liquidity risks remain stable with appropriate controls in place.",
      charts: [
        { type: "line", title: "Market Trends" },
        { type: "bar", title: "Risk Exposure" }
      ]
    }
  },
  {
    id: "RPT-2023-005",
    title: "Compliance Gap Analysis",
    date: "Nov 15, 2023",
    type: "Quarterly",
    status: "Final",
    riskScore: 38,
    analytics: {
      topRisks: [
        { category: "Regulatory Changes", score: 45, trend: "increasing" },
        { category: "Documentation", score: 32, trend: "decreasing" },
        { category: "Training", score: 36, trend: "stable" },
      ],
      summary: "Overall compliance posture is strong with minor gaps identified in documentation processes. Recent regulatory changes require attention in upcoming quarter.",
      charts: [
        { type: "bar", title: "Compliance Areas" },
        { type: "pie", title: "Gap Distribution" }
      ]
    }
  },
];

const draftReports = [
  {
    id: "DFT-2023-001",
    title: "Emerging Market Entry Risk Assessment",
    date: "Dec 18, 2023",
    type: "Special",
    status: "Draft",
    progress: 75,
  },
  {
    id: "DFT-2023-002",
    title: "Monthly Risk Dashboard - December",
    date: "Dec 16, 2023",
    type: "Monthly",
    status: "Draft",
    progress: 90,
  },
];

const getRiskScoreColor = (score: number) => {
  if (score < 40) return "bg-risk-low text-white";
  if (score < 70) return "bg-risk-medium text-white";
  return "bg-risk-high text-white";
};

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<typeof reportData[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const filteredReports = reportData.filter(report => 
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReport = (report: typeof reportData[0]) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleExportReport = (report: typeof reportData[0], e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Exporting "${report.title}"`, {
      description: "Your report will be downloaded shortly."
    });
    setTimeout(() => {
      toast.success(`Export complete for "${report.title}"`, {
        description: "Report has been downloaded successfully."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-2">
            Access your risk analysis reports and insights
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleBackToDashboard}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue="published" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Date Range</span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search reports..." 
            className="h-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <TabsContent value="published" className="space-y-4">
          {filteredReports.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No reports match your search</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <Card 
                key={report.id} 
                className="overflow-hidden transition-all hover:shadow-md cursor-pointer" 
                onClick={() => handleViewReport(report)}
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {report.id}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {report.date}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {report.type}
                      </span>
                    </div>
                    <h3 className="mt-1 text-lg font-medium">{report.title}</h3>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          Risk Score:
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getRiskScoreColor(
                            report.riskScore
                          )}`}
                        >
                          {report.riskScore}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          <BarChart className="inline-block h-4 w-4 mr-1 text-muted-foreground" />
                          View Analytics
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 bg-muted/50 p-4 sm:w-48">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => handleExportReport(report, e)}
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Button size="sm" variant="secondary" className="gap-1">
                      <FileText className="h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {draftReports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {report.id}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {report.date}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {report.type}
                    </span>
                  </div>
                  <h3 className="mt-1 text-lg font-medium">{report.title}</h3>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Completion:
                      </span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${report.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{report.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 bg-muted/50 p-4 sm:w-48">
                  <Button size="sm" variant="secondary" className="gap-1">
                    Continue Editing
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Start a new report using one of our pre-defined templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Quarterly Risk Assessment",
                    description: "Comprehensive review of all risk categories",
                    icon: <FileText className="h-8 w-8 text-primary/70" />,
                  },
                  {
                    title: "Monthly Risk Dashboard",
                    description: "Key metrics and indicators summary",
                    icon: <FileText className="h-8 w-8 text-primary/70" />,
                  },
                  {
                    title: "Compliance Analysis",
                    description: "Regulatory compliance status and gaps",
                    icon: <FileText className="h-8 w-8 text-primary/70" />,
                  },
                ].map((template, i) => (
                  <div
                    key={i}
                    className="flex cursor-pointer flex-col items-center rounded-lg border p-4 text-center transition-all hover:border-primary/50 hover:bg-muted"
                  >
                    <div className="mb-2">{template.icon}</div>
                    <h3 className="text-md font-medium">{template.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          {selectedReport && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {selectedReport.id}
                    </span>
                    <DialogTitle className="mt-1">{selectedReport.title}</DialogTitle>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${getRiskScoreColor(
                      selectedReport.riskScore
                    )}`}
                  >
                    Risk Score: {selectedReport.riskScore}
                  </span>
                </div>
                <DialogDescription className="mt-2">{selectedReport.type} report • {selectedReport.date}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Executive Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedReport.analytics.summary}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Top Risks</h3>
                  <div className="space-y-3">
                    {selectedReport.analytics.topRisks.map((risk, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b pb-2">
                        <div>
                          <p className="font-medium">{risk.category}</p>
                          <p className="text-sm text-muted-foreground">
                            Trend: 
                            <span className={
                              risk.trend === "increasing" ? "text-red-500" : 
                              risk.trend === "decreasing" ? "text-green-500" : 
                              "text-yellow-500"
                            }>
                              {" "}{risk.trend}
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Score</p>
                          <span 
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getRiskScoreColor(risk.score)}`}
                          >
                            {risk.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.analytics.charts.map((chart, idx) => {
                      if (chart.type === "bar") {
                        return (
                          <ReportRiskCategoriesChart 
                            key={idx} 
                            categories={selectedReport.analytics.topRisks}
                          />
                        );
                      } else if (chart.type === "line") {
                        return (
                          <ReportRiskTrendChart 
                            key={idx}
                            chartType="line"
                            chartTitle={chart.title}
                          />
                        );
                      } else if (chart.type === "pie") {
                        return (
                          <div key={idx} className="h-[300px] border rounded-md bg-muted/50 flex items-center justify-center">
                            <div className="text-center">
                              <BarChart className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">{chart.title} Chart</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={(e) => {
                      handleExportReport(selectedReport, e);
                      setIsDialogOpen(false);
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export Report
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
