
import React from 'react';

interface LandingContentWithLogoStyledProps {
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  headerLabel?: string;
  keyStats?: string[];
  className?: string;
}

/**
 * Styled content with logo section for Neurable with grey/black/white/dark blue palette.
 */
export const LandingContentWithLogoStyled = ({
  title,
  body,
  logoSrc,
  logoAlt,
  headerLabel,
  keyStats,
  className = ""
}: LandingContentWithLogoStyledProps) => {
  // Neurable company overview content
  const neurableHeadline = "Validated by Leading Manufacturers and United States Defense Agencies";
  const neurableBody =
    "Neurable has developed a software-first, hardware-light architecture supported by one of the strongest IP portfolios in non-invasive BCI.";
  const neurableKeyStats = [
    "33 patents filed, 11 granted — covering EEG signal processing, artifact removal, and neural prediction",
    "Patents pre-date Apple's in-ear EEG filings",
    "Peer-reviewed validation in journals including Nature",
    "Plug-and-play EEG with no calibration or bulky hardware required"
  ];

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-4 text-slate-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <img
              src="/lovable-uploads/37da99c7-75dd-496a-bb5c-e6b181c4c0fb.png"
              alt="Neurable logo"
              className="h-10 sm:h-12 md:h-16 mb-1 sm:mb-0 sm:mr-4 rounded-sm bg-white border border-gray-200 object-contain"
              style={{maxWidth: 160}}
              loading="lazy"
            />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              {neurableHeadline}
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-10">
          {neurableBody}
        </p>
        <div className="border-l-2 border-slate-600 pl-5 mb-6 sm:mb-10">
          <ul className="space-y-2">
            {neurableKeyStats.map((stat, i) => (
              <li
                key={i}
                className="flex items-start text-gray-900 text-base sm:text-lg"
              >
                <span className="mt-1 mr-2 w-2.5 h-2.5 bg-slate-700 rounded-full flex-shrink-0"></span>
                <span className="leading-snug">{stat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
