
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import LPSplash from "./pages/LPSplash";
import Deck from "./pages/lp/Deck";
import Thesis from "./pages/lp/Thesis";
import Schedule from "./pages/lp/Schedule";
import Memos from "./pages/lp/Memos";
import Criteria from "./pages/lp/Criteria";
import Protocol from "./pages/lp/Protocol";
import Screening from "./pages/lp/Screening";
import Bio from "./pages/lp/Bio";
import Workflow from "./pages/lp/Workflow";
import IRA from "./pages/lp/IRA";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/LP-Splash" element={<LPSplash />} />
          <Route path="/LP-Splash/Deck" element={<Deck />} />
          <Route path="/LP-Splash/Thesis" element={<Thesis />} />
          <Route path="/LP-Splash/Schedule" element={<Schedule />} />
          <Route path="/LP-Splash/Memos" element={<Memos />} />
          <Route path="/LP-Splash/Criteria" element={<Criteria />} />
          <Route path="/LP-Splash/Protocol" element={<Protocol />} />
          <Route path="/LP-Splash/Screening" element={<Screening />} />
          <Route path="/LP-Splash/Bio" element={<Bio />} />
          <Route path="/LP-Splash/Workflow" element={<Workflow />} />
          <Route path="/LP-Splash/IRA" element={<IRA />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
