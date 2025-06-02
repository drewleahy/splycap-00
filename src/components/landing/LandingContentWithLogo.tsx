
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
    <section className={`py-16 px-6 bg-white ${className}`}>
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
        
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-8">
          <div className="lg:w-1/3 flex justify-center lg:justify-start">
            <img 
              src={logoSrc} 
              alt={logoAlt}
              className="max-w-full h-auto max-h-32 object-contain"
            />
          </div>
          
          <div className="lg:w-2/3">
            <div className="text-base md:text-lg text-gray-700 leading-relaxed">
              {body.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-6' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {keyStats && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {keyStats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center">
                  <div className="text-lg md:text-xl font-bold">
                    {stat}
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
