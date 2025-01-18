import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const CTASection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your interest!",
      description: "We'll be in touch soon.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-gray-100 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Submit A Deal</h3>
            <p className="mb-6 text-gray-600">
              Founders, have a deal you want us to look at? Submit your pitch deck and round
              information.
            </p>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => window.location.href = "#contact"}
            >
              Submit Your Pitch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-gray-100 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Become an LP</h3>
            <p className="mb-6 text-gray-600">
              Interested in seeing our dealflow? We'd love to hear from you.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                required
              />
              <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                Get Started
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};