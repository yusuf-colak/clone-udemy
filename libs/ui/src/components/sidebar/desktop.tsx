'use client';

import {
  BsBookmarkFill,
  BsEyeFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsPeopleFill,
  BsPlus,
  BsSearch,
  BsTerminalFill,
} from 'react-icons/bs';
import { AiFillFire, AiFillMessage } from 'react-icons/ai';
import { IoMdArrowRoundUp } from 'react-icons/io';
import { MdFeedback, MdNightlightRound } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Logo from '@/libs/ui/components/sidebar/logo';
import Items from '@/libs/ui/components/sidebar/items';
import User from '@/libs/ui/components/sidebar/user';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils';
import { DesktopTeacherMode } from './teacherMode';

export default function SidebarDesktop({ guestRoutes, teacherRoutes }) {
  const [active, setActive] = useState(false);
  const controls = useAnimation();
  const controlText = useAnimation();
  const controlItem = useAnimation();
  const controlToggle = useAnimation();
  const controlNav = useAnimation();

  const showMore = () => {
    controls.start({
      width: '250px',
      transition: { duration: 0.001 },
    });

    controlNav.start({
      width: '100%',
      transition: { duration: 0.001 },
    });

    controlText.start({
      opacity: 1,
      display: 'block',
      transition: { delay: 0.3 },
    });

    controlItem.start({
      justifyContent: 'start',
      padding: '0 0.6rem',
      transition: { duration: 0.001 },
    });

    controlToggle.start({
      transform: 'rotate(0deg)',
    });

    setActive(true);
  };

  const showLess = () => {
    controls.start({
      width: '80px',
      transition: { duration: 0.001 },
    });

    controlNav.start({
      width: '45px',
      transition: { duration: 0.25 },
    });

    controlText.start({
      opacity: 0,
      display: 'none',
    });

    controlItem.start({
      justifyContent: 'center',
      padding: '0',
      width: '45px',
      transition: { duration: 0.001 },
    });

    controlToggle.start({
      transition: { duration: 0.25 },
      transform: 'rotate(180deg)',
    });

    setActive(false);
  };

  useEffect(() => {
    showMore();
  }, []);

  return (
    <motion.div
      animate={controls}
      className="max-w-[250px] w-[250px] px-4 animate duration-300
           relative group"
    >
      <motion.div
        animate={controlNav}
        className="min-h-screen flex flex-col justify-between py-8 "
      >
        <div
          onClick={active ? showLess : showMore}
          className={cn(
            'absolute justify-center items-center bg-accent rounded-md w-6 h-6 cursor-pointer -right-3 top-11',
            !active ? 'flex' : 'hidden group-hover:flex'
          )}
        >
          <motion.div animate={controlToggle}>
            <ChevronLeft className="h-4 w-4 text-accent-foreground" />
          </motion.div>
        </div>
        <div className="flex h-full flex-col w-full items-start ">
          <Logo active={active} controlText={controlText} />
          <Items
            controlItem={controlItem}
            controlText={controlText}
            active={active}
            guestRoutes={guestRoutes}
            teacherRoutes={teacherRoutes}
          />
        </div>
        <div className="flex justify-center flex-col space-y-2">
          <DesktopTeacherMode />
          <User controlText={controlText} navbarToggle={active} />
        </div>
      </motion.div>
    </motion.div>
  );
}
