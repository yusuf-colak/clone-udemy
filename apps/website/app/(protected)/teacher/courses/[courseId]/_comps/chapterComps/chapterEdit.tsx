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
import TitleChapterEdit from './titleEdit';
import { Description } from '@radix-ui/react-toast';
import DescriptionChapterEdit from './descriptionedit';
import { VideoChapterEdit } from './videoChapter';
const ChapterEdit = ({ chapter, setChapters }) => {
  return (
    <React.Fragment>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="ghost">
            <Edit />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <TitleChapterEdit chapter={chapter} setChapters={setChapters} />
          <DescriptionChapterEdit chapter={chapter} setChapters={setChapters} />
          <VideoChapterEdit chapter={chapter} setChapters={setChapters} />
          <AlertDialogFooter>
            <AlertDialogCancel>Çıkış</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  );
};

export default ChapterEdit;
