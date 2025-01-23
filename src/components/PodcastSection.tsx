import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const PodcastSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for your interest!",
      description: "We'll be in touch about the podcast soon.",
    });
    setEmail("");
  };

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">FAMILY MONIES</h2>
            <p className="text-xl text-gray-600 mb-4">
              The #1 Investment Podcast for Families to Tell Entrepreneurial Stories
            </p>
            <div className="bg-red-500 text-white py-2 px-4 inline-block rounded-full mb-8">
              TAPING NOW - COMING SOON!
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Want to Share Your Story?</h3>
              <p className="text-gray-600 mb-6">
                Join us on Family Monies and share your entrepreneurial journey with our community
                of family businesses and investors.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit">
                    Get on the Pod
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative h-[600px] w-full">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/lovable-uploads/fc77e80c-3e4b-4b69-af99-33203f09def9.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white text-shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Are you ready to work with us?
          </motion.h2>
        </div>
      </section>
    </>
  );
};