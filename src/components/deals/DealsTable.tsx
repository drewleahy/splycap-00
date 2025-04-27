
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Deal } from "@/types/deal";

interface DealsTableProps {
  deals: Deal[];
}

export const DealsTable = ({ deals }: DealsTableProps) => {
  if (!deals || deals.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deal Name</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Valuation</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Pitch Deck</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell className="font-medium">{deal.deal_name}</TableCell>
              <TableCell>${deal.allocation_amount?.toLocaleString() || 0}</TableCell>
              <TableCell>
                {deal.valuation ? `$${deal.valuation.toLocaleString()}` : "N/A"}
              </TableCell>
              <TableCell className="capitalize">
                {deal.stage?.replace("_", " ") || "N/A"}
              </TableCell>
              <TableCell>
                {deal.created_at ? new Date(deal.created_at).toLocaleDateString() : "N/A"}
              </TableCell>
              <TableCell>
                {deal.pitch_deck_url ? (
                  <a 
                    href={deal.pitch_deck_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FileText className="h-4 w-4 mr-1" /> View
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No deck</span>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  deal.status === "active"
                    ? "bg-green-100 text-green-800"
                    : deal.status === "archived"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {deal.status ? (deal.status.charAt(0).toUpperCase() + deal.status.slice(1)) : "Unknown"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
