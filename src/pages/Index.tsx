
import { Hero } from "@/components/Hero";
import { CTASection } from "@/components/CTASection";
import { InvestmentFocus } from "@/components/InvestmentFocus";
import { InvestmentPhilosophy } from "@/components/InvestmentPhilosophy";
import { OurAllocations } from "@/components/OurAllocations";
import { Partners } from "@/components/Partners";
import { PodcastSection } from "@/components/PodcastSection";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Index() {
  return (
    <div>
      <div className="fixed top-6 right-6 z-50">
        <Link 
          to="/venturepartners/auth" 
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          Venture Partner Portal <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Hero />
      <InvestmentPhilosophy />
      <InvestmentFocus />
      <OurAllocations />
      <Partners />
      <PodcastSection />
      <CTASection />
      <Footer />
    </div>
  );
}
