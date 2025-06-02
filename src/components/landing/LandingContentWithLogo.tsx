import React from 'react';

interface LandingContentWithLogoProps {
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  headerLabel?: string;
  keyStats?: string[];
  className?: string;
}

export const LandingContentWithLogo = ({ 
  title, 
  body, 
  logoSrc, 
  logoAlt, 
  headerLabel,
  keyStats,
  className = "" 
}: LandingContentWithLogoProps) => {
  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8">
          {headerLabel && (
            <h3 className="text-sm md:text-base font-semibold mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <div className="flex items-center mb-8">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="h-12 md:h-16 mr-4"
            />
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              {title}
            </h2>
          </div>
        </div>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">
          {body}
        </p>
        
        {keyStats && keyStats.length > 0 && (
          <div className="border-l-4 border-gray-900 pl-6">
            <ul className="space-y-3">
              {keyStats.map((stat, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-base md:text-lg font-semibold text-gray-900">
                    {stat}
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
