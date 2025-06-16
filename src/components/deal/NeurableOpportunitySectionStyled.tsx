
import React from "react";
import { CheckCircle } from "lucide-react";

interface NeurableOpportunityProps {
  title: string;
  overview: string;
  bullets: string[];
}

/**
 * Styled Opportunity section for Neurable with grey/black/white/dark blue palette.
 */
export const NeurableOpportunitySectionStyled: React.FC<NeurableOpportunityProps> = ({
  title,
  overview,
  bullets,
}) => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50">
    <div className="max-w-3xl mx-auto text-left">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
          The Opportunity
        </h3>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mb-8 sm:mb-10">
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6">
          {overview}
        </p>
        <ul className="space-y-4">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-slate-700 mt-0.5 shrink-0" />
              <span className="ml-3 text-base text-gray-800 font-medium">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
