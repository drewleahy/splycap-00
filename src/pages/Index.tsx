import { Hero } from "@/components/Hero";
import { InvestmentFocus } from "@/components/InvestmentFocus";
import { Partners } from "@/components/Partners";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <InvestmentFocus />
      <Partners />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;