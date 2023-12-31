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
} from '@/libs/ui/components/ui/alertDialog';
const CourseDeleteButton = ({ courseId }) => {
  const auth: any = useAuth();
  const DeleteCourse = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
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
            {/* Kursu silmek istediğinize emin misiniz ? */}
            Sind Sie sicher, dass Sie den Kurs löschen möchten?
          </AlertDialogTitle>
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
