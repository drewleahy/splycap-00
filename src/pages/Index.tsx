import { Hero } from "@/components/Hero";
import { InvestmentFocus } from "@/components/InvestmentFocus";
import { Partners } from "@/components/Partners";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InvestmentPhilosophy } from "@/components/InvestmentPhilosophy";
import { PastInvestments } from "@/components/PastInvestments";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <InvestmentFocus />
      <InvestmentPhilosophy />
      <PastInvestments />
      <Partners />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;