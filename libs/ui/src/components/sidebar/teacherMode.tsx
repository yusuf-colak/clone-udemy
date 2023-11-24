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
          <Button className="w-full border" variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Öğretmen Modundan Çık
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button className="w-full border" variant="ghost" size="sm">
            Öğretmen Paneli
          </Button>
        </Link>
      )}
    </React.Fragment>
  );
};

const DesktopTeacherMode = () => {
  return (
    <React.Fragment>
      <TeacherMode />
    </React.Fragment>
  );
};

const MobileTeacherMode = () => {
  return (
    <div>
      <SheetClose asChild>
        <TeacherMode />
      </SheetClose>
    </div>
  );
};

export { TeacherMode, DesktopTeacherMode, MobileTeacherMode };
