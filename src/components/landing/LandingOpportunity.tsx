
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollHighlight } from '@/hooks/use-scroll-highlight';
import { useIsMobile } from '@/hooks/use-mobile';

interface LandingOpportunityProps {
  title: string;
  body: string;
  keyPoints: string[];
  headerLabel?: string;
  className?: string;
}

export const LandingOpportunity = ({ 
  title, 
  body, 
  keyPoints, 
  headerLabel,
  className = "" 
}: LandingOpportunityProps) => {
  const { highlightedIndex, setElementRef } = useScrollHighlight();
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    console.log('LandingOpportunity render:', {
      headerLabel,
      isMobile,
      highlightedIndex,
      keyPointsLength: keyPoints?.length
    });
  }, [headerLabel, isMobile, highlightedIndex, keyPoints?.length]);

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
            {headerLabel || "Why We're Investing"}
          </h3>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            {title}
          </h2>
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
          {body}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {keyPoints.map((point, index) => {
            const shouldHighlight = isMobile;
            const isHighlighted = shouldHighlight && highlightedIndex === index;
            
            console.log(`Rendering opportunity card ${index}:`, {
              shouldHighlight,
              isHighlighted,
              point: point.substring(0, 20) + '...'
            });

            return (
              <Card
                key={index}
                ref={shouldHighlight ? setElementRef(index) : undefined}
                className={`group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isHighlighted 
                    ? 'animate-pulse bg-gradient-to-br from-yellow-100 via-yellow-50 to-white shadow-2xl scale-105 border-2 border-yellow-400' 
                    : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isHighlighted ? 'opacity-20' : ''
                }`} />
                <CardContent className="relative p-4 sm:p-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5 ${
                      isHighlighted ? 'text-yellow-600' : ''
                    }`} />
                    <span className={`text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed ${
                      isHighlighted ? 'text-yellow-900 font-semibold' : ''
                    }`}>
                      {point}
                    </span>
                  </div>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-black to-gray-900 ${
                  isHighlighted ? 'from-yellow-500 via-yellow-600 to-yellow-500' : ''
                }`} />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
