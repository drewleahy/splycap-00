import { motion } from "framer-motion";

const investments = [
  { name: "INSTREAMATIC", logo: "/lovable-uploads/51915a5a-a0d4-41ea-86c6-167bd8ff1d4a.png" },
  { name: "Postscript", logo: "/lovable-uploads/51915a5a-a0d4-41ea-86c6-167bd8ff1d4a.png" },
  { name: "sway", logo: "/lovable-uploads/51915a5a-a0d4-41ea-86c6-167bd8ff1d4a.png" },
  { name: "superfiliate", logo: "/lovable-uploads/51915a5a-a0d4-41ea-86c6-167bd8ff1d4a.png" },
  { name: "Burgerville", logo: "/lovable-uploads/72f9c791-ffdb-4dcc-b146-ce52cecdf3a7.png" },
  { name: "Blink Health", logo: "/lovable-uploads/72f9c791-ffdb-4dcc-b146-ce52cecdf3a7.png" },
  { name: "Klear", logo: "/lovable-uploads/72f9c791-ffdb-4dcc-b146-ce52cecdf3a7.png" },
  { name: "Sleepyhead", logo: "/lovable-uploads/72f9c791-ffdb-4dcc-b146-ce52cecdf3a7.png" },
  { name: "Hammerspace", logo: "/lovable-uploads/72f9c791-ffdb-4dcc-b146-ce52cecdf3a7.png" },
];

export const PastInvestments = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Past Investments</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {investments.map((investment, index) => (
            <motion.div
              key={investment.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center"
            >
              <div className="w-full aspect-[3/2] relative flex items-center justify-center">
                <img
                  src={investment.logo}
                  alt={`${investment.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};