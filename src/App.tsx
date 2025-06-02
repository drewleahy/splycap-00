
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";

// Pages
import Index from "@/pages/Index";
import Admin from "@/pages/Admin";
import LPSplash from "@/pages/LPSplash";

// LP Pages
import Bio from "@/pages/lp/Bio";
import Criteria from "@/pages/lp/Criteria";
import Deck from "@/pages/lp/Deck";
import IRA from "@/pages/lp/IRA";
import Memos from "@/pages/lp/Memos";
import Protocol from "@/pages/lp/Protocol";
import Schedule from "@/pages/lp/Schedule";
import Screening from "@/pages/lp/Screening";
import Thesis from "@/pages/lp/Thesis";
import Workflow from "@/pages/lp/Workflow";

// Venture Partner Pages
import Auth from "@/pages/venturepartners/Auth";
import Dashboard from "@/pages/venturepartners/Dashboard";
import Deals from "@/pages/venturepartners/Deals";
import LPs from "@/pages/venturepartners/LPs";
import Commissions from "@/pages/venturepartners/Commissions";
import Settings from "@/pages/venturepartners/Settings";
import CommissionSettings from "@/pages/venturepartners/CommissionSettings";

// Landing Pages
import ExclusiveInvestment2024 from "@/pages/landing/ExclusiveInvestment2024";
import LytenOpportunity from "@/pages/landing/LytenOpportunity";

// Components
import { LPLayout } from "@/components/LPLayout";
import { VPLayout } from "@/components/VPLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Protected Admin Route */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          
          {/* Hidden Landing Pages */}
          <Route path="/exclusive-investment-2024" element={<ExclusiveInvestment2024 />} />
          <Route path="/lyten-exclusive-2025" element={<LytenOpportunity />} />
          
          {/* LP Routes - Add both case variants */}
          <Route path="/lp-splash" element={<LPSplash />} />
          <Route path="/LP-splash" element={<LPSplash />} />
          <Route path="/LP-Splash" element={<LPSplash />} />
          <Route path="/lp" element={<LPLayout />}>
            <Route path="bio" element={<Bio />} />
            <Route path="criteria" element={<Criteria />} />
            <Route path="deck" element={<Deck />} />
            <Route path="ira" element={<IRA />} />
            <Route path="memos" element={<Memos />} />
            <Route path="protocol" element={<Protocol />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="screening" element={<Screening />} />
            <Route path="thesis" element={<Thesis />} />
            <Route path="workflow" element={<Workflow />} />
          </Route>
          
          {/* Venture Partner Routes - Auth needs to be accessible with or without query parameters */}
          <Route path="/venturepartners/auth" element={<Auth />} />
          
          {/* Protected Venture Partner Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<VPLayout />}>
              <Route path="/venturepartners/dashboard" element={<Dashboard />} />
              <Route path="/venturepartners/deals" element={<Deals />} />
              <Route path="/venturepartners/lps" element={<LPs />} />
              <Route path="/venturepartners/commissions" element={<Commissions />} />
              <Route path="/venturepartners/commission-settings" element={<CommissionSettings />} />
              <Route path="/venturepartners/settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
