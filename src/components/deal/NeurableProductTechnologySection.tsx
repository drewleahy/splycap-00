
import React from "react";
import { CheckCircle } from "lucide-react";

/**
 * Neurable — Product & Technology section (deal-specific)
 */
export const NeurableProductTechnologySection: React.FC = () => (
  <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white animate-fadeIn">
    <div className="max-w-4xl mx-auto text-left">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-4 text-gray-600 uppercase tracking-wide">
          Product &amp; Technology
        </h3>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          Signal Engine (Core IP)
        </h2>
        <ul className="mb-8 space-y-3">
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Real-time capture of brain signals with high signal-to-noise ratio (SNR)
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Removes motion and environmental noise
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Requires zero calibration for users
          </li>
        </ul>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          Software SDK
        </h2>
        <ul className="mb-8 space-y-3">
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Integrates with OEM earbuds/headphones
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Tracks focus, fatigue, and stress in real time
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Used across consumer UX, wellness, and defense applications
          </li>
        </ul>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">
          IP Portfolio
        </h2>
        <ul className="mb-8 space-y-3">
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            33 patents filed, 11 granted, covering signal processing, artifact removal, wearable EEG, and cognitive state prediction
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Validated in peer-reviewed publications including <span className="font-semibold">Nature</span>, demonstrating 30-minute advance prediction of cognitive failure vs. 1–5 seconds for existing solutions
          </li>
          <li className="flex items-start gap-2 text-gray-800 text-sm sm:text-base">
            <CheckCircle className="text-sky-500 h-5 w-5 mt-0.5 shrink-0" />
            Patent coverage pre-dates Apple’s neural interface efforts
          </li>
        </ul>
      </div>
    </div>
  </section>
);

