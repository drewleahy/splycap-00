
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
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Headers */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <h3 className="text-xs sm:text-sm font-semibold mb-3 text-gray-600 uppercase tracking-wide">
                {headerLabel || "Why We're Investing"}
              </h3>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {body}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
