'use client';
import SidebarDesktop from '@/libs/ui/components/sidebar/desktop';
import SidebarMobile from '@/libs/ui/components/sidebar/mobile';
import React from 'react';
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  Users,
  Compass,
  List,
  BarChart,
} from 'lucide-react';
export default function Sidebar() {
  const guestRoutes = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
    },
    {
      title: 'Browse',
      icon: Compass,
      href: '/browse',
    },
  ];
  const teacherRoutes = [
    {
      title: 'Courses',
      icon: List,
      href: '/teacher/courses',
    },
    {
      title: 'Analytics',
      icon: BarChart,
      href: '/teacher/analytics',
    },
  ];
  return (
    <React.Fragment>
      <aside className="lg:flex sticky top-0 hidden h-screen">
        <SidebarDesktop
          guestRoutes={guestRoutes}
          teacherRoutes={teacherRoutes}
        />
      </aside>
      <div
        className="lg:hidden flex flex-row justify-between 
      items-center my-3 mx-2 bg-white"
      >
        <SidebarMobile
          guestRoutes={guestRoutes}
          teacherRoutes={teacherRoutes}
        />
      </div>
    </React.Fragment>
  );
}
