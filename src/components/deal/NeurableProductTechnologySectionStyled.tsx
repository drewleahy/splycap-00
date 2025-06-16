
import React from "react";
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Headphones, Smartphone, Brain } from "lucide-react";

const features = [
  {
    title: "Proprietary Signal Engine",
    description: "Best-in-Class Signal Quality for Brainwave Data Capture",
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
  <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <div className="max-w-4xl mx-auto text-left mb-12 sm:mb-16">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-slate-600 uppercase tracking-wide">
          Product & Technology
        </h3>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          Proven Platform Built for Seamless Manufacturer Integration
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
          Neurable's proprietary brain-computer interface technology has been validated through partnerships with major consumer electronics manufacturers and defense agencies, demonstrating commercial readiness across multiple verticals.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {features.map(({ title, description, icon: Icon }) => (
          <Card 
            key={title} 
            className="group relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-5 sm:p-6 lg:p-7 text-left">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex-shrink-0 mr-1 rounded-full bg-slate-100 border border-gray-300 text-slate-700 flex items-center justify-center h-11 w-11">
                  <Icon size={28} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-gray-900">
                    {title}
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
