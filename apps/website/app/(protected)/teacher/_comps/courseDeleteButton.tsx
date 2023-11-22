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
const CourseDeleteButton = ({ courseId, setCourses }) => {
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
      setCourses((current) =>
        current.filter((course) => course.id !== courseId)
      );
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
            Kursu silmek istediğinize emin misiniz ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={DeleteCourse}>Evet</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseDeleteButton;
