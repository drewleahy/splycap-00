import { LogosEditor } from "@/components/admin/LogosEditor";

const PastInvestments = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Past Investments Management</h1>
      </div>
      <div className="space-y-8">
        <LogosEditor />
      </div>
    </div>
  );
};

export default PastInvestments;