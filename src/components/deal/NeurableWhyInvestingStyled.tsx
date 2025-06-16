
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const NeurableWhyInvestingStyled = () => {
  const investmentPoints = [
    {
      title: "Defensible IP Portfolio",
      description: "Early patents protecting EEG signal capture and real-time cognitive state tracking"
    },
    {
      title: "Capital-Light Growth Model", 
      description: "OEM licensing + defense funding model means low burn and scalable revenue"
    },
    {
      title: "Acquirer-Ready Architecture",
      description: "Active conversations with Apple, Meta, Samsung"
    },
    {
      title: "Strategic Board & Support",
      description: "Includes Mithril Capital and Pace Ventures"
    },
    {
      title: "Strong Exit Precedents",
      description: "CTRL-Labs (Meta), Axonics (Boston Scientific), Blackrock Neuro (Tether)"
    },
    {
      title: "Projected 3–4x step-up in Series B valuation",
      description: ""
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
            Why We're Investing
          </h3>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            IP Moat + Exit Signals
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {investmentPoints.map((point, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-gray-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-5 sm:p-6 lg:p-7 text-left">
                <div className="mb-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-900">
                      {point.title}
                    </h3>
                    {point.description && (
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                        {point.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-700 via-gray-800 to-slate-700" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
