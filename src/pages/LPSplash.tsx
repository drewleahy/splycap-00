
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <Card className="mb-8 hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-sply-dark">{title}</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-600 hover:text-sply-purple transition-colors">
            {item}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const LPSplash = () => {
  const sections = [
    {
      title: "SPLY CAPITAL",
      items: ["Deck", "Thesis"]
    },
    {
      title: "PORTFOLIO",
      items: ["Schedule of Investments", "Brief Company Memos"]
    },
    {
      title: "INVESTMENT PROCESS",
      items: ["Investment Criteria", "Valuation Protocol", "Investment Screening Process"]
    },
    {
      title: "TEAM AND ADVISORS",
      items: ["Bio"]
    },
    {
      title: "OPERATIONS",
      items: ["Workflow", "Direct IRA Investment Information"]
    },
    {
      title: "LP PORTAL",
      items: ["Mockup"]
    },
    {
      title: "LEGAL CONTRACTS",
      items: ["LP Agreements"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <img
            src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
            alt="SPLYCAPITAL"
            className="h-12 mx-auto mb-8"
          />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {sections.map((section, index) => (
            <Section key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LPSplash;
