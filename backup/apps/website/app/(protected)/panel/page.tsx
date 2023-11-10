'use client';

import { useAuth } from '../../../hooks/useAuth';
import { useEffect } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/libs/ui/components/ui/avatar';
export default function PanelPage() {
  const auth: any = useAuth();
  console.log(auth);
  return (
    <>
      <main className="w-full flex justify-center">
        {/* <img src={auth?.user.image}/> */}
        <div className="flex flex-col items-center">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{auth?.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1>{auth?.user.roles[0].role.name}</h1>
        </div>
        <div>
          <h1>{auth?.user.name}</h1>
          <h1>{auth?.user.email}</h1>
        </div>
      </main>
    </>
  );
}
