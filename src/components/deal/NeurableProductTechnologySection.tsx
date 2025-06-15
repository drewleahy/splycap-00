
import React from "react";
import { CheckCircle, Zap, Code, Layers } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/**
 * Card component for clean grouping
 */
const TechCard = ({
  icon: Icon,
  title,
  children,
  accentColor,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accentColor: string;
}) => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-fadeIn flex flex-col">
    <div className="flex items-center px-6 py-4 bg-gray-50 gap-3 border-b border-gray-100">
      <span
        className={`inline-flex items-center justify-center rounded-full bg-opacity-80 ${accentColor} p-2`}
      >
        <Icon className="h-6 w-6 text-white" />
      </span>
      <h3 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h3>
    </div>
    <ul className="divide-y divide-gray-100">
      {React.Children.map(children, (child, i) => (
        <li className="flex items-start gap-3 px-6 py-4 bg-white">{child}</li>
      ))}
    </ul>
  </div>
);

export const NeurableProductTechnologySection: React.FC = () => (
  <section className="py-14 sm:py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-white">
    <div className="max-w-5xl mx-auto">
      <div className="mb-2 flex items-center gap-3">
        <span className="uppercase text-xs sm:text-sm font-semibold tracking-wider text-sky-600">
          Product &amp; Technology
        </span>
        <Separator decorative className="flex-1 !bg-sky-100 mr-2" />
      </div>

      <div className="grid gap-8 md:grid-cols-3 mt-6">
        <TechCard icon={Zap} title="Signal Engine (Core IP)" accentColor="bg-sky-500">
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Real-time capture of brain signals with high signal-to-noise ratio (SNR)
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Removes motion and environmental noise
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Requires zero calibration for users
            </span>
          </>
        </TechCard>

        <TechCard icon={Code} title="Software SDK" accentColor="bg-emerald-500">
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-emerald-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Integrates with OEM earbuds/headphones
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-emerald-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Tracks focus, fatigue, and stress in real time
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-emerald-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Used across consumer UX, wellness, and defense applications
            </span>
          </>
        </TechCard>

        <TechCard icon={Layers} title="IP Portfolio" accentColor="bg-purple-500">
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-purple-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              33 patents filed, 11 granted, covering signal processing, artifact removal, wearable EEG, and cognitive state prediction
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-purple-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Validated in peer-reviewed publications including <span className="font-semibold">Nature</span>, demonstrating 30-minute advance prediction of cognitive failure vs. 1–5 seconds for existing solutions
            </span>
          </>
          <>
            <span className="pt-1.5">
              <CheckCircle className="text-purple-500 h-5 w-5 mt-0.5" />
            </span>
            <span className="text-gray-800 text-sm leading-relaxed">
              Patent coverage pre-dates Apple’s neural interface efforts
            </span>
          </>
        </TechCard>
      </div>
    </div>
  </section>
);

