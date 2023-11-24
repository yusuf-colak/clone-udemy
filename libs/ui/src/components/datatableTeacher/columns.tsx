'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/libs/ui/components/ui/button';
import { ArrowUpDown, Edit, MoreHorizontal } from 'lucide-react';
import CourseDeleteButton from './courseDeleteButton';
import Link from 'next/link';
import { Image } from 'lucide-react';

export type Payment = {
  id: number;
  imageUrl: string;
  title: string;
  categoryName: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'title',
    cell: ({ row }) => (
      <div className="flex flex-row items-center">
        {row.original.imageUrl ? (
          <div className="w-[45px]">
            <img
              className="rounded-lg"
              src={`${row.original.imageUrl}`}
              alt="resim"
            />
          </div>
        ) : (
          <div>
            <Image color="grey" size={35} className="w-[45px]" />
          </div>
        )}
        <Link
          className="hover:cursor-pointer ml-3"
          href={`/courses/${row.original.id}`}
        >
          <h1 className="text-lg font-semibold"> {row.original.title}</h1>
        </Link>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kurslar <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'categoryName',
    header: 'Kategori',
  },
  {
    header: () => <div className="flex justify-end">Düzenle / Sil</div>,
    accessorKey: 'About1',
    cell: ({ row }) => (
      <div className="flex flex-row justify-end  ">
        <div>
          <Link href={`/teacher/courses/${row.original.id}`}>
            <Button className="rounded-full" size="sm" variant="ghost">
              <Edit />
            </Button>
          </Link>
        </div>
        <div>
          <CourseDeleteButton courseId={row.original.id} />
        </div>
      </div>
    ),
  },
];
