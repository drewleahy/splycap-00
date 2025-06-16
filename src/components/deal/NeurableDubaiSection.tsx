
import React from 'react';

export const NeurableDubaiSection = () => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image on the left */}
          <div className="order-2 lg:order-1">
            <img
              src="/lovable-uploads/7ecc1d94-d705-4d10-b9b3-438d19ae727b.png"
              alt="SPLY Capital venture partner with Ramses Alcaide, CEO of Neurable, at Dubai partnership event"
              className="w-full h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          
          {/* Content on the right */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              On the Ground in Dubai
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                We're proud to share this moment from our recent partnership event in the UAE, where one of SPLY Capital's venture partners connected in person with Ramses Alcaide, CEO & founder of Neurable.
              </p>
              <p>
                Ramses showcased Neurable's breakthrough brain-computer interface platform at Juggernaut Equity's inaugural founder showcase — featuring live demos, a packed Q&A, and a room full of investors energized by the future of neurotech.
              </p>
              <p>
                This type of access — to exceptional founders and category-defining innovation — is core to SPLY's hands-on model. We're thrilled to support Neurable as they scale their platform across defense, consumer, and wellness markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
