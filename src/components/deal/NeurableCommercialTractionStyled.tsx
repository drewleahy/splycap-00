import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const NeurableCommercialTractionStyled = () => {
  const tractionPoints = [
    "Closed strategic licensing and co-development contracts with Sony and Samsung.",
    "$5M+ in U.S. defense R&D grants secured, including work with DARPA and other innovation units.",
    "Master & Dynamic is a commercial partner, actively selling thousands of Neurable-enabled units.",
    "Commercial product lines developed in partnership with leading manufacturers will launch in 2025",
    "Targeting $25 million in revenue from commercial product launches in 2025."
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
            Commercial Traction
          </h3>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            Defense and Industrial Revenues Building Toward Scale
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {tractionPoints.map((point, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-5 sm:p-6 lg:p-7 text-left">
                <div className="mb-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
