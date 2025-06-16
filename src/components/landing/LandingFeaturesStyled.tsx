
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconName?: string;
}

interface LandingFeaturesStyledProps {
  title: string;
  description?: string;
  features: Feature[];
  headerLabel?: string;
  className?: string;
}

/**
 * Styled features section for Neurable with grey/black/white/dark blue palette.
 */
export const LandingFeaturesStyled = ({ 
  title, 
  description,
  features, 
  headerLabel,
  className = "" 
}: LandingFeaturesStyledProps) => {
  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-transparent to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-4 sm:p-5 lg:p-8 text-center">
                {feature.icon && (
                  <div className="mb-3 lg:mb-4 flex justify-center">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-slate-700" />
                  </div>
                )}
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-700 via-gray-800 to-slate-700" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
