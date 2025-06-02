
import React from 'react';

interface LandingContentProps {
  title: string;
  body: string;
  className?: string;
}

export const LandingContent = ({ title, body, className = "" }: LandingContentProps) => {
  return (
    <section className={`py-16 px-6 bg-white ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-900">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          {body}
        </p>
      </div>
    </section>
  );
};
