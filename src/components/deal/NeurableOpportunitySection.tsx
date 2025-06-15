
import React from "react";

interface Vertical {
  name: string;
  detail: string;
}

interface AdvantageRow {
  company: string;
  focus: string;
  weakness: string;
}

interface NeurableOpportunityProps {
  title: string;
  overview: string;
  keyVerticals: Vertical[];
  competitiveAdvantage: AdvantageRow[];
  positioning: string;
}

/**
 * Custom Opportunity section for Neurable ONLY.
 */
export const NeurableOpportunitySection: React.FC<NeurableOpportunityProps> = ({
  title,
  overview,
  keyVerticals,
  competitiveAdvantage,
  positioning
}) => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
    <div className="max-w-4xl mx-auto text-left">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
          The Opportunity
        </h3>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mb-8 sm:mb-10">
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          {overview}
        </p>
      </div>

      <div className="mb-10">
        <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">Key Verticals:</h4>
        <ul className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {keyVerticals.map((v, i) => (
            <li key={i}>
              <span className="font-bold text-gray-900">{v.name}:</span>{" "}
              <span className="text-gray-700">{v.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-10">
        <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
          Competitive Advantage:
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded text-sm">
            <thead>
              <tr>
                <th className="font-semibold px-3 py-2 bg-gray-50 border-b border-gray-200 text-left">Company</th>
                <th className="font-semibold px-3 py-2 bg-gray-50 border-b border-gray-200 text-left">Focus</th>
                <th className="font-semibold px-3 py-2 bg-gray-50 border-b border-gray-200 text-left">Weakness vs. Neurable</th>
              </tr>
            </thead>
            <tbody>
              {competitiveAdvantage.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-3 py-2 border-b align-top">{row.company}</td>
                  <td className="px-3 py-2 border-b align-top">{row.focus}</td>
                  <td className="px-3 py-2 border-b align-top">{row.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
          Positioning:
        </h4>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          {positioning}
        </p>
      </div>
    </div>
  </section>
);
