
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconName?: string;
}

interface LandingFeaturesProps {
  title: string;
  description?: string;
  features: Feature[];
  headerLabel?: string;
  className?: string;
}

export const LandingFeatures = ({ 
  title, 
  description,
  features, 
  headerLabel,
  className = "" 
}: LandingFeaturesProps) => {
  // Check if this is being used on the Neurable page
  const isNeurable = window.location.pathname.includes('neurable');

  // Apply Neurable-specific styling
  const sectionBg = isNeurable ? "bg-white" : "bg-white";
  const headerColor = isNeurable ? "text-emerald-700" : "text-gray-600";
  const titleColor = isNeurable ? "text-gray-900" : "text-gray-900";
  const descColor = isNeurable ? "text-gray-700" : "text-gray-700";

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 ${sectionBg} ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
          {headerLabel && (
            <h3 className={`text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-6 ${headerColor} uppercase tracking-wider`}>
              {headerLabel}
            </h3>
          )}
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 ${titleColor} leading-tight`}>
            {title}
          </h2>
          {description && (
            <p className={`text-base sm:text-lg md:text-xl ${descColor} leading-relaxed`}>
              {description}
            </p>
          )}
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={isNeurable 
                ? "group relative overflow-hidden bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                : "group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              }
            >
              {!isNeurable && <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
              <CardContent className="relative p-4 sm:p-6 text-center">
                {feature.icon && (
                  <div className="mb-3 flex justify-center">
                    <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${isNeurable ? 'text-emerald-600' : 'text-gray-900'}`} />
                  </div>
                )}
                <h3 className={`text-sm sm:text-base font-bold mb-3 ${isNeurable ? 'text-gray-900' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-xs sm:text-sm ${isNeurable ? 'text-gray-600' : 'text-gray-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </CardContent>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${isNeurable ? 'bg-emerald-600' : 'bg-gradient-to-r from-gray-900 via-black to-gray-900'}`} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
