'use client';

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Logo from '@/libs/ui/components/sidebar/logo';
import User from '@/libs/ui/components/sidebar/user';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/libs/ui/components/ui/sheet';
import { Menu } from 'lucide-react';
import NavbarMenuItemsMobile from './itemsMobile';
import UserMobile from './userMobile';
import { MobileTeacherMode } from './teacherMode';

export default function SidebarMobile({ guestRoutes, teacherRoutes }) {
  const [active, setActive] = useState(true);

  return (
    <>
      <Logo navbarToggle={active} />
      <Sheet>
        <SheetTrigger
          onClick={() => {
            setActive(true);
          }}
        >
          <Menu size={40} />
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader className="flex h-[98%] flex-col justify-between items-center">
            <div className="flex flex-col w-full items-start">
              <Logo navbarToggle={active} />
              <NavbarMenuItemsMobile
                guestRoutes={guestRoutes}
                teacherRoutes={teacherRoutes}
                navbarToggle={active}
              />
            </div>
            <div className="flex justify-center flex-col space-y-2">
              <MobileTeacherMode />
              <UserMobile navbarToggle={active} />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
