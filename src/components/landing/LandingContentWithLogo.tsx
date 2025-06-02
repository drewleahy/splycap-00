
import React from 'react';

interface LandingContentWithLogoProps {
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  keyStats?: string[];
  className?: string;
}

export const LandingContentWithLogo = ({ 
  title, 
  body, 
  logoSrc, 
  logoAlt, 
  keyStats,
  className = "" 
}: LandingContentWithLogoProps) => {
  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="flex items-center mb-8">
          <img 
            src={logoSrc} 
            alt={logoAlt} 
            className="h-8 md:h-10 mr-4"
          />
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
          {body}
        </p>
        
        {keyStats && keyStats.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4">
            {keyStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center"
              >
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  {stat}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
