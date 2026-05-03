import * as React from 'react';
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../../../shared/components/data_table";
import { ErrorState } from '../../../shared/components/error_state';
import type { UserRecord } from '../types';
import { formatDate, getInitial, getUserColor } from '../utils';

type UsersTableProps = {
  users: UserRecord[];
  selectedUserId: string | null;
  loading: boolean;
  error: string | null;
  onSelectUser: (userId: string) => void;
};

export function UsersTable({ users, selectedUserId, loading, error, onSelectUser }: UsersTableProps) {
  const columns: ColumnDef<UserRecord>[] = [
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
      accessorKey: "displayName",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="person-cell">
            <span className={`avatar ${user.isActive ? 'active' : 'inactive'}`}>
              {getInitial(user.displayName)}
            </span>
            <div>
              <div className="person-name">{user.displayName}</div>
              <div className="subtle text-[11px] text-[#737373]">{user.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email") || 'None',
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => row.getValue("role") || 'None',
    },
    {
      accessorKey: "authProvider",
      header: "Provider",
      cell: ({ row }) => (
        <span className="company-badge">{row.getValue("authProvider")}</span>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <span className={isActive ? 'status-badge active' : 'status-badge inactive'}>
            {isActive ? 'On' : 'Off'}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created at",
      cell: ({ row }) => formatDate(row.getValue("createdAt")),
    },
  ];

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={loading}
      selectedId={selectedUserId}
      onRowClick={(row) => onSelectUser(row.id)}
      emptyTitle="No users found"
      emptyDescription="Add documents to the 'users' collection in Firestore."
    />
  );
}
