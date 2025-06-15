
import React from 'react';
interface LandingContentWithLogoProps {
  title: string;
  body: string;
  logoSrc: string;
  logoAlt: string;
  headerLabel?: string;
  keyStats?: string[];
  className?: string;
}
export const LandingContentWithLogo = ({
  title,
  body,
  logoSrc,
  logoAlt,
  headerLabel,
  keyStats,
  className = ""
}: LandingContentWithLogoProps) => {
  // For special company ID "neurable-exclusive-2025" (used in Neurable), show special content.
  // We check logoSrc === '/lovable-uploads/37da99c7-75dd-496a-bb5c-e6b181c4c0fb.png' as a proxy for Neurable.
  // Ideally, this logic would live in a parent or via config, but for now it's handled here to minimize edits.
  const isNeurable =
    logoSrc === "/lovable-uploads/37da99c7-75dd-496a-bb5c-e6b181c4c0fb.png" ||
    logoAlt?.toLowerCase().includes("neurable");

  // Neurable company overview content
  const neurableHeadline = "Validated by Tier-1 OEMs and U.S. Defense Agencies";
  const neurableBody =
    "Neurable has pioneered a plug-and-play BCI architecture deployable via standard headphones — no calibration or bulky hardware required.";
  const neurableKeyStats = [
    "Patented signal engine with unmatched signal-to-noise ratio (SNR)",
    "SDK enables cognitive state tracking for stress, fatigue, and focus",
    "Validated by peer-reviewed results (e.g. Nature)",
    "11 patents granted (33 filed) — pre-dating Apple in-ear EEG patents"
  ];
  // Which content to render?
  const headline = isNeurable ? neurableHeadline : title;
  const sectionBody = isNeurable ? neurableBody : body;
  const stats = isNeurable ? neurableKeyStats : keyStats;
  const logoUrl = isNeurable
    ? "/lovable-uploads/37da99c7-75dd-496a-bb5c-e6b181c4c0fb.png"
    : logoSrc;
  const logoLabel = isNeurable ? "Neurable logo" : logoAlt;

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-6 sm:mb-8">
          {headerLabel && (
            <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-2 sm:mb-4 text-gray-600 uppercase tracking-wide">
              {headerLabel}
            </h3>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8 gap-3">
            <img
              src={logoUrl}
              alt={logoLabel}
              className="h-10 sm:h-12 md:h-16 mb-1 sm:mb-0 sm:mr-4 rounded-sm bg-white object-contain"
              style={{maxWidth: 160}}
              loading="lazy"
            />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
              {headline}
            </h2>
          </div>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-8 sm:mb-10">
          {sectionBody}
        </p>
        {stats && stats.length > 0 && (
          <div className="border-l-2 border-sky-400 pl-5 mb-6 sm:mb-10">
            <ul className="space-y-2">
              {stats.map((stat, i) => (
                <li
                  key={i}
                  className="flex items-start text-gray-900 text-base sm:text-lg"
                >
                  <span className="mt-1 mr-2 w-2.5 h-2.5 bg-sky-500 rounded-full flex-shrink-0"></span>
                  <span className="leading-snug">{stat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
