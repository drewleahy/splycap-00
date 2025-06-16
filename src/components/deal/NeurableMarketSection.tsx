
import React from "react";
import { Headphones, Activity, ShieldCheck, HeartPulse } from "lucide-react";

const verticals = [
  {
    label: "Consumer Wearables",
    description: "Headphones, XR, earbuds",
    Icon: Headphones,
    bg: "bg-gray-50",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-gray-100"
  },
  {
    label: "Neuroanalytics",
    description: "Tracking stress, focus, fatigue",
    Icon: Activity,
    bg: "bg-gray-50",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-gray-100"
  },
  {
    label: "Defense",
    description: "Operator performance optimization",
    Icon: ShieldCheck,
    bg: "bg-gray-50",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-gray-100"
  },
  {
    label: "Wellness",
    description: "Brain-state anomaly detection",
    Icon: HeartPulse,
    bg: "bg-gray-50",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-gray-100"
  },
];

/**
 * Sleek Market Context section for Neurable with black/white/grey and green accents.
 */
export const NeurableMarketSection: React.FC = () => (
  <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50">
    <div className="max-w-4xl mx-auto text-left">
      <h3 className="text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-emerald-700 uppercase tracking-wider">
        Market Context
      </h3>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
        Global BCI Market Reaching{" "}
        <span className="text-emerald-600">$6.5B</span> by 2030
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-12 sm:mb-16 leading-relaxed">
        The global BCI market is projected to grow from <span className="font-semibold text-gray-900">$2.2B</span> in 2023 to <span className="font-semibold text-emerald-700">$6.5B</span> by 2030 (<span className="text-gray-900 font-medium">CAGR: ~17%</span>).
        <br />
        <span className="block mt-4">
          Neurable is positioned at the center of four high-growth verticals:
        </span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {verticals.map(({ label, description, Icon, bg, iconColor, hoverBg }) => (
          <div
            key={label}
            className={`flex items-start p-6 sm:p-8 rounded-xl border border-gray-200 ${bg} ${hoverBg} transition-all duration-300 group`}
          >
            <div className={`flex-shrink-0 mr-6 rounded-full bg-white shadow-md ${iconColor} flex items-center justify-center h-14 w-14 group-hover:shadow-lg transition-shadow`}>
              <Icon size={32} className={iconColor} />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{label}</div>
              <div className="text-base text-gray-600">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
