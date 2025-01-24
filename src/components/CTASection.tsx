import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

declare global {
  interface Window {
    hbspt: any;
  }
}

export const CTASection = () => {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    document.head.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "45246649",
          formId: "aa7c9602-fe5e-4224-82ae-aa19cb35a1a7",
          target: "#hubspot-form-container"
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-sply-dark rounded-lg text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Submit A Deal</h3>
            <p className="mb-6 text-gray-300">
              Founders, have a deal you want us to look at? Submit your pitch deck and round information, and let us get back to you. We appreciate your submission!
            </p>
            <Button
              className="bg-[#D3E4FD] hover:bg-[#D3E4FD]/90 text-gray-800 px-6 py-2 text-sm"
              onClick={() => window.location.href = "#contact"}
            >
              Submit Your Pitch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-sply-dark rounded-lg text-white"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Become an LP</h3>
            <div id="hubspot-form-container"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};