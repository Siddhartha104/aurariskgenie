
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formState, setFormState] = useState({
    orgName: "Acme Corporation",
    email: "admin@example.com",
    riskFramework: "NIST",
    notificationsEnabled: true,
    emailAlerts: true,
    dashboardRefresh: "30",
    theme: "light",
    language: "english",
    apiKey: "••••••••••••••••",
    aiModel: "gpt4"
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };

  const handleSaveIntegration = () => {
    toast.success("Integration settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application preferences and configurations
        </p>
      </div>
      
      <Tabs defaultValue="general" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Manage your organization information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={formState.orgName}
                  onChange={(e) => handleInputChange("orgName", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Label htmlFor="riskFramework">Risk Assessment Framework</Label>
                <Select 
                  value={formState.riskFramework}
                  onValueChange={(value) => handleInputChange("riskFramework", value)}
                >
                  <SelectTrigger id="riskFramework">
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NIST">NIST CSF</SelectItem>
                    <SelectItem value="ISO">ISO 31000</SelectItem>
                    <SelectItem value="COSO">COSO ERM</SelectItem>
                    <SelectItem value="custom">Custom Framework</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={formState.theme}
                  onValueChange={(value) => handleInputChange("theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select 
                  value={formState.language}
                  onValueChange={(value) => handleInputChange("language", value)}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about important risk events
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={formState.notificationsEnabled}
                  onCheckedChange={(checked) => handleInputChange("notificationsEnabled", checked)}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailAlerts">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important alerts via email
                  </p>
                </div>
                <Switch
                  id="emailAlerts"
                  checked={formState.emailAlerts}
                  onCheckedChange={(checked) => handleInputChange("emailAlerts", checked)}
                  disabled={!formState.notificationsEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dashboardRefresh">Dashboard Refresh Interval (seconds)</Label>
                <Select 
                  value={formState.dashboardRefresh}
                  onValueChange={(value) => handleInputChange("dashboardRefresh", value)}
                >
                  <SelectTrigger id="dashboardRefresh">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Manual Refresh Only</SelectItem>
                    <SelectItem value="30">Every 30 seconds</SelectItem>
                    <SelectItem value="60">Every minute</SelectItem>
                    <SelectItem value="300">Every 5 minutes</SelectItem>
                    <SelectItem value="600">Every 10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>
                Configure your AI model settings and API credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">AI API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type="password"
                    value={formState.apiKey}
                    onChange={(e) => handleInputChange("apiKey", e.target.value)}
                  />
                  <Button variant="outline" onClick={() => toast.info("API key revealed temporarily")}>
                    Show
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your API key for accessing the AI risk analysis services
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aiModel">AI Model</Label>
                <Select 
                  value={formState.aiModel}
                  onValueChange={(value) => handleInputChange("aiModel", value)}
                >
                  <SelectTrigger id="aiModel">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="gpt35">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="llama">Llama 3</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select which AI model powers your risk insights
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Data Privacy Settings</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSaving">Store conversation history</Label>
                    <p className="text-sm text-muted-foreground">
                      Save chat history for improved responses
                    </p>
                  </div>
                  <Switch id="dataSaving" defaultChecked />
                </div>
              </div>
              
              <Button onClick={handleSaveIntegration}>Save Integration Settings</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>External Connections</CardTitle>
              <CardDescription>
                Connect to third-party risk management services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Compliance Database</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect to regulatory compliance database
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Scanner</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrate with security vulnerability scanners
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Financial Data API</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect to financial risk data providers
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
