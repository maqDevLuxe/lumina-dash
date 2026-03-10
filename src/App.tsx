import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TrafficPage from "./pages/Traffic";
import PredictivePage from "./pages/Predictive";
import ActivityPage from "./pages/Activity";
import NotificationsPage from "./pages/Notifications";
import ExportPage from "./pages/Export";
import ProfilePage from "./pages/Profile";
import SecurityPage from "./pages/Security";
import ApiKeysPage from "./pages/ApiKeys";
import BillingPage from "./pages/Billing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/predictive" element={<PredictivePage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/export" element={<ExportPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/api-keys" element={<ApiKeysPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
