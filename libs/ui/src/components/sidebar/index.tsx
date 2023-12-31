'use client';
import SidebarDesktop from '@/libs/ui/components/sidebar/desktop';
import SidebarMobile from '@/libs/ui/components/sidebar/mobile';
import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Compass,
  List,
  Plus,
  Newspaper,
  Settings,
} from 'lucide-react';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
export default function Sidebar() {
  const auth: any = useAuth();
  const [courseData, setCourseData] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tenants/${auth?.user?.tenantId}/course`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCourseData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  const [completeCourse, setCompleteCourse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseChapterLenght = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chapters/lenght`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        const responseTrackingLenght = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/trackings/user/${auth?.user?.id}/lenght`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        setCompleteCourse(
          responseChapterLenght.data == responseTrackingLenght.data
            ? true
            : false
        );
      } catch (error) {
        console.error('Error updating courses:', error);
      }
    };

    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  const guestRoutes = [
    // {
    //   title: 'Dashboard',
    //   icon: LayoutDashboard,
    //   href: '/',
    // },
    {
      title: 'Kurse',
      icon: Compass,
      href: '/',
    },
    {
      title: 'Eingänge',
      icon: Newspaper,
      href: '/entries',
      locked: !completeCourse,
    },
  ];

  const teacherRoutes = [
    {
      title: 'Kurse',
      icon: List,
      href: '/teacher/coursesTable',
    },
    {
      title: 'Kurs hinzufügen',
      icon: Plus,
      href: '/teacher/addCourse',
    },
    {
      title: 'Benutzer',
      icon: Users,
      href: '/teacher/users',
    },
    {
      title: 'Sidebar organisieren',
      icon: Settings,
      href: '/teacher/sideBarOrganize',
    },
  ];
  return (
    <React.Fragment>
      <aside className="lg:flex sticky top-0 hidden h-screen bg-gray-200">
        <SidebarDesktop
          guestRoutes={guestRoutes}
          teacherRoutes={teacherRoutes}
        />
      </aside>
      <div
        className="lg:hidden flex flex-row justify-between 
      items-center py-3 px-2 bg-gray-300/75"
      >
        <SidebarMobile
          guestRoutes={guestRoutes}
          teacherRoutes={teacherRoutes}
        />
      </div>
    </React.Fragment>
  );
}
