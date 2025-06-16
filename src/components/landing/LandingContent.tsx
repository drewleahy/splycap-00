
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LandingContentProps {
  title: string;
  body: string;
  headerLabel?: string;
  keyPoints?: string[];
  additionalContent?: string;
  className?: string;
}

export const LandingContent = ({ 
  title, 
  body, 
  headerLabel,
  keyPoints,
  additionalContent,
  className = "" 
}: LandingContentProps) => {
  // Check if this is being used on the Neurable page
  const isNeurable = window.location.pathname.includes('neurable');
  
  // Split the body text into paragraphs based on double line breaks
  const paragraphs = body.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  // Function to bold specific words
  const formatTextWithBoldWords = (text: string) => {
    const wordsTooBold = ['semiconductors', 'aerospace', 'life sciences', 'quantum computing', 'nSpec™', 'nControl™', 'CubeFab™', 'Founders Fund', 'Investment Corporation of Dubai', 'Intel', 'Meta', 'Amazon', 'Canon', 'Illumina'];
    let formattedText = text;
    
    wordsTooBold.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      formattedText = formattedText.replace(regex, `**${word}**`);
    });
    
    // Split by ** to create spans with bold formatting
    const parts = formattedText.split('**');
    
    return parts.map((part, index) => {
      // Every odd index should be bold
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  // Apply Neurable-specific styling
  const sectionBg = isNeurable ? "bg-gray-50" : "bg-white";
  const headerColor = isNeurable ? "text-emerald-700" : "text-gray-600";
  const titleColor = isNeurable ? "text-gray-900" : "text-gray-900";
  const bodyColor = isNeurable ? "text-gray-700" : "text-gray-700";

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 ${sectionBg} ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8 sm:mb-12">
          {headerLabel && (
            <h3 className={`text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-6 ${headerColor} uppercase tracking-wider`}>
              {headerLabel}
            </h3>
          )}
          <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 ${titleColor} leading-tight`}>
            {title}
          </h2>
        </div>
        
        <div className="mb-12 sm:mb-16">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-base sm:text-lg md:text-xl ${bodyColor} leading-relaxed mb-8 last:mb-0`}
            >
              {formatTextWithBoldWords(paragraph)}
            </p>
          ))}
        </div>
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {keyPoints.map((point, index) => (
              <Card 
                key={index} 
                className={isNeurable 
                  ? "group relative overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  : "group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                }
              >
                {!isNeurable && <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                <CardContent className="relative p-6 sm:p-8 text-center">
                  <p className={`text-base sm:text-lg font-bold ${isNeurable ? 'text-gray-900' : 'text-gray-900'} leading-tight`}>
                    {formatTextWithBoldWords(point)}
                  </p>
                </CardContent>
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${isNeurable ? 'bg-emerald-600' : 'bg-gradient-to-r from-gray-900 via-black to-gray-900'}`} />
              </Card>
            ))}
          </div>
        )}
        
        {additionalContent && (
          <div className="mt-12">
            <p className={`text-base sm:text-lg md:text-xl ${bodyColor} leading-relaxed`}>
              {formatTextWithBoldWords(additionalContent)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
