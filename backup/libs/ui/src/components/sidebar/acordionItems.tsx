import React from 'react';
import { AccordionTrigger } from '../ui/accordion';
import { cn } from '../../utils';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
interface SidebarItemProps {
  icon: LucideIcon;
  item: any;
  navbarToggle: boolean;
  controlText: any;
  controlItem: any;
}

const AcordionItems = ({
  item,
  navbarToggle,
  controlText,
  controlItem,
  icon: Icon,
}: SidebarItemProps) => {
  const pathName = usePathname();

  return (
    <AccordionTrigger
      iconOnOnOff={item.childrens}
      navbarToggle={navbarToggle}
      locked={item.locked}
      className={cn(
        'before:absolute',
        item.href === pathName &&
          'relative before:z-0 before:rounded-xl before:w-full before:h-[75%] before:bg-yellow-200',
        !navbarToggle &&
          item.children?.map((itemInside: any, indexInside: number) => {
            if (itemInside.href === pathName) {
              return 'relative before:z-0 before:rounded-xl before:w-full before:h-[75%] before:bg-yellow-200';
            }
          })
      )}
    >
      <motion.div
        animate={controlItem}
        className={cn('w-full relative z-10 flex flex-row items-center')}
      >
        <div className={cn(navbarToggle && 'mr-2 ')}>
          <Icon size={25} />
        </div>

        <motion.span animate={controlText}>{item.title}</motion.span>
      </motion.div>
    </AccordionTrigger>
  );
};

export default AcordionItems;
