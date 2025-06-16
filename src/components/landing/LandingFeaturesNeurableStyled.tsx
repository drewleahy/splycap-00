
import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
}

interface LandingFeaturesNeurableStyledProps {
  title: string;
  description: string;
  features: Feature[];
  headerLabel?: string;
  className?: string;
}

/**
 * Neurable-specific styled features component with 6 tiles in 2 rows of 3 each
 */
export const LandingFeaturesNeurableStyled = ({
  title,
  description,
  features,
  headerLabel,
  className = ""
}: LandingFeaturesNeurableStyledProps) => {
  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-8 sm:mb-12">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-4 text-slate-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Grid layout: 2 rows of 3 tiles each */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
