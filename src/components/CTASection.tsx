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
              max-width: 100%;
              padding: 1rem;
            }
            .hs-form-field {
              margin-bottom: 1.5rem;
            }
            .hs-form-field label {
              display: block;
              margin-bottom: 0.5rem;
              font-size: 1.125rem;
              color: #1A1F2C;
              font-weight: 500;
            }
            .hs-form input {
              width: 100%;
              height: 48px;
              padding: 0.75rem 1rem;
              border: 1px solid #E2E8F0;
              border-radius: 0.5rem;
              background-color: white;
              font-size: 1rem;
              transition: border-color 0.2s;
            }
            .hs-form input:focus {
              outline: none;
              border-color: #9b87f5;
              box-shadow: 0 0 0 3px rgba(155, 135, 245, 0.1);
            }
            .hs-error-msg {
              color: #EF4444;
              margin-top: 0.25rem;
              font-size: 0.875rem;
              display: block;
              font-weight: 500;
            }
            .hs-submit {
              margin-top: 1.5rem;
            }
            .hs-button {
              background-color: #1A1F2C !important;
              color: white !important;
              font-weight: 600 !important;
              padding: 1rem 2rem !important;
              border-radius: 0.5rem !important;
              border: none !important;
              cursor: pointer !important;
              width: 100% !important;
              font-size: 1rem !important;
              transition: all 0.2s ease-in-out !important;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
              text-transform: uppercase !important;
              letter-spacing: 0.025em !important;
            }
            .hs-button:hover {
              background-color: #2D3748 !important;
              transform: translateY(-1px) !important;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
            }
            .hs-button:active {
              transform: translateY(0) !important;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
            }
            .hs-form-required {
              color: #EF4444;
            }
            .inputs-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .hs-fieldtype-checkbox .hs-form-checkbox-display {
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }
            .no-list {
              list-style: none;
              padding: 0;
              margin: 4px 0;
            }
            label.hs-error-msg {
              color: #EF4444;
              font-size: 0.875rem;
              margin-top: 0.25rem;
              display: block;
            }
            .submitted-message {
              color: #059669;
              font-size: 1rem;
              padding: 1rem;
              border-radius: 0.5rem;
              background-color: #ECFDF5;
              margin-top: 1rem;
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
            className="p-12 bg-sply-dark rounded-lg text-white flex flex-col justify-center min-h-[500px]"
          >
            <h3 className="text-3xl font-bold mb-6">Submit A Deal</h3>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed">
              Founders, have a deal you want us to look at? Submit your pitch deck and round information, and let us get back to you. We appreciate your submission!
            </p>
            <Button
              className="w-full bg-[#D3E4FD] hover:bg-[#D3E4FD]/90 text-gray-800 py-6 text-lg"
              onClick={() => window.location.href = "#contact"}
            >
              Submit Your Pitch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-12 bg-[#F8F9FC] rounded-lg min-h-[500px]"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900">Become an LP</h3>
            <p className="mb-8 text-gray-600 text-lg leading-relaxed">
              Interested in seeing our dealflow? We'd love to hear from you.
            </p>
            <div id="hubspot-form-container"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};