import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SheetClose } from '../ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const TeacherMode = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/chapter');
  return (
    <React.Fragment>
      {isTeacherPage || isPlayerPage ? (
        <Link href="/courses" className="flex flex-row">
          <LogOut className="h-4 w-4 mr-2" /> Exit
        </Link>
      ) : (
        <Link href="/teacher/courses">Teacher Mode</Link>
      )}
    </React.Fragment>
  );
};

const DesktopTeacherMode = () => {
  return (
    <React.Fragment>
      <Button variant="ghost" size="sm">
        <TeacherMode />
      </Button>
    </React.Fragment>
  );
};

const MobileTeacherMode = () => {
  return (
    <React.Fragment>
      <Button variant="ghost" size="sm">
        <SheetClose className="w-full" asChild>
          <TeacherMode />
        </SheetClose>
      </Button>
    </React.Fragment>
  );
};

export { TeacherMode, DesktopTeacherMode, MobileTeacherMode };
