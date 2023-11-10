"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/libs/ui/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Payment = {
  id: string;
  company: string;
  companyLink: string;
  status: string;
  About1: string;
  About2: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "company",
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        {row.original.logo && (
          <div className="w-[45px]">
            <img className="rounded-full" src={`${row.original.logo}`} />
          </div>
        )}
        <div className="flex flex-col ml-3">
          <h1 className="text-lg font-semibold"> {row.original.company}</h1>
          <p>{row.original.companyLink}</p>
        </div>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: () => <div className="">Abouts</div>,
    accessorKey: "About1",
    cell: ({ row }) => (
      <div className="flex flex-col min-w-[200px] ">
        <div> {row.original.About1}</div>
        <div>{row.original.About2}</div>
      </div>
    ),
  },
];
