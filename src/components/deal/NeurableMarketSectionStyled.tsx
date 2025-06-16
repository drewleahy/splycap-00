
import React from "react";
import { Headphones, Activity, ShieldCheck, HeartPulse } from "lucide-react";

const verticals = [
  {
    label: "Consumer Wearables",
    description: "Headphones, XR, earbuds",
    Icon: Headphones,
    bg: "bg-gray-100",
    iconColor: "text-slate-700"
  },
  {
    label: "Neuroanalytics",
    description: "Tracking stress, focus, fatigue",
    Icon: Activity,
    bg: "bg-slate-100",
    iconColor: "text-gray-700"
  },
  {
    label: "Defense",
    description: "Operator performance optimization",
    Icon: ShieldCheck,
    bg: "bg-gray-200",
    iconColor: "text-slate-800"
  },
  {
    label: "Wellness",
    description: "Early detection of brain-state anomalies",
    Icon: HeartPulse,
    bg: "bg-slate-200",
    iconColor: "text-gray-800"
  },
];

/**
 * Styled Market Context section for Neurable with grey/black/white/dark blue palette.
 */
export const NeurableMarketSectionStyled: React.FC = () => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
    <div className="max-w-3xl mx-auto text-left">
      <h3 className="text-xs sm:text-sm font-semibold mb-3 text-slate-600 uppercase tracking-wide">
        Market Context
      </h3>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-gray-900">
        Global BCI Market Reaching{" "}
        <span className="text-slate-800">$6.5B</span> by 2030
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
        The global BCI market is projected to grow from <span className="font-semibold text-gray-900">$2.2B</span> in 2023 to <span className="font-semibold text-slate-800">$6.5B</span> by 2030 (<span className="text-gray-900 font-medium">CAGR: ~17%</span>).
        <br />
        <span className="block mt-2">
          Neurable is positioned at the center of four high-growth verticals:
        </span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {verticals.map(({ label, description, Icon, bg, iconColor }) => (
          <div
            key={label}
            className={`flex items-start p-4 rounded-xl shadow-sm border border-gray-200 ${bg}`}
          >
            <div className={`flex-shrink-0 mr-4 rounded-full bg-white shadow-sm border border-gray-300 ${iconColor} flex items-center justify-center h-11 w-11`}>
              <Icon size={28} className={iconColor} />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900">{label}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
