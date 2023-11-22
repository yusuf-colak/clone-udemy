import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/libs/ui/components/ui/alertDialog';
import { Button } from '@/libs/ui/components/ui/button';
import { Edit } from 'lucide-react';
import TitleChapterEdit from './chapterComps/titleEdit';
import { Description } from '@radix-ui/react-toast';
import DescriptionChapterEdit from './chapterComps/descriptionedit';
import { VideoChapterEdit } from './chapterComps/videoChapter';
const ChapterEdit = ({ attachment, setCourseData }) => {
  return (
    <React.Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Edit />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <TitleChapterEdit attachment={attachment} setCourseData={setCourseData} />
          <DescriptionChapterEdit attachment={attachment} setCourseData={setCourseData} />
          <AlertDialogFooter>
            <AlertDialogCancel>Çıkış</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default ChapterEdit;
