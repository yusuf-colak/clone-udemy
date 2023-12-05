import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { SheetClose } from '../ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useAuth } from 'apps/website/hooks/useAuth';

const TeacherMode = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/chapter');
  const auth: any = useAuth();

  return (
    <React.Fragment>
      {auth?.user.roles[0].role.name === 'Superadmin' ||
      auth?.user.roles[0].role.name === 'Admin' ? (
        <React.Fragment>
          {isTeacherPage || isPlayerPage ? (
            <Link href="/" className="flex flex-row">
              <Button className="w-full border" variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                {/* Öğretmen Modundan Çık */}
                Administrationsmenü schließen
              </Button>
            </Link>
          ) : (
            <Link href="/teacher/coursesTable">
              <Button className="w-full border" variant="ghost" size="sm">
                {/* Öğretmen Paneli */}
                Verwaltungsmenü
              </Button>
            </Link>
          )}
        </React.Fragment>
      ) : null}
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
    <SheetClose asChild>
      <TeacherMode />
    </SheetClose>
  );
};

export { TeacherMode, DesktopTeacherMode, MobileTeacherMode };
