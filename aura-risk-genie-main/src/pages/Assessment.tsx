
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, FileText, Loader2 } from "lucide-react";

const Assessment = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Risk assessment submitted successfully");
      setStep(3); // Move to AI analysis step
      
      // Simulate AI analysis completion
      setTimeout(() => {
        setStep(4); // Show results
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Submit new risk data for AI-powered analysis and recommendations
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}>
            <span className={step >= 1 ? "text-primary-foreground" : "text-muted-foreground"}>1</span>
          </div>
          <Separator className="w-8" />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}>
            <span className={step >= 2 ? "text-primary-foreground" : "text-muted-foreground"}>2</span>
          </div>
          <Separator className="w-8" />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`}>
            <span className={step >= 3 ? "text-primary-foreground" : "text-muted-foreground"}>3</span>
          </div>
          <Separator className="w-8" />
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 4 ? "bg-primary" : "bg-muted"}`}>
            <span className={step >= 4 ? "text-primary-foreground" : "text-muted-foreground"}>4</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {step} of 4
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Risk Information</CardTitle>
            <CardDescription>
              Enter the fundamental details about the risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="risk-name">Risk Name</Label>
                <Input id="risk-name" placeholder="E.g., Supply Chain Disruption" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="risk-category">Risk Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="strategic">Strategic</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="reputational">Reputational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="risk-owner">Risk Owner</Label>
                  <Input id="risk-owner" placeholder="Department or person responsible" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="risk-description">Risk Description</Label>
                <Textarea
                  id="risk-description"
                  placeholder="Detailed description of the risk and its potential impacts..."
                  rows={4}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Cancel</Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis Details</CardTitle>
            <CardDescription>
              Evaluate the likelihood and impact of the risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="likelihood">Likelihood</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select likelihood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rare">Rare (1)</SelectItem>
                      <SelectItem value="unlikely">Unlikely (2)</SelectItem>
                      <SelectItem value="possible">Possible (3)</SelectItem>
                      <SelectItem value="likely">Likely (4)</SelectItem>
                      <SelectItem value="almost-certain">Almost Certain (5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="impact">Impact Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negligible">Negligible (1)</SelectItem>
                      <SelectItem value="minor">Minor (2)</SelectItem>
                      <SelectItem value="moderate">Moderate (3)</SelectItem>
                      <SelectItem value="major">Major (4)</SelectItem>
                      <SelectItem value="severe">Severe (5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="current-controls">Current Controls</Label>
                <Textarea
                  id="current-controls"
                  placeholder="Describe the existing controls in place..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="additional-context">Additional Context</Label>
                <Textarea
                  id="additional-context"
                  placeholder="Provide any additional context or documents that might help with the analysis..."
                  rows={3}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit for Analysis
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>AI Risk Analysis</CardTitle>
            <CardDescription>
              Our AI is currently analyzing your risk data
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-medium">Analyzing Risk Data</h3>
                <p className="text-muted-foreground mt-1">
                  This typically takes 1-2 minutes
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <div className="space-y-1 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Processing input data</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-sm">Calculating initial risk scores</span>
                  </div>
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm">Generating mitigation recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Creating final report</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-risk-medium" />
              Medium Risk Detected
            </CardTitle>
            <CardDescription>
              AI-generated analysis of your submitted risk data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4">
              <h3 className="mb-2 font-medium text-amber-800">Risk Summary</h3>
              <p className="text-amber-700">
                This operational risk has been classified as Medium (Risk Score: 12/25) based on the likelihood and impact assessment. While not critical, it requires attention and mitigation planning.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-medium">Key Risk Factors</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Single-source dependency for critical components</li>
                  <li>Geographical concentration of suppliers in high-risk regions</li>
                  <li>Limited visibility into tier-2 and tier-3 suppliers</li>
                  <li>Historical disruption patterns suggest 30% probability of occurrence</li>
                </ul>
              </div>
              
              <div>
                <h3 className="mb-1 font-medium">Recommended Mitigation Strategy</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                  <li>Develop secondary supplier relationships in different geographic regions</li>
                  <li>Implement advanced monitoring systems for supply chain visibility</li>
                  <li>Increase safety stock for critical components by 15%</li>
                  <li>Create contingency logistics plans with alternative shipping routes</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="mb-2 font-medium">Financial Impact Analysis</h3>
              <div className="rounded-lg border p-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Estimated Cost of Risk:</p>
                    <p className="font-medium">$125,000 - $240,000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Mitigation Cost Range:</p>
                    <p className="font-medium">$50,000 - $80,000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Risk Reduction Potential:</p>
                    <p className="font-medium">40% - 65%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">ROI of Mitigation:</p>
                    <p className="font-medium">2.1x - 3.4x</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="outline" onClick={() => setStep(1)}>New Assessment</Button>
            <div className="space-x-2">
              <Button variant="outline" className="gap-1">
                <FileText className="h-4 w-4" />
                Export Report
              </Button>
              <Button>View Detailed Analysis</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Assessment;
