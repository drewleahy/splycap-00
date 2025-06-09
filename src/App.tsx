
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import Index from "./pages/Index";
import LPSplash from "./pages/LPSplash";
import LytenOpportunity from "./pages/landing/LytenOpportunity";

// LP Pages
import Bio from "./pages/lp/Bio";
import Criteria from "./pages/lp/Criteria";
import Deck from "./pages/lp/Deck";
import IRA from "./pages/lp/IRA";
import Memos from "./pages/lp/Memos";
import Protocol from "./pages/lp/Protocol";
import Schedule from "./pages/lp/Schedule";
import Screening from "./pages/lp/Screening";
import Thesis from "./pages/lp/Thesis";
import Workflow from "./pages/lp/Workflow";

// Venture Partner Pages
import VPAuth from "./pages/venturepartners/Auth";
import VPDashboard from "./pages/venturepartners/Dashboard";
import VPDeals from "./pages/venturepartners/Deals";
import VPLPs from "./pages/venturepartners/LPs";
import VPCommissions from "./pages/venturepartners/Commissions";
import VPCommissionSettings from "./pages/venturepartners/CommissionSettings";
import VPSettings from "./pages/venturepartners/Settings";

// Admin
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lp" element={<LPSplash />} />
            
            {/* Old Lyten URL for backwards compatibility */}
            <Route path="/lyten-exclusive-2025" element={<LytenOpportunity />} />
            
            {/* New Lyten URL structure */}
            <Route path="/deals/lyten-exclusive-2025" element={<LytenOpportunity />} />
            
            {/* LP Routes */}
            <Route path="/lp/bio" element={<Bio />} />
            <Route path="/lp/criteria" element={<Criteria />} />
            <Route path="/lp/deck" element={<Deck />} />
            <Route path="/lp/ira" element={<IRA />} />
            <Route path="/lp/memos" element={<Memos />} />
            <Route path="/lp/protocol" element={<Protocol />} />
            <Route path="/lp/schedule" element={<Schedule />} />
            <Route path="/lp/screening" element={<Screening />} />
            <Route path="/lp/thesis" element={<Thesis />} />
            <Route path="/lp/workflow" element={<Workflow />} />
            
            {/* Venture Partner Routes */}
            <Route path="/venturepartners" element={<VPAuth />} />
            <Route path="/venturepartners/dashboard" element={<VPDashboard />} />
            <Route path="/venturepartners/deals" element={<VPDeals />} />
            <Route path="/venturepartners/lps" element={<VPLPs />} />
            <Route path="/venturepartners/commissions" element={<VPCommissions />} />
            <Route path="/venturepartners/commission-settings" element={<VPCommissionSettings />} />
            <Route path="/venturepartners/settings" element={<VPSettings />} />
            
            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
