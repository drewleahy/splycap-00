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
    <section className="py-20 px-4 bg-gradient-to-br from-sply-dark to-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4">Submit A Deal</h3>
            <p className="mb-6">
              Founders, have a deal you want us to look at? Submit your pitch deck and round
              information.
            </p>
            <Button
              className="w-full bg-sply-purple hover:bg-sply-purple/90"
              onClick={() => window.location.href = "#contact"}
            >
              Submit Your Pitch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-white/10 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4">Become an LP</h3>
            <p className="mb-6">
              Interested in seeing our dealflow? We'd love to hear from you.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                required
              />
              <Button type="submit" className="w-full bg-sply-purple hover:bg-sply-purple/90">
                Get Started
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};