import { Button } from '@/libs/ui/components/ui/button';
import { useAuth } from 'apps/website/hooks/useAuth';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/libs/ui/components/ui/alertDialog';
const CourseDeleteButton = ({ userId, userName, mail }) => {
  const auth: any = useAuth();
  const DeleteCourse = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="rounded-full" size="sm" variant="ghost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/* Kullanıcıyı silmek istediğinize emin misiniz ? */}
            Sind Sie sicher, dass Sie den Benutzer löschen möchten?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Name: {userName}</div>
              <div className="text-sm">E-Mail-Adresse: {mail}</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{/* İptal */} Abbrechen</AlertDialogCancel>
          <AlertDialogAction onClick={DeleteCourse}>Ja</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseDeleteButton;
