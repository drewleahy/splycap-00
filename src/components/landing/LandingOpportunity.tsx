
import React from 'react';

interface OpportunitySection {
  header: string;
  body: string;
}

interface LandingOpportunityProps {
  title: string;
  body: string;
  keyPoints?: string[];
  sections?: OpportunitySection[];
  headerLabel?: string;
  className?: string;
}

export const LandingOpportunity = ({ 
  title, 
  body, 
  keyPoints = [],
  sections = [],
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
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            {title}
          </h2>
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-10">
          {body}
        </p>
        
        {/* Structured sections layout */}
        {sections.length > 0 && (
          <div className="space-y-8 sm:space-y-10">
            {sections.map((section, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-6 sm:pl-8">
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                  {section.header}
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Fallback to original bullet points if no sections provided */}
        {sections.length === 0 && keyPoints.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2"></div>
                <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
