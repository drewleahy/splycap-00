import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-white text-gray-900 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src="/lovable-uploads/f7a927cd-a039-40ff-82ba-7da595d28922.png"
          alt="SPLYCAPITAL"
          className="h-24 mx-auto mb-8"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Access to Elite Investment Opportunities
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          Finding "best in class" deals that investors wouldn't normally have access to
        </motion.p>
      </div>
    </section>
  );
};