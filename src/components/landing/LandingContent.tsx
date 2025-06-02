
import React from 'react';

interface LandingContentProps {
  title: string;
  body: string;
  headerLabel?: string;
  className?: string;
  keyPoints?: string[];
}

export const LandingContent = ({ 
  title, 
  body, 
  headerLabel, 
  className = "",
  keyPoints
}: LandingContentProps) => {
  return (
    <section className={`py-16 px-6 ${className}`}>
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
        
        <div className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
          {body.split('\n\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-6' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {keyPoints && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {keyPoints.map((point, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="text-lg md:text-xl font-bold text-gray-900">
                    {point}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
