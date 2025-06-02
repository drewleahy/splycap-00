
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
    <footer className={`py-12 px-6 bg-gray-900 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-white text-2xl font-bold">
              SPLY CAPITAL
            </Link>
          </div>
          
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors"
                  target={link.url.startsWith('http') ? '_blank' : '_self'}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};
