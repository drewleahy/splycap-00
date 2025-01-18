import { Briefcase, Building2, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const investments = [
  {
    title: "Off Market VC Deals",
    description: "Exclusive access to high-potential venture capital opportunities",
    icon: Briefcase,
  },
  {
    title: "Private Capital Opportunities",
    description: "Strategic investments in private market opportunities",
    icon: Building2,
  },
  {
    title: "Evergreen Trade Finance Vehicle",
    description: "Sustainable and recurring investment opportunities",
    icon: LineChart,
  },
];

export const InvestmentFocus = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Investment Focus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <investment.icon className="w-12 h-12 text-sply-purple mb-4" />
              <h3 className="text-xl font-semibold mb-3">{investment.title}</h3>
              <p className="text-gray-600">{investment.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};