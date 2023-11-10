"use client";
import React from "react";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/libs/ui/components/ui/select";

const Filter = ({ table, columns }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      <div className="flex items-center mb-3 p-2 mr-4 h-10 rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Search size={22} />
        <input
          className="flex  ml-1 bg-background text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Company Filter...`}
          value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("company")?.setFilterValue(event.target.value)
          }
        />
      </div>
      <Select
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onValueChange={(newValue) => {
          table.getColumn("status")?.setFilterValue(newValue);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="View All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem>View All</SelectItem>
          <SelectItem value="Customer">Customer</SelectItem>
          <SelectItem value="Churned">Churned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
