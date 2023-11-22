'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/libs/ui/components/ui/accordion';
import {
  BookOpen,
  GanttChart,
  Home,
  HomeIcon,
  LayoutDashboard,
  Settings,
  Users,
} from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AcordionItems from './acordionItems';
import { SheetClose } from '@/libs/ui/components/ui/sheet';
const NavbarMenuItemsMobile = ({
  navbarToggle,
  controlText,
  controlItem,
  guestRoutes,
  teacherRoutes,
}: any) => {
  const pathName = usePathname();

  const isTeacherPage = pathName.includes('/teacher');

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="w-full">
      <Accordion
        className={navbarToggle ? ' block ' : ' flex flex-col justify-center'}
        type="single"
        collapsible
      >
        {routes.map((item, index) => (
          <AccordionItem key={index} className="w-full" value={`item-${index}`}>
            <div>
              {item.href ? (
                <SheetClose className="w-full" asChild>
                  <Link href={item.href}>
                    <AcordionItems
                      icon={item.icon}
                      controlItem={controlItem}
                      controlText={controlText}
                      item={item}
                      navbarToggle={navbarToggle}
                    />
                  </Link>
                </SheetClose>
              ) : (
                <AcordionItems
                  icon={item.icon}
                  controlItem={controlItem}
                  controlText={controlText}
                  item={item}
                  navbarToggle={navbarToggle}
                />
              )}
            </div>
            {item.children?.map(
              (itemInside, indexInside) =>
                navbarToggle && (
                  <AccordionContent
                    key={indexInside}
                    className="border-l-2 ml-3 pl-2"
                  >
                    <SheetClose className="w-full" asChild>
                      <Link
                        className={`${
                          itemInside.href == pathName
                            ? 'bg-yellow-200'
                            : 'hover:bg-gray-200 '
                        } flex hover:cursor-pointer p-2 rounded-xl items-center `}
                        href={itemInside.href}
                      >
                        <p>{navbarToggle && itemInside.title}</p>
                      </Link>
                    </SheetClose>
                  </AccordionContent>
                )
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NavbarMenuItemsMobile;
