
import { generateMockRisks, generateRiskMetrics, Risk, RiskMetric, mockAssessmentResponses, riskTrendData } from './mockData';

// Initialize the "database" with mock data
const mockRisks = generateMockRisks();
const mockRiskMetrics = generateRiskMetrics(mockRisks);

// Service to handle risk data operations
export const RiskDataService = {
  // Get all risks
  getRisks: (): Promise<Risk[]> => {
    return Promise.resolve(mockRisks);
  },
  
  // Get a specific risk by ID
  getRiskById: (id: string): Promise<Risk | undefined> => {
    const risk = mockRisks.find(r => r.id === id);
    return Promise.resolve(risk);
  },
  
  // Get recent risks (most recently identified)
  getRecentRisks: (count: number = 5): Promise<Risk[]> => {
    return Promise.resolve(
      [...mockRisks]
        .sort((a, b) => new Date(b.dateIdentified).getTime() - new Date(a.dateIdentified).getTime())
        .slice(0, count)
    );
  },
  
  // Get risk metrics
  getRiskMetrics: (): Promise<RiskMetric[]> => {
    return Promise.resolve(mockRiskMetrics);
  },
  
  // Get overall risk score
  getOverallRiskScore: (): Promise<number> => {
    const average = mockRiskMetrics.reduce((sum, metric) => sum + metric.score, 0) / mockRiskMetrics.length;
    return Promise.resolve(Math.round(average));
  },
  
  // Get risk heatmap data
  getRiskHeatmapData: (): Promise<number[][]> => {
    // Initialize a 5x5 heatmap (likelihood x impact)
    const heatmap: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));
    
    // Fill the heatmap based on risks
    mockRisks.forEach(risk => {
      // Adjust indices to 0-based
      const likelihoodIndex = risk.likelihood - 1;
      const impactIndex = risk.impact - 1;
      heatmap[likelihoodIndex][impactIndex]++;
    });
    
    return Promise.resolve(heatmap);
  },
  
  // Get risk trend data
  getRiskTrendData: () => {
    return Promise.resolve(riskTrendData);
  },
  
  // Get risk assessment responses
  getAssessmentResponses: () => {
    return Promise.resolve(mockAssessmentResponses);
  },
  
  // Get risks by category
  getRisksByCategory: (): Promise<Record<string, number>> => {
    const categories: Record<string, number> = {
      Financial: 0,
      Operational: 0,
      Compliance: 0,
      Strategic: 0
    };
    
    mockRisks.forEach(risk => {
      categories[risk.category]++;
    });
    
    return Promise.resolve(categories);
  },
  
  // Get risks by status
  getRisksByStatus: (): Promise<Record<string, number>> => {
    const statuses: Record<string, number> = {
      Active: 0,
      Mitigated: 0,
      Monitoring: 0
    };
    
    mockRisks.forEach(risk => {
      statuses[risk.status]++;
    });
    
    return Promise.resolve(statuses);
  }
};
