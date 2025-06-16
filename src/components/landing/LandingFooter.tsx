
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterLink {
  text: string;
  url: string;
}

interface LandingFooterProps {
  copyright: string;
  links?: FooterLink[];
  className?: string;
}

export const LandingFooter = ({ copyright, links, className = "" }: LandingFooterProps) => {
  return (
    <footer className={`py-8 sm:py-12 px-4 sm:px-6 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="block">
              <img 
                src="/lovable-uploads/86042c2d-fd71-488f-8f31-22569d955254.png" 
                alt="SPLYCAP" 
                className="h-16 sm:h-20 md:h-24 w-auto object-contain bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              />
            </Link>
          </div>
          
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-4 md:mb-0 justify-center md:justify-end">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-600 hover:text-black transition-colors text-sm sm:text-base"
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
