
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
  return (
    <section className={`py-20 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl mx-auto text-left mb-16">
          {headerLabel && (
            <h3 className="text-sm md:text-base font-semibold mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-8 text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8 text-center">
                {feature.icon && (
                  <div className="mb-4 flex justify-center">
                    <feature.icon className="w-12 h-12 text-gray-900" />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
