
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollHighlight } from '@/hooks/use-scroll-highlight';
import { useIsMobile } from '@/hooks/use-mobile';

interface LandingContentProps {
  title: string;
  body: string;
  headerLabel?: string;
  keyPoints?: string[];
  className?: string;
}

export const LandingContent = ({ 
  title, 
  body, 
  headerLabel,
  keyPoints,
  className = "" 
}: LandingContentProps) => {
  const { highlightedIndex, setElementRef } = useScrollHighlight();
  const isMobile = useIsMobile();
  
  // Check if this is the Commercial Traction section
  const isCommercialTraction = headerLabel === "Commercial Traction";
  
  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
            {title}
          </h2>
        </div>
        
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-12">
          {body}
        </p>
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {keyPoints.map((point, index) => {
              const isHighlighted = isMobile && isCommercialTraction && highlightedIndex === index;
              
              return (
                <Card 
                  key={index}
                  ref={isMobile && isCommercialTraction ? setElementRef(index) : undefined}
                  className={`group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                    isHighlighted 
                      ? 'animate-pulse bg-gradient-to-br from-yellow-100 via-yellow-50 to-white shadow-2xl scale-105 border-2 border-yellow-400' 
                      : ''
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isHighlighted ? 'opacity-20' : ''
                  }`} />
                  <CardContent className="relative p-4 sm:p-8 text-center">
                    <p className={`text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight ${
                      isHighlighted ? 'text-yellow-900' : ''
                    }`}>
                      {point}
                    </p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-black to-gray-900 ${
                    isHighlighted ? 'from-yellow-500 via-yellow-600 to-yellow-500' : ''
                  }`} />
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
