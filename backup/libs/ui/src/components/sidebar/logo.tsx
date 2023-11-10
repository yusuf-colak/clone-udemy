'use client';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

const NavbarLogo = ({ navbarToggle, controlText, active }: any) => {
  return (
    <div
      className={cn(
        'flex w-full items-center lg:mb-6 ',
        active == false ? 'justify-center ' : 'justify-start'
      )}
    >
      <img className="rounded-xl w-[45px]" src="/logo.jpg" />
      <motion.h1 animate={controlText} className="text-2xl font-bold pl-3">
        microprefix
      </motion.h1>
    </div>
  );
};

export default NavbarLogo;
