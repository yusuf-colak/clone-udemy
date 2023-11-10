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
  controlText,
  controlItem,
  icon: Icon,
  active,
}: SidebarItemProps) => {
  const pathName = usePathname();

  const currentActive =
    item.link === pathName ||
    (!active &&
      item.children &&
      item.children.some((itemInside: any, indexInside: number) => {
        return itemInside.link === pathName;
      }));

  return (
    <AccordionTrigger
      iconOnOnOff={item.children}
      active={active}
      locked={item.locked}
      className={cn(
        'before:absolute',
        currentActive &&
          'relative before:z-0 before:rounded-xl before:w-full before:h-[75%] before:bg-primary'
      )}
    >
      <motion.div
        animate={controlItem}
        className={cn(
          'max-w-full relative z-10 flex flex-row items-center justify-start px-[0.6rem] space-x-2',
          currentActive ? 'text-primary-foreground' : 'text-black'
        )}
      >
        <div>
          <Icon size={25} />
        </div>

        <motion.span animate={controlText}>{item.title}</motion.span>
      </motion.div>
    </AccordionTrigger>
  );
};

export default AcordionItems;
