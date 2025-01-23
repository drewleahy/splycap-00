import { AssetAllocationChart } from "./AssetAllocationChart";

export const OurAllocations = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Our Allocations</h2>
        <AssetAllocationChart />
      </div>
    </section>
  );
};