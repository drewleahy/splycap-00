import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PastInvestment {
  id: string;
  name: string;
  logo_url: string;
  website_url?: string | null;
}

interface PastInvestmentItemProps {
  investment: PastInvestment;
  onEdit: (investment: PastInvestment) => void;
  onDelete: (id: string) => void;
}

export const PastInvestmentItem = ({ investment, onEdit, onDelete }: PastInvestmentItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={investment.logo_url}
          alt={investment.name}
          className="w-12 h-12 object-contain"
        />
        <div>
          <h3 className="font-medium">{investment.name}</h3>
          {investment.website_url && (
            <a
              href={investment.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline flex items-center gap-1"
            >
              Visit website <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(investment)}
          className="flex items-center gap-2"
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(investment.id)}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </div>
    </div>
  );
};