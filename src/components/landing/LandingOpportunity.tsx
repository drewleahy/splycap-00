
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface LandingOpportunityProps {
  title: string;
  body: string;
  keyPoints: string[];
  headerLabel?: string;
  className?: string;
}

export const LandingOpportunity = ({ 
  title, 
  body, 
  keyPoints, 
  headerLabel,
  className = "" 
}: LandingOpportunityProps) => {
  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
            {headerLabel || "Why We're Investing"}
          </h3>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
            {title}
          </h2>
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
          {body}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start space-x-3 p-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-1" />
              <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
