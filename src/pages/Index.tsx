
import { Hero } from "@/components/Hero";
import { InvestmentFocus } from "@/components/InvestmentFocus";
import { Partners } from "@/components/Partners";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { InvestmentPhilosophy } from "@/components/InvestmentPhilosophy";
import { OurAllocations } from "@/components/OurAllocations";
import { PodcastSection } from "@/components/PodcastSection";
import { AnimatedWords } from "@/components/AnimatedWords";
import { useIsMobile } from "@/hooks/use-mobile";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AnimatedWords />
      {isMobile ? (
        <>
          <InvestmentPhilosophy />
          <InvestmentFocus />
          <Partners />
          <OurAllocations />
          <PodcastSection />
        </>
      ) : (
        <>
          <InvestmentFocus />
          <InvestmentPhilosophy />
          <Partners />
          <OurAllocations />
          <PodcastSection />
        </>
      )}
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
