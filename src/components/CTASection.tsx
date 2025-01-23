import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

declare global {
  interface Window {
    hbspt: any;
  }
}

export const CTASection = () => {
  useEffect(() => {
    // Load HubSpot script
    const script = document.createElement('script');
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "45246649",
          formId: "aa7c9602-fe5e-4224-82ae-aa19cb35a1a7",
          target: "#hubspot-form-container",
          css: `
            .hs-form {
              font-family: inherit;
            }
            .hs-form input {
              width: 100%;
              height: 40px;
              padding: 8px 12px;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
              background-color: white;
              margin-bottom: 16px;
            }
            .hs-form .hs-button {
              background-color: #1a1f2c;
              color: white;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            }
            .hs-form .hs-button:hover {
              background-color: #2d3748;
            }
          `
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-20 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 bg-sply-dark rounded-lg text-white flex flex-col justify-center"
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
            <div id="hubspot-form-container"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};