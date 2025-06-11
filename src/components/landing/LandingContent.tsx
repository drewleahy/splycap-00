
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
  // Split the body text into paragraphs based on double line breaks
  const paragraphs = body.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  // Function to bold specific words
  const formatTextWithBoldWords = (text: string) => {
    const wordsTooBold = ['semiconductors', 'aerospace', 'life sciences', 'quantum computing', 'nSpec™', 'nControl™', 'CubeFab™'];
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
        
        <div className="mb-8 sm:mb-12">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 last:mb-0"
            >
              {formatTextWithBoldWords(paragraph)}
            </p>
          ))}
        </div>
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {keyPoints.map((point, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative p-4 sm:p-8 text-center">
                  <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight">
                    {point}
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-black to-gray-900" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
