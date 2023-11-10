'use client';
import { motion } from 'framer-motion';
import { cn } from '../../utils';

const NavbarLogo = ({ controlText, controlLogo, active }: any) => {
  return (
    <motion.div
        animate={controlLogo}
      className={cn(
        'flex w-full items-center lg:mb-6'
      )}
    >
      <img alt="microprefix" className="rounded-xl w-[45px]" src="/logo.jpg" />
      <motion.h1 animate={controlText} className="text-2xl font-bold pl-3">
        microprefix
      </motion.h1>
    </motion.div>
  );
};

export default NavbarLogo;
