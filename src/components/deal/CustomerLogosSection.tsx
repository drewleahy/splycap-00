
import React from 'react';

interface CustomerLogosSectionProps {
  className?: string;
}

export const CustomerLogosSection = ({ className = "" }: CustomerLogosSectionProps) => {
  return (
    <section className={`py-12 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
            Trusted by Industry Leaders
          </h2>
        </div>
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/fbe3e75b-4b9a-46bf-8a12-abf3f7955719.png" 
            alt="Customer logos including Google, 3M, Illumina, Rolex, CREE, STI, Amazon, NASA, Waymo, Broadcom, Coherent, Apple, Hologic, Western Digital, ExxonMobil, Solugen, Continental, IBM, Fujifilm, Rixtron, Solvay, Toshiba, Skyworks, Intel, Canon, Meta, Qualcomm, SK Hynix"
            className="w-full max-w-5xl h-auto"
          />
        </div>
      </div>
    </section>
  );
};
