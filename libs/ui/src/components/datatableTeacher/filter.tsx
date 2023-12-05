'use client';

import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/libs/ui/components/ui/select';
const Filter = ({ table, columns, categories }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      <div className="flex items-center mb-3 p-2 mr-4 h-10 rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Search size={22} />
        <input
          className="flex  ml-1 bg-background text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Kurse filtern...`}
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
        />
      </div>
      <Select
        value={
          (table.getColumn('categoryName')?.getFilterValue() as string) ?? ''
        }
        onValueChange={(newValue) => {
          table.getColumn('categoryName')?.setFilterValue(newValue);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Alle Kategorien" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem>Alle Kategorien</SelectItem>
          {categories?.map((category) => (
            <SelectItem value={`${category.name}`} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
