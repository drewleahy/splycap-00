
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
          <Route path="/admin" element={<Admin />} />
          
          {/* LP Routes */}
          <Route path="/lp" element={<LPSplash />} />
          <Route element={<LPLayout />}>
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
          </Route>
          
          {/* Venture Partner Routes */}
          <Route path="/venturepartners/auth" element={<Auth />} />
          
          {/* Protected Venture Partner Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<VPLayout />}>
              <Route path="/venturepartners/dashboard" element={<Dashboard />} />
              <Route path="/venturepartners/deals" element={<Deals />} />
              <Route path="/venturepartners/lps" element={<LPs />} />
              <Route path="/venturepartners/commissions" element={<Commissions />} />
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
