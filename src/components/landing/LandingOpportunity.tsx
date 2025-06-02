
import React from 'react';

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
  // Add extra bottom margin for Strategic Backing section
  const isStrategicBacking = headerLabel === "Strategic Backing";
  const sectionClassName = isStrategicBacking 
    ? `py-16 px-6 bg-gray-50 mb-12 ${className}`
    : `py-16 px-6 bg-gray-50 ${className}`;

  return (
    <section className={sectionClassName}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8">
          {headerLabel && (
            <h3 className="text-sm md:text-base font-semibold mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">
          {body}
        </p>
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="border-l-4 border-gray-900 pl-6">
            <ul className="space-y-3">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-base md:text-lg font-semibold text-gray-900">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
