'use client';

import { Search } from 'lucide-react';

const Filter = ({ table }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      <div className="flex items-center mb-3 p-2 mr-4 h-10 rounded-md border border-input bg-background  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <Search size={22} />
        <input
          className="flex  ml-1 bg-background text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Kursları Filtrele...`}
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Filter;
