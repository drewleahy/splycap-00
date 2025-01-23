export const OurAllocations = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Allocations</h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-600 leading-relaxed">
            Over the past two decades, our partners have allocated to a host of top performing deals. 
            Including personal investments, venture capital funds, SPVs, and other private investments, 
            SPLYCAP has placed tens of millions of private capital
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {/* Placeholder divs for logos - will be replaced with actual images */}
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Logo 1</span>
          </div>
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Logo 2</span>
          </div>
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Logo 3</span>
          </div>
          <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Logo 4</span>
          </div>
        </div>
      </div>
    </section>
  );
};