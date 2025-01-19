import { useState } from "react";
import { PastInvestmentItem } from "./PastInvestmentItem";
import { PastInvestmentForm, InvestmentFormValues } from "./PastInvestmentForm";

interface PastInvestment {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string | null;
}

interface PastInvestmentListProps {
  investments: PastInvestment[];
  onUpdate: (id: string, values: InvestmentFormValues) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const PastInvestmentList = ({ investments, onUpdate, onDelete }: PastInvestmentListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (investment: PastInvestment) => {
    setEditingId(investment.id);
  };

  const handleUpdate = async (values: InvestmentFormValues) => {
    if (editingId) {
      await onUpdate(editingId, values);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {investments?.map((investment) => (
        <div
          key={investment.id}
          className="border p-4 rounded-lg"
        >
          {editingId === investment.id ? (
            <PastInvestmentForm
              defaultValues={{
                name: investment.name,
                logo_url: investment.logo_url,
                website_url: investment.website_url || "",
              }}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <PastInvestmentItem
              investment={investment}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          )}
        </div>
      ))}
    </div>
  );
};