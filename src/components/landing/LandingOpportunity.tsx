import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LandingOpportunityProps {
  title: string;
  body: string;
  keyPoints?: string[];
  sections?: Array<{
    header: string;
    body: string;
  }>;
  headerLabel?: string;
  className?: string;
}

export const LandingOpportunity = ({ 
  title, 
  body, 
  keyPoints, 
  sections, 
  headerLabel,
  className = "" 
}: LandingOpportunityProps) => {
  // Split the body text into paragraphs based on double line breaks
  const paragraphs = body.split('\n\n').filter(paragraph => paragraph.trim() !== '');

  // Function to bold specific words
  const formatTextWithBoldWords = (text: string) => {
    console.log('Original text:', text);
    
    // Priority order - most specific phrases first to avoid conflicts
    const wordsTooBold = [
      '$3 million raise',
      '$20 million growth financing round', 
      '$1.25B valuation cap',
      'projected valuation exceeding $2B',
      '2X warrant coverage',
      // Then individual amounts - removed $1.2B to avoid conflict with "$1.25B valuation cap"
      '$20 million',
      '$3 million',
      '$2B',
      // Companies and terms
      'semiconductors', 'semiconductor', 'aerospace', 'life sciences', 'life science industries', 'quantum computing', 'quantum', 
      'nSpec™', 'nControl™', 'CubeFab™', 'Founders Fund', 'Investment Corporation of Dubai', 'Intel', 'Meta', 'Amazon', 
      'Canon', 'Illumina', 'Google'
    ];
    
    let formattedText = text;
    
    wordsTooBold.forEach(word => {
      const lowerText = formattedText.toLowerCase();
      const lowerWord = word.toLowerCase();
      
      // Find all occurrences of the word
      let searchIndex = 0;
      while (true) {
        const foundIndex = lowerText.indexOf(lowerWord, searchIndex);
        if (foundIndex === -1) break;
        
        // Check if this text is already inside bold markers
        const beforeText = formattedText.substring(0, foundIndex);
        const afterText = formattedText.substring(foundIndex + word.length);
        
        // Count bold markers before this position
        const boldMarkersBeforeCount = (beforeText.match(/\*\*/g) || []).length;
        
        // If we have an odd number of bold markers before, we're inside a bold section
        const isInsideBold = boldMarkersBeforeCount % 2 === 1;
        
        if (!isInsideBold) {
          // Replace the text with bold markers
          const matchedText = formattedText.substring(foundIndex, foundIndex + word.length);
          formattedText = beforeText + '**' + matchedText + '**' + afterText;
          console.log('Bolded:', word, 'at position', foundIndex);
          
          // Update the search text for the next iteration
          searchIndex = foundIndex + word.length + 4; // +4 for the ** markers
        } else {
          searchIndex = foundIndex + 1;
        }
      }
    });
    
    console.log('Final formatted text:', formattedText);
    
    // Split by ** to create spans with bold formatting
    const parts = formattedText.split('**');
    
    return parts.map((part, index) => {
      // Every odd index should be bold
      if (index % 2 === 1) {
        console.log('Making bold:', part);
        return <strong key={index} className="font-semibold text-gray-900">{part}</strong>;
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
        
        {sections && sections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {formatTextWithBoldWords(section.header)}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {formatTextWithBoldWords(section.body)}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {keyPoints && keyPoints.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                  {formatTextWithBoldWords(point)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
