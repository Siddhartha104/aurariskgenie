
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, SendIcon, TrashIcon, Lightbulb, Bot } from "lucide-react";
import ChatInterface from "@/components/chat/ChatInterface";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "What are the top risks in my organization?",
  "How can I mitigate supply chain disruption risks?",
  "Explain the difference between inherent and residual risk",
  "Generate a risk assessment report for my financial department",
  "What risk metrics should I track for compliance?",
];

const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your AI Risk Assistant. How can I help you analyze or manage your organization's risks today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: generateMockResponse(inputValue),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI Risk Assistant. How can I help you analyze or manage your organization's risks today?",
        timestamp: new Date(),
      },
    ]);
  };

  // Mock response generator based on input
  const generateMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("top risks")) {
      return "Based on your risk data, the top risks currently are:\n\n1. Supply Chain Disruption (High Risk)\n2. Regulatory Change Impact (High Risk)\n3. Data Privacy Violation (Medium Risk)\n\nWould you like detailed information about any of these specific risks?";
    }
    
    if (lowerInput.includes("mitigate") && lowerInput.includes("supply chain")) {
      return "To mitigate supply chain disruption risks, consider:\n\n• Diversifying your supplier base across different geographical regions\n• Implementing early warning systems for potential disruptions\n• Maintaining buffer inventory for critical components\n• Developing contingency plans with alternative logistics routes\n• Creating strategic partnerships with key suppliers\n\nWould you like me to elaborate on any of these strategies?";
    }
    
    if (lowerInput.includes("inherent") && lowerInput.includes("residual")) {
      return "Inherent Risk vs. Residual Risk:\n\n**Inherent Risk** is the raw or untreated level of risk, before any controls or mitigations are applied. It represents the natural risk level if you do nothing.\n\n**Residual Risk** is the remaining level of risk after controls and mitigation strategies have been implemented.\n\nFor example, the inherent risk of a data breach might be high, but after implementing encryption, access controls, and regular security audits, the residual risk might be reduced to medium or low.";
    }
    
    if (lowerInput.includes("report") && lowerInput.includes("financial")) {
      return "I've analyzed your financial department risks and prepared this assessment:\n\n**Key Findings:**\n• Currency exchange fluctuations present a High risk (score: 16)\n• Liquidity management shows Medium risk (score: 12)\n• Internal controls are generally effective (Low risk)\n\n**Recommendations:**\n• Consider hedging strategies for foreign currency exposure\n• Increase frequency of cash flow forecasting\n• Maintain current internal control framework with quarterly reviews\n\nWould you like me to generate a more detailed report or focus on a specific area?";
    }
    
    if (lowerInput.includes("metrics") && lowerInput.includes("compliance")) {
      return "Key compliance risk metrics you should track:\n\n1. **Regulatory Incident Rate:** Number of compliance incidents per quarter\n2. **Resolution Time:** Average days to resolve compliance issues\n3. **Training Completion:** % of staff with up-to-date compliance training\n4. **Audit Findings:** Number of findings in internal/external audits\n5. **Policy Adherence:** % of processes following compliance requirements\n6. **Reporting Timeliness:** % of regulatory reports submitted on time\n\nTracking these metrics can help identify compliance weak spots before they become serious issues.";
    }
    
    return "I understand you're asking about \"" + input + "\". This is an area where I can help analyze potential risks and provide guidance. Could you provide a bit more context about your specific concerns so I can give you tailored insights?";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Risk Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered risk insights and recommendations
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Risk Assistant Chat
              </CardTitle>
              <CardDescription>
                Ask questions about risks and get AI-powered answers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[500px] p-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "assistant" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "assistant"
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <SendIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={handleClearChat}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Suggested Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2 px-3"
                    onClick={() => handleSelectPrompt(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Risk Assistant Tips</AlertTitle>
            <AlertDescription>
              Ask about specific risks, request mitigation strategies, or get recommendations based on your risk data.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
