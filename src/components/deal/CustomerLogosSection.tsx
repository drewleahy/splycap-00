
import React from 'react';

interface CustomerLogosSectionProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export const CustomerLogosSection = ({ 
  imageSrc, 
  imageAlt, 
  className = "" 
}: CustomerLogosSectionProps) => {
  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <img 
            src={imageSrc} 
            alt={imageAlt}
            className="w-full max-w-5xl mx-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
};
