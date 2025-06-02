
import React from 'react';

interface LandingLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const LandingLayout = ({ children, className = "" }: LandingLayoutProps) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <main className="relative">
        {children}
      </main>
    </div>
  );
};
