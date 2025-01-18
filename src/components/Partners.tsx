import { motion } from "framer-motion";

const partners = [
  {
    name: "Tyler Williams",
    role: "General Partner",
    location: "Dallas, TX",
  },
  {
    name: "Omar Marquez",
    role: "General Partner",
    location: "Portland, OR",
  },
  {
    name: "Drew Leahy",
    role: "General Partner",
    location: "Ann Arbor, MI",
  },
];

export const Partners = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-sm text-center"
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{partner.name}</h3>
              <p className="text-gray-600 mb-2">{partner.role}</p>
              <p className="text-gray-800">{partner.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};