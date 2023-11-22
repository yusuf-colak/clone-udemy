'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/libs/ui/components/ui/accordion';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AcordionItems from './acordionItems';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';

const NavbarMenuItems = ({
  guestRoutes,
  teacherRoutes,
  navbarToggle,
  controlText,
  controlItem,
  active,
}: any) => {
  const pathName = usePathname();

  const isTeacherPage = pathName.includes('/teacher');
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  const auth: any = useAuth();
  
  return (
    <div className="w-full">
      <Accordion
        className={navbarToggle ? ' block ' : ' flex flex-col justify-center'}
        type="single"
        collapsible
      >
        {routes?.map((item, index) => (

          <AccordionItem key={index} className="w-full" value={`item-${index}`}>
            {item.href ? (
              <Link href={item.href}>
                <AcordionItems
                  controlItem={controlItem}
                  controlText={controlText}
                  icon={item.icon}
                  item={item}
                  navbarToggle={navbarToggle}
                  active={active}
                />
              </Link>
            ) : (
              <AcordionItems
                controlItem={controlItem}
                controlText={controlText}
                icon={item.icon}
                item={item}
                navbarToggle={navbarToggle}
                active={active}
              />
            )}

            {item.children?.map((itemInsideInside, indexInsideInside) => {
              return (
                <AccordionContent
                  key={indexInsideInside}
                  className="border-l-2 ml-3 pl-2"
                >
                  <Link
                    className={`${
                      itemInsideInside.href === pathName
                        ? 'bg-yellow-200'
                        : 'hover:bg-gray-200 '
                    } flex hover:cursor-pointer p-2 rounded-xl items-center `}
                    href={`/chapters/${itemInsideInside.id}`}
                  >
                    <p> {itemInsideInside.title}</p>
                  </Link>
                </AccordionContent>
              );
            })}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NavbarMenuItems;
