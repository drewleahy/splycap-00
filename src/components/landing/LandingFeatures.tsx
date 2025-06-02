
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
  features: Feature[];
  className?: string;
}

export const LandingFeatures = ({ title, features, className = "" }: LandingFeaturesProps) => {
  return (
    <section className={`py-20 px-6 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
          {title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                {feature.icon && (
                  <div className="mb-4 flex justify-center">
                    <feature.icon className="w-12 h-12 text-sply-purple" />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
