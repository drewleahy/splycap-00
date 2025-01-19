import { Hero } from "@/components/Hero";
import { InvestmentFocus } from "@/components/InvestmentFocus";
import { Partners } from "@/components/Partners";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InvestmentPhilosophy } from "@/components/InvestmentPhilosophy";
import { PastInvestments } from "@/components/PastInvestments";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Hero />
      {isMobile ? (
        <>
          <InvestmentPhilosophy />
          <InvestmentFocus />
          <PastInvestments />
          <Partners />
        </>
      ) : (
        <>
          <InvestmentFocus />
          <InvestmentPhilosophy />
          <PastInvestments />
          <Partners />
        </>
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;