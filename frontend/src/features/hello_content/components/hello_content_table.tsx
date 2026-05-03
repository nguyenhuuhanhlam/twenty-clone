import * as React from 'react';
import { type ColumnDef } from "@tanstack/react-table";
import { Smile } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../../../shared/components/data_table";
import type { HelloContent } from "../types";

type HelloContentTableProps = {
  items: HelloContent[];
  selectedId: string | null;
  loading: boolean;
  onSelectItem: (id: string) => void;
};

export function HelloContentTable({ items, selectedId, loading, onSelectItem }: HelloContentTableProps) {
  const columns: ColumnDef<HelloContent>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="person-cell">
            <span className="avatar active">
              <Smile size={12} className="text-emerald-400" />
            </span>
            <div>
              <div className="person-name">{item.message}</div>
              <div className="subtle text-[11px] text-[#737373]">System Message</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="company-badge">{row.getValue("id")}</span>
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Created At",
      cell: ({ row }) => {
        return new Date(row.getValue("timestamp")).toLocaleString();
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={items}
      loading={loading}
      selectedId={selectedId}
      onRowClick={(row) => onSelectItem(row.id)}
      emptyTitle="No items found"
      emptyDescription="Create your first hello message."
    />
  );
}
