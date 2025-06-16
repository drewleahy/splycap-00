
import React from "react";
import { Cpu, Headphones, Smartphone, Brain } from "lucide-react";

const features = [
  {
    title: "Proprietary Signal Engine",
    description: "Best-in-class SNR for EEG capture",
    icon: Brain,
  },
  {
    title: "Real-Time Processing",
    description: "Sub-100ms latency cognitive tracking",
    icon: Cpu,
  },
  {
    title: "Consumer Hardware",
    description: "Deployable in standard headphones",
    icon: Headphones,
  },
  {
    title: "SDK Integration",
    description: "Cross-platform cognitive APIs",
    icon: Smartphone,
  },
];

/**
 * Styled Product & Technology section for Neurable with grey/black/white/dark blue palette.
 */
export const NeurableProductTechnologySectionStyled: React.FC = () => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
    <div className="max-w-3xl mx-auto text-left">
      <h3 className="text-xs sm:text-sm font-semibold mb-3 text-slate-600 uppercase tracking-wide">
        Product & Technology
      </h3>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 text-gray-900">
        Validated Platform Ready for OEM Integration
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
        Neurable's proprietary brain-computer interface technology has been validated through partnerships with major consumer electronics manufacturers and defense agencies, demonstrating commercial readiness across multiple verticals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {features.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="flex items-start p-4 rounded-xl shadow-sm border border-gray-200 bg-white"
          >
            <div className="flex-shrink-0 mr-4 rounded-full bg-slate-100 border border-gray-300 text-slate-700 flex items-center justify-center h-11 w-11">
              <Icon size={28} className="text-slate-700" />
            </div>
            <div>
              <div className="text-base font-semibold text-gray-900">{title}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
