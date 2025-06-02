
import React from 'react';

interface LandingContentWithLogoProps {
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  className?: string;
}

export const LandingContentWithLogo = ({ 
  title, 
  body, 
  logoSrc, 
  logoAlt, 
  className = "" 
}: LandingContentWithLogoProps) => {
  return (
    <section className={`py-16 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8 flex justify-center">
          <img 
            src={logoSrc} 
            alt={logoAlt}
            className="h-16 md:h-20 object-contain"
          />
        </div>
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-900 text-center">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {body}
        </p>
      </div>
    </section>
  );
};
