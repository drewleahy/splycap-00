
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { PendingPartner } from "@/types/partner";

interface PendingPartnersTableProps {
  partners: PendingPartner[];
  onUpdateStatus: (userId: string, status: 'approved' | 'rejected') => Promise<void>;
}

export const PendingPartnersTable = ({ partners, onUpdateStatus }: PendingPartnersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partners.map((partner) => (
          <TableRow key={partner.id}>
            <TableCell>
              {partner.first_name} {partner.last_name}
            </TableCell>
            <TableCell>{partner.email}</TableCell>
            <TableCell>
              {new Date(partner.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell className="space-x-2">
              <Button
                size="sm"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => onUpdateStatus(partner.id, 'approved')}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onUpdateStatus(partner.id, 'rejected')}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
