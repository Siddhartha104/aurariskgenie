
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RiskDataService } from "@/lib/data/riskDataService";
import { Risk } from "@/lib/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RiskTable = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    const loadRisks = async () => {
      try {
        setLoading(true);
        const allRisks = await RiskDataService.getRisks();
        setRisks(allRisks);
      } catch (error) {
        console.error("Error loading risks:", error);
        toast.error("Failed to load risk data");
      } finally {
        setLoading(false);
      }
    };
    
    loadRisks();
  }, []);

  const getRiskLevelColor = (riskScore: number) => {
    if (riskScore < 9) return "bg-risk-low text-white";
    if (riskScore < 16) return "bg-risk-medium text-white";
    return "bg-risk-high text-white";
  };

  const getRiskLevel = (riskScore: number) => {
    if (riskScore < 9) return "Low";
    if (riskScore < 16) return "Medium";
    return "High";
  };

  const filteredRisks = risks.filter(risk => 
    risk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    risk.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Register</CardTitle>
          <CardDescription>Loading risk data...</CardDescription>
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
        <CardTitle>Risk Register</CardTitle>
        <CardDescription>Comprehensive list of all identified risks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search risks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Risk Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Identified</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRisks.length > 0 ? (
                filteredRisks.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell className="font-medium">{risk.id}</TableCell>
                    <TableCell>{risk.name}</TableCell>
                    <TableCell>{risk.category}</TableCell>
                    <TableCell>{risk.owner}</TableCell>
                    <TableCell>{new Date(risk.dateIdentified).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={risk.status === "Mitigated" ? "outline" : "secondary"}>
                        {risk.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(getRiskLevelColor(risk.riskScore))}>
                        {getRiskLevel(risk.riskScore)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No risks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskTable;
