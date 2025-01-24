import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-sply-dark rounded-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Submit A Deal</h3>
            <p className="mb-6 text-gray-300">
              Founders, have a deal you want us to look at? Submit your pitch deck and round information, and let us get back to you. We appreciate your submission!
            </p>
            <Button
              className="w-full bg-[#D3E4FD] hover:bg-[#D3E4FD]/90 text-gray-800"
              onClick={() => window.location.href = "#contact"}
            >
              Submit Your Pitch
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};