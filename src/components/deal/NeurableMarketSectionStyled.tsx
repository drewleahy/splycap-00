
import React from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, Activity, ShieldCheck, HeartPulse } from "lucide-react";

const verticals = [
  {
    label: "Consumer Wearables",
    description: "Headphones, XR, earbuds",
    Icon: Headphones,
  },
  {
    label: "Neuroanalytics",
    description: "Tracking stress, focus, fatigue",
    Icon: Activity,
  },
  {
    label: "Defense",
    description: "Operator performance optimization",
    Icon: ShieldCheck,
  },
  {
    label: "Wellness",
    description: "Early detection of brain-state anomalies",
    Icon: HeartPulse,
  },
];

/**
 * Styled Market Context section for Neurable with grey/black/white/dark blue palette.
 */
export const NeurableMarketSectionStyled: React.FC = () => (
  <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
          Market Context
        </h3>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
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
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {verticals.map(({ label, description, Icon }) => (
          <Card 
            key={label} 
            className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-5 sm:p-6 lg:p-7 text-left">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex-shrink-0 mr-1 rounded-full bg-white shadow-sm border border-gray-300 flex items-center justify-center h-11 w-11">
                  <Icon size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-900">
                    {label}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500" />
          </Card>
        ))}
      </div>
    </div>
  </section>
);
