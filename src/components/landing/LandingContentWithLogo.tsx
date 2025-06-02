
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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
              className="h-8 md:h-10 mr-4"
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
          <div className="grid md:grid-cols-3 gap-6">
            {keyStats.map((stat, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full opacity-90" />
                  </div>
                  <p className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                    {stat}
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
