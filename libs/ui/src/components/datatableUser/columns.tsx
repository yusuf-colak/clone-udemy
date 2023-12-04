'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/libs/ui/components/ui/button';
import { ArrowUpDown, Edit, MoreHorizontal, User } from 'lucide-react';
import CourseDeleteButton from './userDeleteButton';
import Link from 'next/link';
import { Image } from 'lucide-react';
import UserEditPage from './userEditPage';

export type Payment = {
  id: number;
  imageUrl: string;
  title: string;
  categoryName: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'name',
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
            <User color="grey" size={35} className="w-[45px]" />
          </div>
        )}
        <Link
          className="hover:cursor-pointer ml-3"
          href={`/${row.original.id}`}
        >
          <h1 className="text-lg font-semibold"> {row.original.name}</h1>
        </Link>
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kullanıcılar <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Mail Adresi',
  },
  {
    header: () => <div>Rol Drumumu</div>,
    accessorKey: 'roleıd',
    cell: ({ row }) => (
      <div >{row.original.roleName}</div>
    ),
  },
  {
    header: () => <div className="flex justify-end">Düzenle / Sil</div>,
    accessorKey: 'About1',
    cell: ({ row }) => (
      <div className="flex flex-row justify-end  ">
        <div>
          <UserEditPage
            userId={row.original.id}
            userName={row.original.name}
            mail={row.original.email}
            roleId={row.original.roleId}
          />
        </div>
        <div>
          <CourseDeleteButton
            userId={row.original.id}
            userName={row.original.name}
            mail={row.original.email}
          />
        </div>
      </div>
    ),
  },
];
