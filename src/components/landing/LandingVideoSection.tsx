
import React from 'react';

interface LandingVideoSectionProps {
  videoUrl: string;
  title?: string;
  description?: string;
  className?: string;
}

export const LandingVideoSection = ({
  videoUrl,
  title = "Watch the Video",
  description,
  className = ""
}: LandingVideoSectionProps) => {
  return (
    <section id="video" className={`py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg sm:text-xl mb-8 text-gray-600 text-center max-w-2xl mx-auto">
            {description}
          </p>
        )}
        
        <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Investment Opportunity Video"
          />
        </div>
      </div>
    </section>
  );
};
