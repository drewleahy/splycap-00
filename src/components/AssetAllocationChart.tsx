import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Alternatives", value: 41, color: "#C4A484" },
  { name: "Equities", value: 29, color: "#1A1F2C" },
  { name: "Real Estate", value: 9, color: "#A9A9A9" },
  { name: "Cash", value: 8, color: "#FFFFFF" },
  { name: "Bonds", value: 6, color: "#4A5568" },
  { name: "Other", value: 7, color: "#2D3748" },
];

export const AssetAllocationChart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      <h2 className="text-3xl font-bold text-center mb-2">High Net Worth Asset Allocation</h2>
      <p className="text-xl text-gray-600 text-center mb-8">
        Alternative investments now make up the largest portion of high-net-worth portfolios
      </p>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name} ${value}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <p className="text-sm text-gray-500 text-center mt-8">
        Source: Barron's - Alternative Investments Are Gaining Ground With the Super Rich
      </p>
    </div>
  );
};