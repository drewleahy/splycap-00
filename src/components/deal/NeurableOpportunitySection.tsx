
import React from "react";
import { CheckCircle } from "lucide-react";

interface NeurableOpportunityProps {
  title: string;
  overview: string;
  bullets: string[];
}

/**
 * Custom Opportunity section for Neurable ONLY — Sleek black/white/grey with green accents.
 */
export const NeurableOpportunitySection: React.FC<NeurableOpportunityProps> = ({
  title,
  overview,
  bullets,
}) => (
  <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
    <div className="max-w-4xl mx-auto text-left">
      <div className="mb-8 sm:mb-12">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-4 sm:mb-6 text-emerald-700 uppercase tracking-wider">
          The Opportunity
        </h3>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-gray-900 leading-tight">
          {title}
        </h2>
      </div>

      <div className="mb-12 sm:mb-16">
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-10 sm:mb-12">
          {overview}
        </p>
        <div className="space-y-6">
          {bullets.map((bullet, i) => (
            <div key={i} className="flex items-start group">
              <CheckCircle className="h-6 w-6 text-emerald-600 mt-1 shrink-0 group-hover:text-emerald-700 transition-colors" />
              <span className="ml-4 text-base sm:text-lg text-gray-800 font-medium leading-relaxed">{bullet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
