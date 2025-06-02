
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface LandingOpportunityProps {
  title: string;
  body: string;
  keyPoints: string[];
  className?: string;
}

export const LandingOpportunity = ({ 
  title, 
  body, 
  keyPoints, 
  className = "" 
}: LandingOpportunityProps) => {
  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-sply-purple uppercase tracking-wide">
            The Opportunity
          </h3>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
            {title}
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
          {body}
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-lg text-gray-700">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
