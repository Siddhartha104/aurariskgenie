
// Risk data types
export interface Risk {
  id: string;
  name: string;
  category: "Financial" | "Operational" | "Compliance" | "Strategic";
  description: string;
  likelihood: number; // 1-5
  impact: number; // 1-5
  riskScore: number;
  status: "Active" | "Mitigated" | "Monitoring";
  dateIdentified: string;
  owner: string;
  mitigationPlan?: string;
  trend: "increasing" | "stable" | "decreasing";
}

export interface RiskMetric {
  category: string;
  score: number;
  previousScore: number;
  change: number;
  trend: "increasing" | "stable" | "decreasing";
}

// Generate mock risk data
export const generateMockRisks = (): Risk[] => {
  const categories: ("Financial" | "Operational" | "Compliance" | "Strategic")[] = [
    "Financial", "Operational", "Compliance", "Strategic"
  ];
  
  const statuses: ("Active" | "Mitigated" | "Monitoring")[] = [
    "Active", "Mitigated", "Monitoring"
  ];
  
  const trends: ("increasing" | "stable" | "decreasing")[] = [
    "increasing", "stable", "decreasing"
  ];
  
  const owners = [
    "John Smith", "Sarah Johnson", "Michael Brown", "Jennifer Davis", "Robert Wilson"
  ];
  
  const financialRisks = [
    "Currency Exchange Fluctuation",
    "Interest Rate Volatility",
    "Credit Default Risk",
    "Liquidity Shortage",
    "Capital Adequacy Risk"
  ];
  
  const operationalRisks = [
    "Supply Chain Disruption",
    "IT System Failure",
    "Process Inefficiency",
    "Equipment Breakdown",
    "Staff Shortage"
  ];
  
  const complianceRisks = [
    "Regulatory Change Impact",
    "Data Privacy Violation",
    "License Compliance Issue",
    "Environmental Compliance Gap",
    "Health & Safety Non-compliance"
  ];
  
  const strategicRisks = [
    "New Competitor Entry",
    "Market Share Decline",
    "Failed Product Launch",
    "Merger Integration Challenge",
    "Customer Retention Issue"
  ];
  
  const risksByCategory = {
    Financial: financialRisks,
    Operational: operationalRisks,
    Compliance: complianceRisks,
    Strategic: strategicRisks
  };
  
  const risks: Risk[] = [];
  
  // Generate 25 risks
  for (let i = 1; i <= 25; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const riskNames = risksByCategory[category];
    const riskName = riskNames[Math.floor(Math.random() * riskNames.length)];
    
    const likelihood = Math.floor(Math.random() * 5) + 1;
    const impact = Math.floor(Math.random() * 5) + 1;
    const riskScore = likelihood * impact;
    
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    
    risks.push({
      id: `RISK-2023-${i.toString().padStart(3, '0')}`,
      name: riskName,
      category: category,
      description: `This is a ${category.toLowerCase()} risk related to ${riskName.toLowerCase()}.`,
      likelihood: likelihood,
      impact: impact,
      riskScore: riskScore,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      dateIdentified: date.toISOString().split('T')[0],
      owner: owners[Math.floor(Math.random() * owners.length)],
      mitigationPlan: Math.random() > 0.3 ? `Mitigation plan for ${riskName}` : undefined,
      trend: trends[Math.floor(Math.random() * trends.length)]
    });
  }
  
  return risks;
};

// Generate risk metrics based on risks
export const generateRiskMetrics = (risks: Risk[]): RiskMetric[] => {
  const categories = ["Financial", "Operational", "Compliance", "Strategic"];
  
  return categories.map(category => {
    const categoryRisks = risks.filter(risk => risk.category === category);
    const averageScore = categoryRisks.length > 0 
      ? Math.round(categoryRisks.reduce((sum, risk) => sum + risk.riskScore, 0) / categoryRisks.length)
      : 0;
    
    // Generate a previous score that's somewhat close to the current one
    const previousScore = Math.max(0, averageScore + Math.floor(Math.random() * 21) - 10);
    const change = averageScore - previousScore;
    
    let trend: "increasing" | "stable" | "decreasing";
    if (change > 3) trend = "increasing";
    else if (change < -3) trend = "decreasing";
    else trend = "stable";
    
    return {
      category,
      score: averageScore,
      previousScore,
      change,
      trend
    };
  });
};

// Mock data for risk assessment responses
export interface AssessmentResponse {
  id: string;
  date: string;
  completedBy: string;
  department: string;
  responses: {
    question: string;
    answer: string;
    riskLevel: "low" | "medium" | "high";
  }[];
}

export const mockAssessmentResponses: AssessmentResponse[] = [
  {
    id: "ASSESS-2023-001",
    date: "2023-11-15",
    completedBy: "John Smith",
    department: "Finance",
    responses: [
      {
        question: "Has the organization implemented controls to prevent unauthorized financial transactions?",
        answer: "Yes, but they need improvement",
        riskLevel: "medium"
      },
      {
        question: "Are financial records backed up regularly?",
        answer: "Yes, daily backups are in place",
        riskLevel: "low"
      },
      {
        question: "Is there a process for monitoring unusual financial activities?",
        answer: "No formal process exists",
        riskLevel: "high"
      }
    ]
  },
  {
    id: "ASSESS-2023-002",
    date: "2023-12-01",
    completedBy: "Sarah Johnson",
    department: "IT",
    responses: [
      {
        question: "Has the organization implemented multi-factor authentication?",
        answer: "Yes, for all critical systems",
        riskLevel: "low"
      },
      {
        question: "Is there an incident response plan for cybersecurity breaches?",
        answer: "Yes, but it hasn't been tested in the last 12 months",
        riskLevel: "medium"
      },
      {
        question: "Are all systems patched regularly?",
        answer: "Most systems are patched, but there's no formal schedule",
        riskLevel: "medium"
      }
    ]
  }
];

// Risk analytics data
export interface RiskAnalyticData {
  month: string;
  financial: number;
  operational: number;
  compliance: number;
  strategic: number;
}

export const riskTrendData: RiskAnalyticData[] = [
  { month: "Jan", financial: 45, operational: 30, compliance: 20, strategic: 25 },
  { month: "Feb", financial: 50, operational: 25, compliance: 35, strategic: 30 },
  { month: "Mar", financial: 40, operational: 45, compliance: 40, strategic: 35 },
  { month: "Apr", financial: 55, operational: 50, compliance: 30, strategic: 40 },
  { month: "May", financial: 60, operational: 55, compliance: 45, strategic: 45 },
  { month: "Jun", financial: 50, operational: 65, compliance: 55, strategic: 60 },
  { month: "Jul", financial: 45, operational: 70, compliance: 60, strategic: 65 },
  { month: "Aug", financial: 40, operational: 75, compliance: 55, strategic: 55 },
  { month: "Sep", financial: 50, operational: 78, compliance: 60, strategic: 70 },
  { month: "Oct", financial: 55, operational: 72, compliance: 65, strategic: 65 },
  { month: "Nov", financial: 60, operational: 68, compliance: 70, strategic: 60 },
  { month: "Dec", financial: 65, operational: 65, compliance: 60, strategic: 70 }
];
