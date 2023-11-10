'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Lock, LockKeyhole, UnlockKeyhole } from 'lucide-react';

import { cn } from '@/libs/ui/utils';

const Accordion = AccordionPrimitive.Root;

type AccordionTriggerProps = {
    className: string;
    children: React.ReactNode;
    locked: boolean; // Adjust the type as needed
    active: boolean; // Adjust the type as needed
    iconOnOnOff: boolean; // Adjust the type as needed
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn('', className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ className, children, locked, active, iconOnOnOff, ...props }, ref) => {

    const onClick = !locked ? props.onClick : (event: any) => event.preventDefault();

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            (locked) && 'cursor-not-allowed text-gray-400',
            'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>.flex>svg]:rotate-180',
            className
          )}
          onClick={onClick}
        >
          <div className="w-full">{children}</div>
          <div className="flex flex-row items-center">
            <div
              className={cn(
                !active ? 'opacity-0 hidden' : 'delay-200 opacity-100',
                'pr-2 text-red-300'
              )}
            >
              {locked ? <LockKeyhole size={20} /> : null}
            </div>

            <ChevronDown
              className={cn(
                !active ? 'opacity-0 hidden' : 'delay-200 opacity-100',
                !iconOnOnOff && 'hidden',
                'h-4 w-4 shrink-0 transition-all duration-200 '
              )}
            />
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
