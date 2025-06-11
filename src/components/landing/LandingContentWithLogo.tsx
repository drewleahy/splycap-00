
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
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <img 
              src={logoSrc} 
              alt={logoAlt} 
              className="h-10 sm:h-12 md:h-16 mb-3 sm:mb-0 sm:mr-4"
            />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              Adopted by Global Leaders Across Precision Industries
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12">
          Nanotronics has secured commercial traction with over 250 customers across 34 countries, spanning semiconductors, aerospace, life sciences, and quantum computing
        </p>
        
        {keyStats && keyStats.length > 0 && (
          <>
            <div className="border-l border-gray-300 pl-4 sm:pl-6 mb-8 sm:mb-12">
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start sm:items-center">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mr-3 sm:mr-4 flex-shrink-0 mt-2 sm:mt-0"></div>
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
                    Exclusive optical inspection partner for Google's Willow quantum chip
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mr-3 sm:mr-4 flex-shrink-0 mt-2 sm:mt-0"></div>
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
                    Deployed by Illumina for high-throughput genomic sequencing
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-1 h-1 bg-gray-900 rounded-full mr-3 sm:mr-4 flex-shrink-0 mt-2 sm:mt-0"></div>
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 leading-tight">
                    Used in Broadcom, Intel, Amazon, Meta, Canon, and other leading manufacturing environments
                  </span>
                </li>
              </ul>
            </div>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12">
              Nanotronics' systems—nSpec™ for inspection and nControl™ for process optimization—are being scaled globally through strategic partnerships and modular CubeFab™ deployments.
            </p>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Nanotronics' systems—nSpec™ for inspection and nControl™ for process optimization—are being scaled globally through strategic partnerships and modular CubeFab™ deployments.
            </p>
          </>
        )}
      </div>
    </section>
  );
};
