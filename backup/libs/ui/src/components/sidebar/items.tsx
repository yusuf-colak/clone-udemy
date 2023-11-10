'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/libs/ui/components/ui/accordion';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AcordionItems from './acordionItems';

const NavbarMenuItems = ({
  guestRoutes,
  teacherRoutes,
  navbarToggle,
  controlText,
  controlItem,
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
                <Link href={item.href}>
                  <AcordionItems
                    controlItem={controlItem}
                    controlText={controlText}
                    icon={item.icon}
                    item={item}
                    navbarToggle={navbarToggle}
                  />
                </Link>
              ) : (
                <AcordionItems
                  controlItem={controlItem}
                  controlText={controlText}
                  icon={item.icon}
                  item={item}
                  navbarToggle={navbarToggle}
                />
              )}
            </div>
            {item.childrens?.map(
              (itemInside, indexInside) =>
                navbarToggle && (
                  <AccordionContent
                    key={indexInside}
                    className="border-l-2 ml-3 pl-2"
                  >
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
                  </AccordionContent>
                )
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NavbarMenuItems;
