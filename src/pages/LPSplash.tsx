
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LPLayout } from "@/components/LPLayout";

const Section = ({ title, items }: { title: string; items: { name: string; path: string }[] }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-sply-dark">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 hover:text-sply-purple transition-colors">
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const LPSplash = () => {
  const regularSections = [
    {
      title: "SPLY CAPITAL",
      items: [
        { name: "Deck", path: "/LP-Splash/Deck" },
        { name: "Thesis", path: "/LP-Splash/Thesis" }
      ]
    },
    {
      title: "PORTFOLIO",
      items: [
        { name: "Schedule of Investments", path: "/LP-Splash/Schedule" },
        { name: "Brief Company Memos", path: "/LP-Splash/Memos" }
      ]
    },
    {
      title: "INVESTMENT PROCESS",
      items: [
        { name: "Investment Criteria", path: "/LP-Splash/Criteria" },
        { name: "Valuation Protocol", path: "/LP-Splash/Protocol" },
        { name: "Investment Screening Process", path: "/LP-Splash/Screening" }
      ]
    },
    {
      title: "TEAM AND ADVISORS",
      items: [
        { name: "Team Bios", path: "/LP-Splash/Bio" }
      ]
    }
  ];

  const operationsSection = {
    title: "OPERATIONS",
    items: [
      { name: "Investment Workflow & Reporting", path: "/LP-Splash/Workflow" },
      { name: "Direct IRA Investment Information", path: "/LP-Splash/IRA" }
    ]
  };

  return (
    <LPLayout>
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/lovable-uploads/b775e78f-bfa7-4461-bacc-8661144da34b.png" 
            alt="Sparkler background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen">
          <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <img
                src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
                alt="SPLYCAPITAL"
                className="h-12 mx-auto mb-8"
              />
              <h1 className="text-4xl font-bold text-white mb-6 text-shadow-lg">
                Are you ready to work with us?
              </h1>
            </div>
            
            {/* Regular sections in grid */}
            <div className="grid gap-8 md:grid-cols-2 mb-8">
              {regularSections.map((section, index) => (
                <Section key={index} title={section.title} items={section.items} />
              ))}
            </div>

            {/* Operations section centered */}
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <Section title={operationsSection.title} items={operationsSection.items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LPLayout>
  );
};

export default LPSplash;
