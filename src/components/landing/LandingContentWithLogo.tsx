
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

  // Apply Neurable-specific styling if this is the Neurable page
  const sectionBg = isNeurable ? "bg-white" : "bg-gray-50";
  const headerColor = isNeurable ? "text-emerald-700" : "text-gray-600";
  const titleColor = isNeurable ? "text-gray-900" : "text-gray-900";
  const bodyColor = isNeurable ? "text-gray-700" : "text-gray-700";
  const bulletBorder = isNeurable ? "border-emerald-500" : "border-sky-400";
  const bulletColor = isNeurable ? "bg-emerald-600" : "bg-sky-500";
  const statColor = isNeurable ? "text-gray-800" : "text-gray-900";

  return (
    <section className={`py-16 sm:py-20 px-4 sm:px-6 ${sectionBg} ${className}`}>
      <div className="max-w-4xl mx-auto text-left">
        <div className="mb-8 sm:mb-12">
          {headerLabel && (
            <h3 className={`text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-6 ${headerColor} uppercase tracking-wider`}>
              {headerLabel}
            </h3>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-12 gap-4 sm:gap-6">
            <img
              src={logoUrl}
              alt={logoLabel}
              className="h-12 sm:h-16 md:h-20 mb-1 sm:mb-0 rounded-sm bg-white object-contain shadow-sm"
              style={{maxWidth: 200}}
              loading="lazy"
            />
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${titleColor} leading-tight`}>
              {headline}
            </h2>
          </div>
        </div>
        <p className={`text-base sm:text-lg md:text-xl ${bodyColor} leading-relaxed mb-12 sm:mb-16`}>
          {sectionBody}
        </p>
        {stats && stats.length > 0 && (
          <div className={`border-l-4 ${bulletBorder} pl-6 sm:pl-8 mb-8 sm:mb-12`}>
            <ul className="space-y-4">
              {stats.map((stat, i) => (
                <li
                  key={i}
                  className="flex items-start text-base sm:text-lg"
                >
                  <span className={`mt-1.5 mr-4 w-3 h-3 ${bulletColor} rounded-full flex-shrink-0`}></span>
                  <span className={`leading-relaxed font-medium ${statColor}`}>{stat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
