
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AiAssistant from "./pages/AiAssistant";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Use only one toaster component */}
      <SonnerToaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={
            <AppLayout>
              <Assessment />
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <Reports />
            </AppLayout>
          } />
          <Route path="/analytics" element={
            <AppLayout>
              <Analytics />
            </AppLayout>
          } />
          <Route path="/assistant" element={
            <AppLayout>
              <AiAssistant />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
